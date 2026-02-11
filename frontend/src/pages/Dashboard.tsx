import {Header} from "@/components/dashboard/Header/Header";
import {CardsTracker} from "@/components/dashboard/Cards/CardsTracker";
import {CardsGraph} from "@/components/dashboard/Graphic/CardsGraph";
import {CardsRecentTransactions} from "@/components/dashboard/Transactions/CardsRecentTransactions";

export const Dashboard = () => {
    return(
        <>
            <div className="flex py-10 px-20 w-full flex-col gap-10">
                <Header />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                    <CardsTracker/>
                    <CardsTracker/>
                    <CardsTracker/>
                </div>
                <div className="grid grid-cols-2 gap-5 w-full">
                    <CardsGraph/>
                    <CardsRecentTransactions/>
                </div>

            </div>

        </>
    )
}