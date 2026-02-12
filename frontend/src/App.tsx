import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Dashboard } from "@/pages/Dashboard";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import {TransactionProvider} from "@/contexts/TransactionContext";

const App = () => (
    <TooltipProvider>
        <Toaster />
        <TransactionProvider>
            <BrowserRouter>
                <Routes>
                    {/* Rota raiz cai direto no Dashboard */}
                    <Route path="/" element={<Dashboard />} />

                    {/* Rota 404 simples (pode criar esse componente depois se quiser) */}
                    <Route path="*" element={<div className="h-screen flex items-center justify-center text-white">Página não encontrada</div>} />
                </Routes>
            </BrowserRouter>
        </TransactionProvider>
    </TooltipProvider>
);

export default App;