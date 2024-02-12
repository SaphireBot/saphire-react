const defaultImage = "/public/assets/images/user.png";

export default function MetaSEO({
    title,
    description,
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl
}: {
    title?: string | undefined,
    description?: string | undefined,
    ogTitle?: string | undefined,
    ogDescription?: string | undefined,
    ogImage: string | undefined,
    ogUrl?: string | undefined,
}) {

    if (!title) title = "Saphire Moon";
    if (!description) description = "Todo servidor do Discord precisa de um brilho para iluminar até mesmo os cantos mais escuros. Administração, Economia, Jogos, Comandos divertidos, Sistemas de Logs e Segurança, etc etc e etc. Sim, eu tenho tudo isso para te ajudar e crescer ainda mais o seu servidor. ✨";
    if (!ogImage) ogImage = defaultImage;

    setMetaTag("name", "title", title);
    setMetaTag("name", "description", description);
    setMetaTag("property", "og:title", ogTitle || title);
    setMetaTag("property", "og:description", ogDescription || description);
    setMetaTag("property", "og:image", ogImage);
    setMetaTag("property", "og:url", ogUrl || location.href);

    function setMetaTag(attr: string, key: string, content: string) {
        if (content) {
            let element = document.querySelector(`meta[${attr}="${key}"]`)
            if (!element) {
                element = document.createElement("meta");
                element.setAttribute(attr, key);
                document.head.appendChild(element);
            }
            element.setAttribute("content", content);
        }
    }
}