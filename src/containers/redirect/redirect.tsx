import { Navigate } from "react-router-dom";
const redirectPath = localStorage.getItem("redirect");
const fragment = new URLSearchParams(window.location.hash.slice(1));
const [
    access_token,
    token_type,
    expires_in,
    error
] = [
        fragment.get('access_token'),
        fragment.get('token_type'),
        fragment.get('expires_in'),
        fragment.get('error')
    ];

export default function RedirectBase() {

    console.log(access_token, token_type, expires_in, error);
    if (redirectPath) {
        fetch('https://discord.com/api/users/@me', {
            method: "GET",
            headers: { authorization: `${token_type} ${access_token}` }
        })
            .then(res => res.json())
            .then(user => {
                user.tokenType = token_type;
                user.accessToken = access_token;
                user.expiresIn = expires_in;
                user.loggedAt = Date.now();
                localStorage.setItem('userData', JSON.stringify(user));
                save({
                    id: user.id,
                    Tokens: {
                        access_token,
                        token_type,
                        expires_in
                    }
                });
                if (redirectPath) {
                    localStorage.removeItem("redirect");
                    return <Navigate to={redirectPath} />;
                }
            })
            .catch(() => window.location.href = "https://saphire.one/");
    } else return <Navigate to="/" />;

}

async function save(data: unknown) {
    return await fetch("https://api.saphire.one/save_login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then(() => console.log("Login complete successfully"))
        .catch(() => console.log("fail to save data"));
}
