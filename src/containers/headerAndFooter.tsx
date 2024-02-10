import { Link } from "react-router-dom";
import { useState } from "react";
import { FaGear } from 'react-icons/fa6';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { AiOutlineTeam } from 'react-icons/ai';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
// const SaphireBotLokinLinkUrl = "https://discord.com/api/oauth2/authorize?client_id=912509487984812043&redirect_uri=https%3A%2F%2Freact.saphire.one%2Fredirect&response_type=token&scope=guilds%20email%20identify";
const SaphireBotLokinLinkUrl = "https://discord.com/api/oauth2/authorize?client_id=912509487984812043&response_type=token&redirect_uri=https%3A%2F%2Freact.saphire.one%2Fredirect&scope=guilds+identify+email";

export function Header() {

    const [admin, setAdmin] = useState(false);
    const [active, setActive] = useState(window.scrollY >= 80 ? "bg active" : "bg");
    const [menuNavbar, setMenuNavbar] = useState("navbar");
    const user = JSON.parse(localStorage.getItem("user") || "{}") || {};
    user.id = "451619591320371213";

    const toggle = () => setMenuNavbar(menuNavbar === "navbar" ? "navbar open-menu" : "navbar");
    window.addEventListener("scroll", () => {
        if (window.scrollY >= 80 && active === "bg active") return;
        if (window.scrollY <= 80 && active === "bg") return;
        return setActive(window.scrollY >= 80 ? "bg active" : "bg");
        // return setTimeout(() => {
        //     if (window.scrollY >= 80 && active === "bg active") return;
        //     if (window.scrollY <= 80 && active === "bg") return;
        //     return setActive(window.scrollY >= 80 ? "bg active" : "bg");
        // }, 100);
    });

    useQuery({
        queryKey: ["admins"],
        async queryFn() {
            const response = await fetch("https://api.saphire.one/admins", { method: "GET" })
                .then(res => res.json())
                .catch(() => []);
            setAdmin(response?.includes(user?.id));
            return response || []
        }
    })

    return (
        <header>
            <div className={active}></div>
            <nav className="container">
                <Link to="/"> <img className="logo" src="/assets/images/logo.png" alt="saphire_moon_logo" /></Link>
                <ul className={menuNavbar} id="header-navbar">
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/commands" className="nav-link">Comandos</Link></li>
                    <li><Link to="/staff" className="nav-link">Equipe</Link></li>
                    <li><Link to="/support" className="nav-link">Suporte</Link></li>
                    <li><Link to="/status" className="nav-link">Status</Link></li>
                    {admin && (<li><Link to="/admin" className="nav-link">Administrativo</Link></li>)}
                </ul>
                <div id="button" className="nav-button"> <Link to={SaphireBotLokinLinkUrl}>Entrar</Link> </div>
                <button className="bx menu-icon" onClick={toggle}>{menuNavbar === "navbar" ? <HiMenuAlt3 /> : <MdOutlineClose />}</button>
            </nav>
        </header >
    );
}

export function Footer() {
    return (
        <footer>
            <div className="socials">
                <abbr title="Desenvolvedores"><Link to="/staff" className="bx"><FaGear className="bxIcon" /></Link></abbr>
                <abbr title="GitHub"><a href="https://github.com/SaphireBot" className="bx"><FaGithub className="bxIcon" /></a></abbr>
                <abbr title="Discord"><a href="https://discord.gg/2EMVCbJxuC" className="bx"><FaDiscord className="bxIcon" /></a></abbr>
                <abbr title="Termos de uso"><Link to="/termos" className="bx"><IoDocumentTextOutline className="bxIcon" /></Link> </abbr>
                <abbr title="Parceiros"><Link to="/partners" className="bx"><AiOutlineTeam className="bxIcon" /></Link></abbr>
            </div>
            <p className="copyright">© Todos os direitos reservados, Saphire Moon - 2023</p>
        </footer >
    )
}