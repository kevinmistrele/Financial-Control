import { LayoutGrid, type LucideIcon } from "lucide-react";
import type { ExpenseCategory } from "@/types/expense";
import { categoryTokens } from "@/design-system";

interface IconComponentProps {
    isCategory?: boolean;
    category?: ExpenseCategory;
    iconName?: LucideIcon;
}

export function IconComponent({ isCategory, category, iconName }: IconComponentProps) {
    const token = isCategory && category
        ? (categoryTokens[category] ?? categoryTokens.general)
        : categoryTokens.default;

    const IconToRender = isCategory ? token.icon : (iconName ?? LayoutGrid);

    return (
        <div
            className="flex w-10 h-10 justify-center items-center rounded-lg"
            style={{ backgroundColor: token.bgColor }}
        >
            <IconToRender className="size-5" style={{ color: token.color }} />
        </div>
    );
}
