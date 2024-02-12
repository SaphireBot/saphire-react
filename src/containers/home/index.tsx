import { Footer } from "../global/footer";
import Header from "../global/header"
import Sections from "./sections"

export default function Home({ logout }: { logout?: boolean }) {

    if (logout) localStorage.clear();
    localStorage.setItem("redirect", "/");

    return (
        <>
            <Header />
            <Sections />
            <Footer />
        </>
    )
}