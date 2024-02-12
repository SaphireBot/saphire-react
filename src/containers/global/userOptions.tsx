import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";

export function UserOptions({ menuNavbar, setMenuNavbar }: { menuNavbar: string, setMenuNavbar: React.Dispatch<React.SetStateAction<string>> }) {

    const home = document.getElementById("home");
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    const [subProfileWrapper, setSubProfileWrapper] = useState<string>("sub-profile-wrapper");
    const [bxIcon, setBxIcon] = useState<JSX.Element>(<IoIosArrowDown />);
    const toggle = () => setMenuNavbar(menuNavbar === "navbar" ? "navbar open-menu" : "navbar");

    const avatar = user?.avatar ? `https://cdn.discordapp.com/avatars/${user?.id}/${user?.avatar}.${user?.avatar?.includes("a_") ? "gif" : "png"}` : "/assets/images/user.png";
    const username = user?.global_name || user?.username || "Cade o nome?";

    const wrapperToggle = () => {

        if (subProfileWrapper.includes("active")) {
            setSubProfileWrapper("sub-profile-wrapper")
            setBxIcon(<IoIosArrowDown />);
            home?.classList.remove("blured");
            return;
        }

        setSubProfileWrapper("sub-profile-wrapper active");
        setBxIcon(<IoIosArrowUp />);
        home?.classList.add("blured");
        return;
    }

    function check() {
        if (!subProfileWrapper.includes("active")) return;
        return wrapperToggle();
    }

    if (home) home.onclick = () => check();
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
            <button className="bx menu-icon" onClick={toggle}>{menuNavbar === "navbar" ? <HiMenuAlt3 /> : <MdOutlineClose />}</button>
            <div id="header-profile" className={subProfileWrapper}>
                <div className="content">
                    <Link to="/chat" className="content-link">Bate Papo</Link>
                    <Link to={location.pathname || "/"} className="content-link">Dados</Link>
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
                    <a href={location.pathname || "/"} className="content-link">Registro de alterações</a>
                    <Link to="/bug" className="content-link">Reportar bug</Link>
                    <Link to="/redirect/logout" className="content-link">Sair</Link>
                </div>
            </div>
        </>
    );
}