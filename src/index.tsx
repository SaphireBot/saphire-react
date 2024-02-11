import './styles.css'

// ReactJS
import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Routes
import routes from "./routes";
import { Unauthorized } from './containers/statics/unauthorized';
const user = JSON.parse(localStorage.getItem("user") || "{}");
const router = createBrowserRouter(routes);

console.log("Welcom to Saphire's Moon Website!");

function render(element?: React.ReactElement) {
  return ReactDOM.createRoot(document.getElementById('root')!)
    .render(
      base(
        element || <RouterProvider router={router} />
      )
    );
}

function analize() {

  if (
    (user && user.loggedAt)
    && ((user.loggedAt + (Number(user.expiresIn || "0") * 1000)) <= Date.now())
  ) {
    // notify("message", "Sessão Expirada", "Já se passou muito tempo, você precisa logar novamente, ok?")
    localStorage.clear();
  }

  if (location.href.includes("error"))
    return render(<Unauthorized />);

  return render();

}

document.title = "Saphire Moon - React";
analize();

function base(data: any) {
  return (
    <StrictMode>
      <QueryClientProvider client={new QueryClient()}>
        <React.StrictMode>
          {data}
        </React.StrictMode>
      </QueryClientProvider >
    </StrictMode>
  )
}