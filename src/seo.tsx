import { useEffect, useState } from "react";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useLocation } from "react-router-dom";

const PathSEOContent = {
    "/": {
        title: "Saphire Moon",
        description: "Todo servidor do Discord precisa de um brilho para iluminar até mesmo os cantos mais escuros. Administração, Economia, Jogos, Comandos divertidos, Sistemas de Logs e Segurança, etc etc e etc. Sim, eu tenho tudo isso para te ajudar e crescer ainda mais o seu servidor. ✨"
    },
    "/commands": {
        title: "Página de comandos",
        description: "Veja todos os incríveis comando da bot Saphire Moon!"
    },
    "/unauthorized": {
        title: "Acesso não Autorizado",
        description: "Verifique se você fez tudo certo e tente novamente. Qualquer coisa, chame o suporte, tudo bem?",
        ogImage: "/assets/images/unauthorized.png"
    },
    "/staff": {
        title: "Conheça nossa equipe",
        description: "Página onde fica os mais incríveis seres humanos que pisam nesta Terra!"
    },
    "/support": {
        title: "Central de Suporte",
        description: "Todos os problemas são resolvidos diretamente no servidor principal de suporte da Saphire Moon.",
        ogUrl: "https://discord.gg/2EMVCbJxuC"
    },
    "/status": {
        title: "O coração da Saphire",
        description: "Aqui, você pode ver tudo. Cada pedacinho e como eles estão."
    },
    "/notfound": {
        title: "404 ? Não existe nada aqui",
        description: "Vou te ajudar, tudo bem? Não tem nada aqui, mas você pode voltar para o início. Que tal?"
    }
} as Record<string, Record<string, string>>;

export default function SEO({ ogImage, path }: { ogImage?: string, path: string }) {

    const location = useLocation();
    const [pathname, setPathname] = useState(path);
    const { ogTitle, title, ogDescription, description } = PathSEOContent[pathname]
        || {
        title: "404 ? Não existe nada aqui",
        description: "Vou te ajudar, tudo bem? Não tem nada aqui, mas você pode voltar para o início. Que tal?"
    };

    useEffect(() => setPathname(location.pathname), [location.pathname]);

    return (
        <HelmetProvider>
            <Helmet>
                <title>{ogTitle || title || "Saphire Moon"}</title>
                <meta property="og:title" content={ogTitle || title || "Saphire Moon"} />
                <meta
                    property="og:description"
                    content={
                        ogDescription
                        || description
                        || "Todo servidor do Discord precisa de um brilho para iluminar até mesmo os cantos mais escuros. Administração, Economia, Jogos, Comandos divertidos, Sistemas de Logs e Segurança, etc etc e etc. Sim, eu tenho tudo isso para te ajudar e crescer ainda mais o seu servidor. ✨"
                    } />
                <meta
                    property="og:image"
                    content={
                        ogImage
                        || "/assets/images/user.png"
                    } />
            </Helmet>
        </HelmetProvider>
    );
}