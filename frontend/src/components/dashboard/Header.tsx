import {Wallet} from "lucide-react";
import {Button} from "@/components/ui/button";


export const Header = () => {
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
                    <Button size="lg" variant="green">+ Add Expense</Button>
                </div>

            </div>
        </>
    )
}