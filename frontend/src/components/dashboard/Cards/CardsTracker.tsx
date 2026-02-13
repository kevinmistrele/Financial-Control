import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {IconComponent} from "@/components/dashboard/Transactions/IconComponent";
import type {LucideIcon} from "lucide-react";

interface CardsTrackerProps {
    cardTitle: string;
    cardAmount: string;
    cardIcon: LucideIcon;
    cardDescription: string;
}

export const CardsTracker = ({cardTitle, cardAmount, cardIcon, cardDescription}: CardsTrackerProps) => {
    return (
            <Card className="w-full bg-[#0e0e11] border border-[#2c2c30] hover:border-[#14b8a5]">
                <CardHeader className="pb-2">
                    <CardTitle className="text-[#a1a1aa] text-sm">{cardTitle}</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-2xl font-bold">{cardAmount}</p>
                        <div className="flex bg-[#14b8a51a] justify-center items-center rounded-lg">
                           <IconComponent isCategory={false} iconName={cardIcon}/>
                        </div>

                    </div>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-[#a1a1aa]">{cardDescription}</p>
                </CardFooter>
            </Card>
    )
}