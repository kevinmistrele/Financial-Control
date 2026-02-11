import {type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";
import {Bar, BarChart, CartesianGrid, XAxis, YAxis} from "recharts";
import {Card, CardContent, CardHeader} from "@/components/ui/card";


const chartConfig = {
    amount:{
        label: 'Spent',
        color: "#14b8a5"
    }
} satisfies ChartConfig


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
    return (
        <Card>
            <CardHeader>
                Daily Spending - Last 7 days
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