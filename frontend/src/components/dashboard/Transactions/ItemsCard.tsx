import {Button} from "@/components/ui/button";
import {Pencil, Trash} from "lucide-react";
import {useState} from "react";
import {Field, FieldGroup} from "@/components/ui/field";
import {Input} from "@/components/ui/input";
import {SelectComponent} from "@/components/ui/SelectComponent";
import {ExpenseCategories} from "@/constants/Category-Constant";
import {CategoryIcon} from "@/components/dashboard/Transactions/CategoryIcon";
import {type ExpenseCategory} from "@/types/expense";

export interface ItemsCardProps {
    transaction: {id: number, description: string, amount: number, date: string, category: ExpenseCategory};
    removeButton?: boolean;
    editButton?: boolean;
    onDelete?: (id: number) => void;
    onSave?: (id: number, description: string, amount: number, category: string) => void;
}
export const ItemsCard = ({transaction, removeButton, editButton, onSave, onDelete}: ItemsCardProps) => {
    const [editMode, setEditMode] = useState(false);

    let categories = ExpenseCategories;

    const changeEditMode = () => {
        setEditMode(!editMode);
    }

    const removeItem = () => {
      if(transaction.id && onDelete) {
          onDelete(transaction.id);
      }
    }

    console.log("Props no filho:", onDelete)

    return (
        <>
        {editMode ?
                <div key={transaction.id} className="bg-[#09090b80] w-full h-14 rounded-sm gap-3 flex flex-row hover:bg-[#09090b] justify-between items-center px-3">
                    <div className="flex flex-row justify-center items-center gap-5">

                            <form className="w-full">
                                <FieldGroup className="flex flex-row items-center gap-2">
                                    <Field>
                                        <Input className="flex-grow" id="description" defaultValue={transaction.description}  name="description" />
                                    </Field>
                                    <Field>
                                        <Input id="amount" defaultValue={transaction.amount} type='number' name="amount" />
                                    </Field>
                                    <Field>
                                        <SelectComponent defaultValue={transaction.category} options={categories}  label="Category" onValueChange={changeEditMode} />
                                    </Field>
                                    <Button variant={"green"}>Save</Button>
                                    <Button type={"button"} onClick={changeEditMode} variant={"outline"}>Cancel</Button>
                                </FieldGroup>

                            </form>
                    </div>
                </div>:
            <div key={transaction.id} className="bg-[#09090b80] w-full h-14 rounded-sm gap-3 flex flex-row hover:bg-[#09090b] justify-between items-center px-3">
                <div className="flex flex-row justify-center items-center gap-5">
                        <CategoryIcon category={transaction.category}/>
                        <div className="flex flex-col justify-center items-start">
                            <h2 className="text-sm">{transaction.description}</h2>
                            <p className=" text-xs text-[#A1A1AA]">{transaction.date}</p>
                        </div>

                </div>
                <div className="flex flex-row items-center gap-2">
                    <p className="text-[#dc2828]">-${transaction.amount}</p>
                    {editButton? <Button onClick={changeEditMode} type="button" className="border-none" variant={"outline"} size={"icon"} ><Pencil/></Button>: ''}
                    {removeButton? <Button onClick={removeItem} type="button" className="border-none" variant={"destructive"} size={"icon"} ><Trash/></Button>: ''}
                </div>
            </div>

            }
        </>
    )
}