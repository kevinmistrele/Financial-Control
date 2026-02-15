import {type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Bar, BarChart, CartesianGrid, XAxis, YAxis} from "recharts";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {useState} from "react";


const chartConfig = {
    amount:{
        label: 'Spent',
        color: "#14b8a5"
    }
} satisfies ChartConfig

type DayRange = 7 | 15 | 30;

const dataExample = [
    { day: "Seg", amount: 45 },
    { day: "Ter", amount: 30 },
    { day: "Qua", amount: 55 },
    { day: "Qui", amount: 65 },
    { day: "Sex", amount: 25 },
    { day: "Sáb", amount: 43 },
    { day: "Dom", amount: 4 },
];



export function CardsGraph() {
    const [range, setRange] = useState<DayRange>(7);

    const data = (data:DayRange) => {
        setRange(data);
        filterChart(data)
    }

    const filterChart = (daySelect: DayRange) => {
        //chamaremos a api passando o data filtered pra ela
    }

    return (
        <Card>
            <CardHeader>
                <div className="bg-[#09090b80] flex flex-row justify-between">
                    <h2>Daily Spending</h2>
                    <div className="flex gap-1 bg-background/50 rounded-lg p-0.5">
                        {([7, 15, 30] as DayRange[]).map((d) => (
                            <Button
                                key={d}
                                variant="ghost"
                                size="sm"
                                onClick={() => data(d)}
                                className={cn(
                                    "h-7 px-2.5 text-xs rounded-md",
                                    range === d
                                        ? "bg-accent text-accent-foreground hover:bg-accent/90"
                                        : "text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {d}D
                            </Button>
                        ))}
                    </div>
                </div>

            </CardHeader>
            <CardContent className="pb-2">
                <div className=" w-full">
                    <ChartContainer config={chartConfig}>
                        <BarChart data={dataExample} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#2c2c30" />

                            <XAxis
                                dataKey="day"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#a1a1aa', fontSize: 12 }}
                            />

                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#a1a1aa', fontSize: 12 }}
                                tickFormatter={(value) => `$${value}`}
                            />

                            <ChartTooltip content={<ChartTooltipContent />} />

                            <Bar
                                dataKey="amount"
                                fill="var(--color-amount)"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ChartContainer>
                </div>
            </CardContent>
        </Card>
    )
}

