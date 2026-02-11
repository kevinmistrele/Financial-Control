import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Field, FieldGroup} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {type ChangeEvent, useState} from "react";
import {SelectComponent} from "@/components/ui/SelectComponent";
import {ExpenseCategories} from "@/constants/Category-Constant";

export interface ModalProps {
    openModal: boolean;
    setOpenModal: (open: boolean) => void;
}


export const ModalExpenses = ({openModal, setOpenModal}: ModalProps) => {

    const [description, setDescription] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");

    const expenseCategories = ExpenseCategories;

    const receiveObject = (event:ChangeEvent) => {
        return event.target.value
    }



    const setDescriptionValue = (event:ChangeEvent) => {
        setDescription(receiveObject(event))
    }

    const setAmountValue = (event:ChangeEvent) => {
        setAmount(receiveObject(event))

    }

    const setCategoryValue = (event:string) => {
        setCategory(event);
    }


    const isFormComplete = description.trim() === "" || amount.trim() === "" || category === "";    return (
        <Dialog open={openModal} onOpenChange={setOpenModal}>
            <form>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add new Expense</DialogTitle>
                    </DialogHeader>
                    <FieldGroup>
                        <Field>
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" name="description" placeholder="Coffee at Starbucks" onChange={setDescriptionValue} />
                        </Field>
                        <Field>
                            <Label htmlFor="amount">Amount ($)</Label>
                            <Input id="amount" type='number' name="amount" placeholder="0.00" onChange={setAmountValue} />
                        </Field>
                        <Field>
                            <Label htmlFor="category">Category</Label>
                            <SelectComponent options={expenseCategories} placeholder="e.g Transport" label="Category" onValueChange={setCategoryValue}/>
                        </Field>
                    </FieldGroup>
                    <div className="flex justify-center">
                        {!isFormComplete ?
                            <Button size='wide' variant= 'green'>Add Expense</Button>
                            : ''
                        }
                    </div>
                </DialogContent>
            </form>
        </Dialog>
    )
}