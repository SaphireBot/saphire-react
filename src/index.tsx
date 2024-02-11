import './styles.css'

// ReactJS
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Routes
import routes from "./routes";
const router = createBrowserRouter(routes);

console.log("Welcom to Saphire's Moon Website!");
ReactDOM.createRoot(document.getElementById('root')!)
  .render(
    <StrictMode>
      <QueryClientProvider client={new QueryClient()}>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </QueryClientProvider >
    </StrictMode>
  )
