import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Card, CardContent} from "@/components/ui/card";
import {ArrowDownUp, ArrowUpDown, DollarSign, X} from "lucide-react";
import {type ModalProps} from "@/components/dashboard/Header/modal/ModalExpenses";
import {Label} from "@/components/ui/label";
import {useContext, useMemo, useState} from "react";
import {SelectComponent} from "@/components/ui/SelectComponent";
import {Button} from "@/components/ui/button";
import {Months} from "@/constants/Calendar-constant";
import {ExpenseCategories} from "@/constants/Category-Constant";
import {getYearsOptions} from "@/lib/date-config";
import {ItemsCard} from "@/components/dashboard/Transactions/ItemsCard";
import {TransactionContext} from "@/contexts/TransactionContext";
import type {TransactionItemType} from "@/types/expense";

export const TransactionsModal = ({openModal, setOpenModal}: ModalProps) => {
    const [newest, setNewest] = useState(true);
    const transactionContext = useContext(TransactionContext);
    const transactionsList = transactionContext?.transactions ?? [];
    const [filters, setFilters] = useState({
        month: "",
        year: "",
        category: "",
    });

    if(!transactionContext) {
        console.error("TransactionContext is undefined");
        return null;
    }

    const handleFiltersChange = (key: keyof typeof filters, value: string) => {
        setFilters((previousValue) => ({
            ...previousValue,
            [key]: value,
        }));
    };

    const filteredTransactions = useMemo(() => {
        return transactionsList.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            const transactionMonth = String(transactionDate.getMonth() + 1).padStart(2, "0");
            const transactionYear = transactionDate.getFullYear().toString();

            const matchMonth =
                !filters.month || filters.month === transactionMonth;

            const matchYear =
                !filters.year || filters.year === transactionYear;

            const matchCategory =
                !filters.category || filters.category === transaction.category;

            return matchMonth && matchYear && matchCategory;
        });
    }, [transactionsList, filters]);


    const sortedTransactions: TransactionItemType[] = [...filteredTransactions].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return newest ? dateB - dateA: dateA - dateB;
    })


    const changeSort = () => {
       setNewest(!newest);
    }

    const calendarMonths = Months
    const calendarYears = getYearsOptions(5)
    const categories = ExpenseCategories;


    const deleteTransaction = (id: number) => {
        if(transactionsList){
            transactionContext.onDelete(id);
        }else{
            console.error("Transaction deleted error: ", id);
        }
    }

    const saveEditedTransaction  = (data:any)=> {
        if(transactionsList){
            transactionContext.onSave(data)
        }
        console.log(data);
    }

    const resetFilters = () => {
       setFilters({
           month: "",
           year: "",
           category: "",
       });
    }
    const isFiltersActive = filters.month !== "" || filters.year !== "" || filters.category !== "";
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
                                <SelectComponent
                                    newValue={filters.month}
                                    options={calendarMonths}
                                    placeholder="All"
                                    label="Month"
                                    onValueChange={(value) => handleFiltersChange("month", value)}/>
                            </div>
                            <div>
                                <Label>Year</Label>
                                <SelectComponent
                                    newValue={filters.year}
                                    options={calendarYears}
                                    placeholder="All"
                                    label="Month"
                                    onValueChange={(value) => handleFiltersChange("year", value)}/>
                            </div>
                            <div>
                                <Label>Category</Label>
                                <SelectComponent newValue={filters.category}
                                                 options={categories}
                                                 placeholder="All"
                                                 label="Month"
                                                 onValueChange={(value) => handleFiltersChange("category", value)}/>
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
                            {sortedTransactions ?  sortedTransactions.map((transaction)=>
                                <ItemsCard
                                    transaction={transaction}
                                    removeButton={true}
                                    editButton={true}
                                    onDelete={deleteTransaction}
                                    onSave={saveEditedTransaction}
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