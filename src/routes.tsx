import { RouteObject } from "react-router-dom";
import NotFound from "./containers/NotFound";
import Home from "./containers/home";
import Redirect from "./containers/redirect/redirect";
import Unauthorized from "./containers/statics/unauthorized";
import Layout from "./layout";

export default [
    {
        path: "/",
        element: Layout(<Home />),
        errorElement: Layout(<NotFound />)
    },
    {
        path: "/redirect/*",
        element: <Redirect />,
        errorElement: Layout(<NotFound />)
    },
    {
        path: "/unauthorized",
        element: Layout(<Unauthorized />),
        errorElement: Layout(<NotFound />)
    },
    {
        path: "*",
        element: Layout(<NotFound />),
        errorElement: Layout(<NotFound />)
    }
] as RouteObject[];