import { useState, useEffect } from "react";
import { User, Token } from "../../types";
import { Link } from "react-router-dom";
import Loading from "./loading";
import { UserOptions } from "./userOptions";
import JoinButton from "./joinButton";
const admins = [
    "351903530161799178",
    "395669252121821227",
    "451619591320371213",
    "435601052755296256",
    "781137239194468403",
    "648389538703736833"
];

export default function Header() {

    // User data
    const token = JSON.parse(localStorage.getItem("token") || "{}") as Token;
    const [user, setUser] = useState<User>({} as User);
    const [active, setActive] = useState<string>(window.scrollY >= 80 ? "bg active" : "bg");
    const [ButtonOrUserOptions, setButtonOrUserOptions] = useState<JSX.Element>(<Loading sizeInPx={30} />);
    const [menuNavbar, setMenuNavbar] = useState<string>("navbar");

    const userOptionsJSX = () => <UserOptions menuNavbar={menuNavbar} setMenuNavbar={setMenuNavbar} />;

    useEffect(() => {

        const storage = JSON.parse(localStorage.getItem("user") || "{}") as User;
        if (storage?.id || user?.id) {
            console.log("Message from developer: Eai! Bem-vindo de volta. Como de costume, aqui está os dados que temos sobre você.", storage);
            setUser(storage);
            return setButtonOrUserOptions(userOptionsJSX());
        }

        if (!token?.access_token || !token?.token_type)
            return setButtonOrUserOptions(<JoinButton />);

        fetch("https://discord.com/api/users/@me", {
            method: "GET",
            headers: { authorization: `${token.token_type} ${token.access_token}` }
        })
            .then(res => res.json())
            .then(user => {
                if (user?.id) {
                    localStorage.setItem("user", JSON.stringify(user));
                    setUser(user);
                    setButtonOrUserOptions(userOptionsJSX());
                    console.log("Message from developer: Para desencargo de consciência, esses são os dados que nós pegamos de você, tudo bem? Se você olhar bem, não tem nada demais. Pode relaxar e curtir o site <3", user)
                    return user;
                }
                return user;
            })
            .finally(() => {
                if (!user?.id) return setButtonOrUserOptions(<JoinButton />);
                if (user?.id) return save(user, token);
            })
            .catch(err => {
                console.log(err);
                return setButtonOrUserOptions(<JoinButton />);
            })
        return;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     if (user?.id) setButtonOrUserOptions(<UserOptions menuNavbar={menuNavbar} setMenuNavbar={setMenuNavbar} />);
    //     return setButtonOrUserOptions(<JoinButton />)
    // }, [user, menuNavbar]);

    window.onscroll = () => {
        if (window.scrollY >= 80 && active === "bg active") return;
        if (window.scrollY <= 80 && active === "bg") return;
        return setActive(window.scrollY >= 80 ? "bg active" : "bg");
    };

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
                    {admins.includes(user?.id) && (<li><Link to="/admin" className="nav-link">Administrativo</Link></li>)}
                </ul>
                {ButtonOrUserOptions}
            </nav>
        </header >
    );
}
function save(user: any, token: any) {
    if (!user?.id || !token?.access_token || !token?.token_type) return

    user.tokenType = token?.token_type;
    user.accessToken = token?.access_token;
    user.expiresIn = token?.expires_in;
    user.loggedAt = Date.now();
    console.log("Login complete successfully.", user)

    fetch("https://api.saphire.one/save_login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id: user.id,
            Tokens: {
                access_token: token?.token_type,
                token_type: token?.access_token,
                expires_in: token?.expires_in
            }
        })
    })
        .catch(err => console.log("Fail to save data", err));

    return;
}
