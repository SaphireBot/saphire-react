import Footer from "./containers/global/footer";
import Header from "./containers/global/header";
import metaSEO from "./containers/meta";
const pathSEOContent = {
    "/commands": {
        title: "Página principal de comandos",
        description: "Veja todos os incríveis comando da bot Saphire Moon!"
    },
    "/unauthorized": {
        title: "Acesso não autorizado",
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
        title: "Status, o coração da Saphire",
        description: "Aqui, você pode ver tudo. Cada pedacinho e como eles estão."
    }
} as Record<string, Record<string, string>>

export default function Layout(Element: JSX.Element) {

    const SEO = pathSEOContent[location.pathname];

    metaSEO({
        title: SEO?.title,
        description: SEO?.description,
        ogImage: SEO?.ogImage,
        ogDescription: SEO?.ogDescription,
        ogTitle: SEO?.ogTitle,
        ogUrl: SEO?.ogUrl
    });

    return (
        <>
            <Header />
            {Element}
            <Footer />
        </>
    );
}