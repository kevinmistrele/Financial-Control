import type {TransactionItemType} from "@/types/expense";
import {transactionsList} from "@/constants/Transactions-Constant";
import { type ReactNode, useState} from "react";
import * as React from "react";


interface TransactionContextType {
    transactions: TransactionItemType[];
    onDelete: (id: number) => void;
}

export const TransactionContext = React.createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: {children: ReactNode}) => {
    const [transactions, setTransactions] = useState<TransactionItemType[]>(transactionsList);

    const onDelete = (id: number) => {
        const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
        setTransactions(updatedTransactions);
    }

    return (
        <TransactionContext.Provider value={{transactions, onDelete}}>
            {children}
        </TransactionContext.Provider>
    )

}