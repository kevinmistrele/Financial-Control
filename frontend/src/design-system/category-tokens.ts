import {
  CarIcon,
  HeartPulse,
  LayoutGrid,
  ReceiptText,
  School,
  Store,
  Theater,
  Utensils,
  type LucideIcon,
} from "lucide-react";
import type { ExpenseCategory } from "@/types/expense";

export interface CategoryToken {
  icon: LucideIcon;
  color: string;
  bgColor: string;
}

type CategoryKey = ExpenseCategory | "default";

export const categoryTokens: Record<CategoryKey, CategoryToken> = {
  food:           { icon: Utensils,    color: "#4ade80", bgColor: "#22c55e33" },
  transportation: { icon: CarIcon,     color: "#60a5fa", bgColor: "#2563eb33" },
  bills:          { icon: ReceiptText, color: "#facc15", bgColor: "#ca8a0433" },
  entertainment:  { icon: Theater,     color: "#f472b6", bgColor: "#db277733" },
  healthcare:     { icon: HeartPulse,  color: "#fb7185", bgColor: "#e11d4833" },
  education:      { icon: School,      color: "#a78bfa", bgColor: "#7c3aed33" },
  shopping:       { icon: Store,       color: "#fdba74", bgColor: "#ea580c33" },
  general:        { icon: LayoutGrid,  color: "#94a3b8", bgColor: "#33415533" },
  default:        { icon: LayoutGrid,  color: "#60a5fa", bgColor: "#2563eb33" },
};
