import './styles.css';
import "./websocket/websocket";

// ReactJS
import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Routes
import routes from "./routes";
const router = createBrowserRouter(routes);

console.log("Welcome to Saphire's Moon Website!");
document.title = "Saphire Moon - React";

function render() {
  return ReactDOM.createRoot(document.getElementById('root')!)
    .render(
      <StrictMode>
        <QueryClientProvider client={new QueryClient()}>
          <React.StrictMode>
            <RouterProvider router={router} />
          </React.StrictMode>
        </QueryClientProvider >
      </StrictMode>
    );
}

function analize() {

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (
    (
      (user && user.loggedAt)
      && ((user.loggedAt + (Number(user.expiresIn || "0") * 1000)) <= Date.now())
    ) || location.pathname === "logout"
  ) {
    // notify("message", "Sessão Expirada", "Já se passou muito tempo, você precisa logar novamente, ok?")
    history.pushState(null, "", "/")
    localStorage.clear();
  }

  if (location.pathname === "/error")
    location.pathname = "/unauthorized";

  return render();
}

analize();