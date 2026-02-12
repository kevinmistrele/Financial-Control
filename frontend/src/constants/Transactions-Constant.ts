import type {TransactionItemType} from "@/types/expense";

export const transactionsList: TransactionItemType[] = [
    { id: 1, description: "Grocery Shopping", amount: 75.50, date: "2024-06-10", category: "shopping" },
    { id: 2, description: "Electricity Bill", amount: 120.00, date: "2024-06-09", category: "bills" },
    { id: 3, description: "Restaurant", amount: 45.25, date: "2024-06-08", category: "food" },
    { id: 4, description: "Online Subscription", amount: 15.99, date: "2024-06-07", category: "entertainment" },
    { id: 5, description: "Gas Refill", amount: 60.00, date: "2024-06-06", category: "transportation" },
]