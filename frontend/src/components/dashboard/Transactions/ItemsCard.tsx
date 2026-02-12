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

// Quando clicar em editar, o item selecionado deve trocar pra um formulario de edicao com os dados preenchidos mas podendo ser alterados, o primeiro campo é pra editar a descricao
// o segundo campo é pra editar o valor, e o terceiro a categoria, e ao final um botao de salvar as alteracoes e um de cancelar.
// Vamos criar um estado interno pra controlar se o item esta em modo de edicao ou nao.
// Ao clicar em editar, o estado muda pra modo de edicao, e o componente renderiza os campos de formulario.
// Ao clicar em salvar, o estado volta pra modo normal, e o componente renderiza os dados atualizados.
// Ao clicar em cancelar, o estado volta pra modo normal, e o componente renderiza os dados originais.
// Vamos criar um usestate pra controlar o modo de edicao, e outro pra controlar os dados editaveis.
// para controlar os dados editaveis vamos criar tres estados: um pra descricao, outro pro valor, e outro pra categoria.
// Vamos inicializar esses estados com os valores recebidos via props.
// Ao clicar em salvar, vamos chamar uma funcao passada via props pra atualizar os dados no componente pai, passando os novos valores.
// Ao clicar em cancelar, vamos resetar os estados dos dados editaveis pros valores originais recebidos via props.

export const ItemsCard = ({transaction, removeButton, editButton, onSave, onDelete}: ItemsCardProps) => {
    const [editMode, setEditMode] = useState(false);

    let categories = ExpenseCategories;

    const changeEditMode = () => {
        setEditMode(!editMode);
    }

    const removeItem = () => {
        console.log("Chamando onDelete no filho", transaction.id)
      transaction.id ? onDelete(transaction.id): console.error('Transaction ID is undefined');
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