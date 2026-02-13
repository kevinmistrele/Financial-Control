import {Header} from "@/components/dashboard/Header/Header";
import {CardsTracker} from "@/components/dashboard/Cards/CardsTracker";
import {CardsGraph} from "@/components/dashboard/Graphic/CardsGraph";
import {CardsRecentTransactions} from "@/components/dashboard/Transactions/CardsRecentTransactions";
import {Calendar, TrendingDown, Wallet} from "lucide-react";

export const Dashboard = () => {
    return(
        <>
            <div className="flex py-10 px-20 w-full flex-col gap-10">
                <Header />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
                    <CardsTracker cardTitle="Total Spent (7 days)" cardAmount="$495.99" cardIcon={Calendar} cardDescription="Last week"/>
                    <CardsTracker cardTitle="Total Spent (30 days)" cardAmount="$495.99" cardIcon={TrendingDown} cardDescription="Last month"/>
                    <CardsTracker cardTitle="Total Spent" cardAmount="$70.856" cardIcon={Wallet} cardDescription="Per transaction"/>
                </div>
                <div className="grid grid-cols-2 gap-5 w-full">
                    <CardsGraph/>
                    <CardsRecentTransactions/>
                </div>

            </div>

        </>
    )
}