import type {TransactionItemType} from "@/types/expense";
import {transactionsList} from "@/constants/Transactions-Constant";
import { type ReactNode, useState} from "react";
import * as React from "react";


interface TransactionContextType {
    transactions: TransactionItemType[];
    onDelete: (id: number) => void;
    onSave: (data: {id: number, description: string, amount: number, category: string}) => void;
}

export const TransactionContext = React.createContext<TransactionContextType | undefined>(undefined);

export const TransactionProvider = ({ children }: {children: ReactNode}) => {
    const [transactions, setTransactions] = useState<TransactionItemType[]>(transactionsList);

    const onDelete = (id: number) => {
        const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
        setTransactions(updatedTransactions);
    }
    const onSave = (data: any) => {
        const updatedTransactions = transactions.map((transaction) => {
            if(transaction.id === data.id) {
                return {
                    ...transaction,
                    description: data.description,
                    amount: data.amount,
                    category: data.category
                }
            }
            return transaction;
        })
        setTransactions(updatedTransactions);
    }

    return (
        <TransactionContext.Provider value={{transactions, onDelete, onSave}}>
            {children}
        </TransactionContext.Provider>
    )

}