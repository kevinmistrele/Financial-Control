import {Header} from "@/components/dashboard/Header";
import {CardsTracker} from "@/components/dashboard/CardsTracker";

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

            </div>

        </>
    )
}