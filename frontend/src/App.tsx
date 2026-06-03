import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "@/pages/Dashboard";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TransactionProvider } from "@/contexts/TransactionContext";

export default function App() {
    return (
        <TooltipProvider>
            <Toaster />
            <TransactionProvider>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route
                            path="*"
                            element={
                                <div className="h-screen flex items-center justify-center text-foreground">
                                    Página não encontrada
                                </div>
                            }
                        />
                    </Routes>
                </BrowserRouter>
            </TransactionProvider>
        </TooltipProvider>
    );
}
