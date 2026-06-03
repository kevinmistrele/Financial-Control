import { Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { ModalExpenses } from "@/components/dashboard/Header/modal/ModalExpenses";

export function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    function toggleModal() {
        setIsModalOpen((prev) => !prev);
    }

    return (
        <div className="flex-row justify-between w-full flex">
            <div className="flex flex-row gap-3 items-center">
                <div className="bg-brand size-12 flex justify-center items-center rounded-lg">
                    <Wallet className="size-8 rounded-sm text-brand-foreground" />
                </div>
                <h1 className="text-3xl font-bold">Money Tracker</h1>
            </div>
            <div>
                <Button onClick={toggleModal} size="lg" variant="green">
                    {isModalOpen ? "Adding Expense" : "Add Expense"}
                </Button>
                {isModalOpen && (
                    <ModalExpenses openModal={isModalOpen} setOpenModal={setIsModalOpen} />
                )}
            </div>
        </div>
    );
}
