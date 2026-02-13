import {
    CarIcon,
    HeartPulse,
    LayoutGrid, type LucideIcon,
    ReceiptText,
    School,
    Store,
    Theater,
    Utensils,
} from "lucide-react";
import type { ExpenseCategory} from "@/types/expense";

const IconsConfig = {
    food: {
        icon: Utensils,
        color: "#4ade80",
        bgColor: "#22c55e33",
    },
    transportation: {
        icon: CarIcon,
        color: "#60a5fa",
        bgColor: "#2563eb33",
    },
    bills:{
        icon: ReceiptText,
        color: "#facc15",
        bgColor: "#ca8a0433",
    },
    entertainment:{
        icon: Theater,
        color: "#f472b6",
        bgColor: "#db277733",
    },
    healthcare:{
        icon: HeartPulse,
        color: "#fb7185",
        bgColor: "#e11d4833",
    },
    education:{
        icon: School,
        color: "#a78bfa",
        bgColor: "#7c3aed33",
    },
    shopping:{
        icon: Store,
        color: "#fdba74",
        bgColor: "#ea580c33",
    },
    general:{
        icon: LayoutGrid,
        color: "#94a3b8",
        bgColor: "#33415533",
    },
    default:{
        icon: LayoutGrid,
        color: "#60a5fa",
        bgColor: "#2563eb33",
    }
}

 interface IconComponentProps  {
    isCategory?: boolean;
    category?: ExpenseCategory;
    iconName?: LucideIcon;
}
export const IconComponent = ({isCategory, category,iconName}: IconComponentProps) => {
    const categoryData = category ? (IconsConfig[category] || IconsConfig.general) : null;
    const IconToRender = (isCategory ? categoryData?.icon : iconName) || LayoutGrid;
    const configDefault = {
        icon: IconsConfig.default.icon,
        backgroundColor: IconsConfig.default.bgColor,
        color: IconsConfig.default.color,
    }

   return(
       <>
           {!isCategory ?
               <div className="flex w-10 h-10 justify-center items-center rounded-lg" style={{backgroundColor: configDefault.backgroundColor}}>
                   <IconToRender className="size-5" style={{color: configDefault.color}} />
               </div>:
               <div className="flex w-10 h-10 justify-center items-center rounded-lg" style={{backgroundColor: categoryData?.bgColor}}>
                   <IconToRender className="size-5" style={{color: categoryData?.bgColor}} />
               </div>
           }
       </>
   )
}