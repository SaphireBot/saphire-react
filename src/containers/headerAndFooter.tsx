import { Link } from "react-router-dom";
import { useState } from "react";
import { FaGear } from 'react-icons/fa6';
import { FaGithub, FaDiscord } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { AiOutlineTeam } from 'react-icons/ai';
import { HiMenuAlt3 } from "react-icons/hi";
import { MdOutlineClose } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

const SaphireBotLokinLinkUrl = "https://discord.com/api/oauth2/authorize?client_id=912509487984812043&redirect_uri=https%3A%2F%2Freact.saphire.one%2Fredirect&response_type=token&scope=guilds%20email%20identify";
const user = JSON.parse(localStorage.getItem("user") || "{}");

export function Header() {

    const [admin, setAdmin] = useState(false);
    const [active, setActive] = useState(window.scrollY >= 80 ? "bg active" : "bg");
    const [menuNavbar, setMenuNavbar] = useState("navbar");

    const toggle = () => setMenuNavbar(menuNavbar === "navbar" ? "navbar open-menu" : "navbar");
    window.onscroll = () => {
        if (window.scrollY >= 80 && active === "bg active") return;
        if (window.scrollY <= 80 && active === "bg") return;
        return setActive(window.scrollY >= 80 ? "bg active" : "bg");
    };

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

    const icon = <button className="bx menu-icon" onClick={toggle}>{menuNavbar === "navbar" ? <HiMenuAlt3 /> : <MdOutlineClose />}</button>

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
                {
                    user?.id
                        ? <ButtonOrUserIcon icon={icon} />
                        : <div id="button" className="nav-button"> <Link to={SaphireBotLokinLinkUrl}>Entrar</Link> </div>
                }
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

function ButtonOrUserIcon({ icon }: { icon: JSX.Element }) {

    const [subProfileWrapper, setSubProfileWrapper] = useState("sub-profile-wrapper");
    const [bxIcon, setBxIcon] = useState(<IoIosArrowDown />);

    const avatar = user?.avatar ? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.${user?.avatar?.includes("a_") ? "gif" : "png"}` : "/assets/images/user.png";
    const username = user?.global_name || user?.username || "Cade o nome?";
    const homeBody = document.getElementById("home");

    const wrapperToggle = () => {

        if (subProfileWrapper.includes("active")) {
            setSubProfileWrapper("sub-profile-wrapper")
            setBxIcon(<IoIosArrowDown />);
            homeBody?.classList.remove("blured");
            return;
        }

        setSubProfileWrapper("sub-profile-wrapper active");
        setBxIcon(<IoIosArrowUp />);
        homeBody?.classList.add("blured");
        return;
    }

    function check() {
        if (!subProfileWrapper.includes("active")) return;
        return wrapperToggle();
    }

    if (homeBody) homeBody.onclick = () => check();
    document.onscroll = () => check();

    return (
        <>
            <div id="button" className="profile" onClick={wrapperToggle}>
                <img src={avatar} alt="avatar" id="avatar" />
                <div className="details">
                    <span className="name" id="username">{username}</span>
                </div>
                <i className="bx" id="bxicon">{bxIcon}</i>
            </div>
            {icon}
            <div id="header-profile" className={subProfileWrapper}>
                <div className="content">
                    <Link to="/chat" className="content-link">Bate Papo</Link>
                    <Link to={location.href || "/"} className="content-link">Dados</Link>
                    <Link to="/linked-roles" className="content-link">Atualizar cargos vinculados</Link>
                </div>
                <hr />
                <div className="content">
                    <Link to="/daily" className="content-link">Prêmio diário</Link>
                    <Link to="/servers" className="content-link">Servidores</Link>
                    <Link to="/perfil" className="content-link">Perfil</Link>
                    <Link to="/transactions" className="content-link">Transações</Link>
                </div>
                <hr />
                <div className="content">
                    <a href="https://discord.gg/2EMVCbJxuC" className="content-link">Servidor de suporte</a>
                    <a href={location.href || "/"} className="content-link">Registro de alterações</a>
                    <Link to="/bug" className="content-link">Reportar bug</Link>
                    <Link to="/" onClick={logout} className="content-link">Sair</Link>
                </div>
            </div>
        </>
    );
}

function logout() {
    return localStorage.clear();
}