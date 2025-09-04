import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ReactNode, useState } from "react";
import { ToastProvider } from "react-toast-notifications";

interface AppProvidersProps {
    children: ReactNode;
}

const AppProviders = ({ children }: AppProvidersProps) => {
    // Create query client as state to ensure it's stable across renders
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        retry: 1,
                        staleTime: 60 * 1000, // 1 minute
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            <ToastProvider>
                <TooltipProvider>
                    <Toaster />
                    <Sonner />
                    <BrowserRouter>
                        {children}
                    </BrowserRouter>
                </TooltipProvider>
            </ToastProvider>
        </QueryClientProvider>
    );
};

export default AppProviders;
