import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { Home, NotFound } from "./containers/home/index";
import { StrictMode } from "react";
const queryClient = new QueryClient();

export default function Router() {
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider >
        </StrictMode>
    );
}