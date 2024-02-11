import NotFound from "./containers/NotFound";
import Home from "./containers/home";
import Redirect from "./containers/redirect/redirect";

export default [
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "/redirect",
        element: <Redirect />
    },
    {
        path: "*",
        element: <NotFound />
    }
];