export default function Head({ title, description, imagePath, url }: { title?: string, description?: string, imagePath?: string, url?: string }) {

    const head = document.getElementsByName("head").item(0);

    const content = {
        title: "Saphire Moon",
        description: "Todo servidor do Discord precisa de um brilho para iluminar até mesmo os cantos mais escuros. Administração, Economia, Jogos, Comandos divertidos, Sistemas de Logs e Segurança, etc etc e etc. Sim, eu tenho tudo isso para te ajudar e crescer ainda mais o seu servidor. ✨",
        imagePath: "/assets/images/home.png",
        url: "https://saphire.one/"
    };

    if (head)
        head.innerHTML = `
    <head>
            <meta charSet="utf-8" />
            <meta name="viewport" content="width=device-width,initial-scale=1" />
            <meta property="og:url" content=${url || content.url}></meta>
            <meta property="og:type" content="website" />
            <meta property="og:title" content=${title || content.title} />
            <meta property="og:site_name" content="Site oficial da bot Saphire Moon" />
            <meta property="og:locale" content="pt_BR" />
            <meta property="og:description"
                content=${description || content.description} />
            <meta property="og:image" content=${imagePath || content.imagePath} />
            <meta property="og:image:type" content="image/png" />
            <meta property="og:image:alt" content="Picture Alt Content" />
            <meta property="og:see_also"
                content="https://discord.com/oauth2/authorize?client_id=912509487984812043&scope=bot%20applications.commands&permissions=2146958847,https://discord.gg/2EMVCbJxuC" />
            <meta name="theme-color" content="#090A1A" />
            <meta name="rating" content="general" />
            <meta name="copyright" content="Saphire Moon" />
            <meta name="twitter:creator" content="@rodycouto" />
            <meta name="twitter:card" content="sumary" />
            <meta name="keywords" content="bot,discord,discord bot,saphire moon,saphire bot" />
            <link rel="icon" href="/favicon.ico" />
            <link rel="apple-touch-icon" href="/favicon.ico" />
            <link rel="manifest" href="/manifest.json" />
            <title>Carregando...</title>
        </head>
        `

}