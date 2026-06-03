import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { IconComponent } from "@/components/dashboard/Transactions/IconComponent";
import type { LucideIcon } from "lucide-react";

interface CardsTrackerProps {
    cardTitle: string;
    cardAmount: string;
    cardIcon: LucideIcon;
    cardDescription: string;
}

export function CardsTracker({ cardTitle, cardAmount, cardIcon, cardDescription }: CardsTrackerProps) {
    return (
        <Card className="w-full bg-card border border-border hover:border-brand transition-colors">
            <CardHeader className="pb-2">
                <CardTitle className="text-muted-foreground text-sm">{cardTitle}</CardTitle>
            </CardHeader>
            <CardContent className="pb-2">
                <div className="flex flex-row justify-between items-center">
                    <p className="text-2xl font-bold">{cardAmount}</p>
                    <div className="flex bg-brand-subtle justify-center items-center rounded-lg">
                        <IconComponent isCategory={false} iconName={cardIcon} />
                    </div>
                </div>
            </CardContent>
            <CardFooter>
                <p className="text-sm text-muted-foreground">{cardDescription}</p>
            </CardFooter>
        </Card>
    );
}
