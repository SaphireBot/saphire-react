import Footer from "./containers/global/footer";
import Header from "./containers/global/header";

export default function Layout(Element: JSX.Element) {
    return (
        <>
            <Header />
            {Element}
            <Footer />
        </>
    )
}