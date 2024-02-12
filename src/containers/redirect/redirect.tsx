import { Navigate } from "react-router-dom";
const fragment = new URLSearchParams(window.location.hash.slice(1));
const [
    access_token,
    token_type,
    expires_in,
    error
] = [
        fragment.get("access_token"),
        fragment.get("token_type"),
        fragment.get("expires_in"),
        fragment.get("error")
    ];

// let path = localStorage.getItem("redirect") || "/";
// if (path?.includes("redirect")) path = "/";
// if (!path?.startsWith("/")) path = `/${path}`;

export default function RedirectBase() {

    if (location.href.includes("logout")) {
        localStorage.clear();
        return (<Navigate to="/" />)
    }

    if (access_token && token_type && expires_in)
        return SetTokenWarnAndNavegate();

    // if (path) localStorage.removeItem("redirect");
    // return (<Navigate to={path} />);
    return (<Navigate to="/" />);
}

function SetTokenWarnAndNavegate() {
    const token = {
        access_token: access_token,
        token_type: token_type,
        expires_in: expires_in,
        error: error
    };
    history.pushState(null, "", "/");
    console.log(token);
    localStorage.setItem("token", JSON.stringify(token));
    console.log("Message from developer: Eai coisa fofa, tudo bom? Se você entrou aqui por que alguém pediu, tenha cuidado! Os dados acima são SEUS e apenas SEUS! O token acima permite que a Saphire consiga acesso aos seus dados do Discord, como seu email, seus servidores e seus dados públicos, como nome, ID, avatar etc. Não passe seus dados a ninguém, beleza? Se você é um desenvolvedor, seja muito bem vindo ao nosso console.log() do site da Saphire Moon. Estou sempre enviando mensagens do que está acontecendo no site e você pode ver as coisas funcionando por de baixo dos panos. Ha! Se você descobriu algum bug ou algo de errado, fale comigo por favor. Meu username no Discord é \"rodycouto\". obrigadoo <3")

    // if (path) localStorage.removeItem("redirect");
    return (<Navigate to="/" />);
}