import {Card, CardContent, CardHeader} from "@/components/ui/card";
import { type TransactionItemType} from "@/types/expense";
import {Button} from "@/components/ui/button";
import {ListFilter} from "lucide-react";
import {useState} from "react";
import {TransactionsModal} from "@/components/dashboard/Transactions/modal/Transactions-Modal";
import {ItemsCard} from "@/components/dashboard/Transactions/ItemsCard";

let transactionsList: TransactionItemType[] = [
    { id: 1, description: "Grocery Shopping", amount: 75.50, date: "2024-06-10", category: "shopping" },
    { id: 2, description: "Electricity Bill", amount: 120.00, date: "2024-06-09", category: "bills" },
    { id: 3, description: "Restaurant", amount: 45.25, date: "2024-06-08", category: "food" },
    { id: 4, description: "Online Subscription", amount: 15.99, date: "2024-06-07", category: "entertainment" },
    { id: 5, description: "Gas Refill", amount: 60.00, date: "2024-06-06", category: "transportation" },
]


export const CardsRecentTransactions = () => {

    const [openModal, setOpenModal] = useState(false);
    const [transactions, setTransactions] = useState<TransactionItemType[]> (transactionsList);

    const toggleModal = () => {
        setOpenModal(!openModal);
        console.log('openModal:', openModal);
    }


    return (
        <Card>
            <CardHeader>
                <div className="flex flex-row justify-between items-center">
                    <h1>Recent Transactions</h1>
                    <Button variant="outline" className="border-none text-gray-400" onClick={toggleModal}> <ListFilter/> View all</Button>
                    {openModal && (
                        <TransactionsModal openModal={openModal} setOpenModal={setOpenModal}/>
                    )}
                </div>
            </CardHeader>
            <CardContent className="pb-2 gap-3 mb-3 flex flex-col">
                {transactions.map((transaction) =>
                    <ItemsCard
                        transaction={transaction}
                    />
                    )}
            </CardContent>
        </Card>

    )
}