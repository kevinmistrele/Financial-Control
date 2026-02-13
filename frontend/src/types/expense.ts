//Types for expense management
export type ExpenseCategory =
    "food"|
    "transportation"|
    "bills"|
    "entertainment"|
    "healthcare"|
    "education"|
    "shopping"|
    "general";

export type Months =
    "january"|
    "february"|
    "march"|
    "april"|
    "may"|
    "june"|
    "july"|
    "august"|
    "september"|
    "october"|
    "november"|
    "december";

export interface TransactionObjectType{
    transaction?: TransactionItemType;
}

export interface TransactionItemType {
    id: number;
    description: string;
    category: ExpenseCategory;
    amount: number;
    date: string;
}

// DTO interface for expense management
export interface CreateExpenseDTO {
    description: string;
    amount: number;
    category: ExpenseCategory;
}

export interface GetExpenseDTO {
    id: number;
    description: string;
    amount: number;
    category: ExpenseCategory;
    date: string;
}

export type expenseCategories = {
    id: number;
    value: ExpenseCategory;
    label: string;
}

export type MonthsType = {
    id: number;
    value: Months;
    label: string;
};


export type YearsType = {
    id: number;
    value: number | string;
    label: string;
}
