import NotFound from "./containers/NotFound";
import Home from "./containers/home";
import Redirect from "./containers/redirect/redirect";
import Unauthorized from "./containers/statics/unauthorized";

export default [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/redirect/*",
        element: <Redirect />
    },
    {
        path: "/unauthorized",
        element: <Unauthorized />
    },
    {
        path: "*",
        element: <NotFound />
    }
];