import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Field, FieldGroup} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import { useState} from "react";
import {SelectComponent} from "@/components/ui/SelectComponent";
import {ExpenseCategories} from "@/constants/Category-Constant";

export interface ModalProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}


export const ModalExpenses = ({openModal, setOpenModal}: ModalProps) => {

    const [expenseData, setExpenseData] = useState({
        description: "",
        amount: "",
        category: "",
    });


    const expenseCategories = ExpenseCategories;

    const handleChange = (
        key: keyof typeof expenseData,
        value: string
    ) => {
        setExpenseData((prev) => ({
            ...prev,
            [key]: value,
        }));
    };

    const submitExpense = () => {
        if (!isFormUncomplete) {
            //Pegamos o expense data e chamamos o serviço de envio pra API
        }else{
            //gera o Erro
        }

        resetExpenseData();
    }

    const resetExpenseData = () => {
        setExpenseData({
            description: "",
            amount: "",
            category: "",
        })
    }

    const isFormUncomplete = expenseData.description.trim() !== "" && expenseData.amount.trim() !== "" && expenseData.category.trim() !== ""
    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <form onSubmit={submitExpense}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add new Expense</DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" name="description" placeholder="Coffee at Starbucks" onChange={(e) => {handleChange("description", e.target.value)}} />
                        </Field>
                        <Field>
                            <Label htmlFor="amount">Amount ($)</Label>
                            <Input id="amount" type='number' name="amount" placeholder="0.00" onChange={(e) => {handleChange("amount", e.target.value)}} />
                        </Field>
                        <Field>
                            <Label htmlFor="category">Category</Label>
                            <SelectComponent options={expenseCategories} placeholder="e.g Transport" label="Category" onValueChange={(value) => handleChange("category", value)} />
                        </Field>
                    </FieldGroup>
                    <div className="flex justify-center">
                        {isFormUncomplete ?
                            <Button size='wide' variant= 'green'>Add Expense</Button>
                            : ''
                        }
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    )
}