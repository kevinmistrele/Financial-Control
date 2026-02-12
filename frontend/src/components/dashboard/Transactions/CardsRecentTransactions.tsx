import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {ListFilter} from "lucide-react";
import {useContext, useState} from "react";
import {TransactionsModal} from "@/components/dashboard/Transactions/modal/Transactions-Modal";
import {ItemsCard} from "@/components/dashboard/Transactions/ItemsCard";
import {TransactionContext} from "@/contexts/TransactionContext";

export const CardsRecentTransactions = () => {

    const [openModal, setOpenModal] = useState(false);
    const transactions = useContext(TransactionContext)
    const transactionsList = transactions?.transactions;
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
            <CardContent className="pb-2 gap-3 mb-3 flex flex-col min-h-[200px]" >
                {transactionsList && transactionsList.length > 0 ? transactionsList.map((transaction) =>
                    <ItemsCard
                        transaction={transaction}
                    />
                    ):
                    <div className="flex flex-1 justify-center items-center" >
                        <p className="text-sm text-gray-400">No transactions found.</p>
                    </div>
                }
            </CardContent>
        </Card>

    )
}