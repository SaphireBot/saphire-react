import Footer from "./containers/global/footer";
import Header from "./containers/global/header";
import Seo from "./seo";

export default function Layout(Element: JSX.Element) {

    return (
        <>
            <Seo path={location.pathname} />
            <Header />
            {Element}
            <Footer />
        </>
    );
}