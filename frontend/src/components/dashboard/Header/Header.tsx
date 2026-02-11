import {Wallet} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {ModalExpenses} from "@/components/dashboard/Header/modal/ModalExpenses";


export const Header = () => {
    const [modalToggle, setModalToggle] = useState(false);


    const toggleModal = () =>{
        setModalToggle(!modalToggle);
    }

    return(
        <>
            <div className="flex-row justify-between w-full flex">
                <div className="flex flex-row gap-3 items-center">
                    <div className="bg-[#14b8a5] size-12 flex justify-center items-center rounded-lg">
                        <Wallet className=" size-8 rounded-sm bg-[#14b8a5]"/>
                    </div>
                    <h1 className="text-3xl font-bold">Money Tracker</h1>
                </div>
                <div>
                    <Button onClick={toggleModal} size="lg" variant="green">{!modalToggle ? "Add Expense" : "Adding Expense"}</Button>

                    {modalToggle && (
                        <ModalExpenses openModal={modalToggle} setOpenModal={setModalToggle}/>
                    )}

                </div>

            </div>
        </>
    )
}