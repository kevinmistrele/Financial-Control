import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Card, CardContent} from "@/components/ui/card";
import {ArrowDownUp, ArrowUpDown, DollarSign, X} from "lucide-react";
import { type ModalProps} from "@/components/dashboard/Header/modal/ModalExpenses";
import {Label} from "@/components/ui/label";
import {useContext, useState} from "react";
import {SelectComponent} from "@/components/ui/SelectComponent";
import {Button} from "@/components/ui/button";
import {Months} from "@/constants/Calendar-constant";
import {ExpenseCategories} from "@/constants/Category-Constant";
import {getYearsOptions} from "@/lib/date-config";
import {ItemsCard} from "@/components/dashboard/Transactions/ItemsCard";
import {TransactionContext} from "@/contexts/TransactionContext";

export const TransactionsModal = ({openModal, setOpenModal}: ModalProps) => {
    const [month, setMonth] = useState("");
    const [newest, setNewest] = useState(true);
    const [year, setYear] = useState("");
    const [category, setCategory] = useState("");
    const transactionContext = useContext(TransactionContext);
    const transactionsList = transactionContext?.transactions;

    if(!transactionContext) {
        console.error("TransactionContext is undefined");
        return null;
    }



    const changeSort = () => {
        if(transactionsList && transactionsList.length > 0){
            const sortedTransactions = [...transactionsList].sort((a, b) => a.date - b.date);
        }

    }

    const calendarMonths = Months
    const calendarYears = getYearsOptions(5)
    const categories = ExpenseCategories;

    const setMonthValue = (event:string) => {
        setMonth(event);
    }

    const setYearsValue = (event:string) => {
        setYear(event);
    }

    const setCategoryValue = (event:string) => {
        setCategory(event);
    }

    const deleteTransaction = (id: number) => {
        if(transactionsList){
            transactionContext.onDelete(id);
        }else{
            console.error("Transaction deleted error: ", id);
        }
    }

    const resetFilters = () => {
        setMonthValue("");
        setYearsValue("");
        setCategoryValue("");
    }

    const isFiltersActive = month !== "" || year !== "" || category !== "";
    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <DialogContent className="max-w-2xl bg-[#0e0e11]">
                <DialogHeader>
                    <DialogTitle className="pb-3" >All Transactions</DialogTitle>
                    <Card>
                        <CardContent className="p-5" >
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row items-center justify-center gap-5">
                                    <div className="flex flex-row justify-center items-center rounded-lg bg-[#14b8a526] size-12">
                                        <DollarSign className="color-[#14b8a5]"/>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-400">All Months - All years</p>
                                        <h1 className="font-bold text-2xl">$495.99</h1>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-sm text-gray-400">7 transactions</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <div>
                        <div className="grid grid-cols-5 gap-5 items-center">
                            <div>
                                <Label>Month</Label>
                                <SelectComponent newValue={month} options={calendarMonths} placeholder="All" label="Month" onValueChange={setMonthValue}/>
                            </div>
                            <div>
                                <Label>Year</Label>
                                <SelectComponent newValue={year} options={calendarYears} placeholder="All" label="Month" onValueChange={setYearsValue}/>
                            </div>
                            <div>
                                <Label>Category</Label>
                                <SelectComponent newValue={category} options={categories} placeholder="All" label="Month" onValueChange={setCategoryValue}/>
                            </div>
                            <div className="items-center m-0 pt-6">
                                {newest? <Button variant={"green"} onClick={changeSort}><ArrowUpDown/>Newest</Button>
                                :<Button onClick={changeSort} variant={"green"}><ArrowDownUp/>Oldest</Button>
                                }
                            </div>
                            {

                            }
                            <div className="items-center m-0 pt-6">
                                {isFiltersActive? <Button type="button" className="text-red-500" variant={"outline"} onClick={resetFilters}><X/>Clear</Button>
                                    :''
                                }
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-3 mt-5 w-full">
                        <CardContent className=" p-0 w-full pb-2 gap-3 mb-3 flex flex-col mt-3 min-h-[300px]" >
                            {transactionsList && transactionsList.length > 0?  transactionsList.map((transaction)=>
                                <ItemsCard
                                    transaction={transaction}
                                    removeButton={true}
                                    editButton={true}
                                    onDelete={deleteTransaction}
                                />
                             ):
                            <div className="flex flex-1 justify-center items-center">
                                <p className="text-sm text-gray-400">No transactions found.</p>
                            </div>
                        }
                        </CardContent>
                    </div>

                </DialogHeader>
            </DialogContent>

        </Dialog>
    )
}