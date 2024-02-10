import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { FaGear } from 'react-icons/fa6';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { AiOutlineTeam } from 'react-icons/ai';
import { useQuery } from "@tanstack/react-query";
// const SaphireBotLokinLinkUrl = "https://discord.com/api/oauth2/authorize?client_id=912509487984812043&redirect_uri=https%3A%2F%2Freact.saphire.one%2Fredirect&response_type=token&scope=guilds%20email%20identify";
const SaphireBotLokinLinkUrl = "https://discord.com/api/oauth2/authorize?client_id=912509487984812043&response_type=code&redirect_uri=https%3A%2F%2Freact.saphire.one%2Fredirect&scope=identify+guilds+email";


export function Header() {

    const [admin, setAdmin] = useState(false);
    const [active, setActive] = useState(window.scrollY >= 80 ? "bg active" : "bg");
    const user = JSON.parse(localStorage.getItem("user") || "{}") || {};
    user.id = "451619591320371213";

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
                <Link to="https://saphire.one/"> <img className="logo" src={logo} alt="saphire_moon_logo" /></Link>
                <ul className="navbar" id="header-navbar">
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="https://saphire.one/commands" className="nav-link">Comandos</Link></li>
                    <li><Link to="https://saphire.one/staff" className="nav-link">Equipe</Link></li>
                    <li><Link to="https://saphire.one/support" className="nav-link">Suporte</Link></li>
                    <li><Link to="https://saphire.one/status" className="nav-link">Status</Link></li>
                    {admin && (<li><Link to="https://saphire.one/admin" className="nav-link">Administrativo</Link></li>)}
                </ul>
                <div id="button" className="nav-button"> <Link to={SaphireBotLokinLinkUrl}>Entrar</Link> </div>
                <i className="bx bx-menu-alt-right menu-icon"></i>
            </nav>
        </header >
    );
}

export function Footer() {
    return (
        <footer>
            <div className="socials">
                <abbr title="Desenvolvedores"><a href="https://saphire.one/staff" className="bx"><FaGear className="bxIcon" /></a></abbr>
                <abbr title="GitHub"><a href="https://github.com/SaphireBot" className="bx"><FaGithub className="bxIcon" /></a></abbr>
                <abbr title="Discord"><a href="https://discord.gg/2EMVCbJxuC" className="bx"><FaDiscord className="bxIcon" /></a></abbr>
                <abbr title="Termos de uso"><a href="https://saphire.one/termos" className="bx"><IoDocumentTextOutline className="bxIcon" /></a> </abbr>
                <abbr title="Parceiros"><a href="https://saphire.one/partners" className="bx"><AiOutlineTeam className="bxIcon" /></a></abbr>
            </div>
            <p className="copyright">© Todos os direitos reservados, Saphire Moon - 2023</p>
        </footer >
    )
}