import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./containers/home/index";
import { StrictMode } from "react";
import NotFound from "./containers/NotFound";
import Redirect from "./containers/redirect/redirect";
import "./styles.css";
const queryClient = new QueryClient();

export default function Router() {
    console.log("Welcom to Saphire's Moon Website!");
    return (
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter >
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/redirect" element={<Redirect />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </QueryClientProvider >
        </StrictMode>
    );
}