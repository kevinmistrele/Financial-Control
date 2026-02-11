import {
    CarIcon,
    HeartPulse,
    LayoutGrid,
    ReceiptText,
    School,
    Store,
    Theater,
    Utensils,
} from "lucide-react";
import { type CategoryIconProps} from "@/types/expense";

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
    }
}


export const CategoryIcon = ({category}: CategoryIconProps) => {
    console.log(category);
    const categoryValue = IconsConfig[category] || IconsConfig.general;
    const IconBgColor = categoryValue.bgColor;
    const IconColor = categoryValue.color;
    const Icon = categoryValue.icon;

   return(
    <div className="flex w-10 h-10 justify-center items-center rounded-lg" style={{backgroundColor: IconBgColor}}>
        <Icon className="size-5" style={{color: IconColor}} />
        {/*<Utensils className="size-5 text-[#4ade80]"/>*/}
    </div>
   )
}