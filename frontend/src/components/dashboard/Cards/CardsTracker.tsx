import {Card, CardContent, CardFooter, CardHeader, CardTitle} from "@/components/ui/card";
import {Calendar} from "lucide-react";

export const CardsTracker = () => {
    return (
            <Card className="w-full bg-[#0e0e11] border border-[#2c2c30] hover:border-[#14b8a5]">
                <CardHeader className="pb-2">
                    <CardTitle className="text-[#a1a1aa] text-sm">Total Spent (7 days)</CardTitle>
                </CardHeader>
                <CardContent className="pb-2">
                    <div className="flex flex-row justify-between items-center">
                        <p className="text-2xl font-bold">$495.99</p>
                        <div className="flex bg-[#14b8a51a] w-12 h-12 justify-center items-center rounded-lg">
                            <Calendar className="text-[#14b8a5] size-8" />
                        </div>

                    </div>
                </CardContent>
                <CardFooter>
                    <p className="text-sm text-[#a1a1aa]">Last Week</p>
                </CardFooter>
            </Card>
    )
}