const SaphireBotLokinLinkUrl = "https://discord.com/api/oauth2/authorize?client_id=912509487984812043&redirect_uri=https%3A%2F%2Freact.saphire.one%2Fredirect&response_type=token&scope=guilds%20email%20identify";

export default function JoinButton() {

    function click() {
        const pathname = location.pathname;
        if (pathname !== "/redirect") localStorage.setItem("redirect", pathname || "/");
        return window.location.replace(SaphireBotLokinLinkUrl);
    }

    return (
        <div id="button" className="nav-button" >
            <a onClick={click}>Entrar</a>
        </div>
    );
}