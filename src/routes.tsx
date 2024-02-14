import { RouteObject } from "react-router-dom";
import NotFound from "./containers/statics/NotFound";
import Home from "./containers/home";
import Redirect from "./containers/redirect/redirect";
import Unauthorized from "./containers/statics/unauthorized";
import Status from "./containers/status/index";
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
    // {
    //     path: "/commands",
    //     element: Layout(<Commands />),
    //     errorElement: Layout(<NotFound />)
    // },
    {
        path: "/status",
        element: Layout(<Status />),
        errorElement: Layout(<NotFound />)
    },
    {
        path: "*",
        element: Layout(<NotFound />),
        errorElement: Layout(<NotFound />)
    }
] as RouteObject[];