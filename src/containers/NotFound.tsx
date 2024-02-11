import { Link } from "react-router-dom";
import { Footer, Header } from "./headerAndFooter";
import { Helmet } from "react-helmet";

export default function NotFound() {

    return (
        <>
            <Header />
            <Helmet>
                <meta name="description" content="Parece que você tentou acessar uma página que não existe. Você está indo por caminhos desconhecidos." />
                <meta name="title" content="As vezes, os caminhos são desconhecidos" />
                <meta name="image" content="https://saphire.one/images/saphiremoon.png" />
            </Helmet>
            <section className="security padding-top">
                <div className="security-container container">
                    <img src="/assets/images/notfound.png" alt="NotFoundImage" />
                    <div className="security-content">
                        <h6 className="heading">Página não encontrada</h6>
                        <h3 className="title">As vezes, os caminhos são desconhecidos</h3>
                        <p>Vou te ajudar, tudo bem? Não tem nada aqui, mas você pode voltar para o início.</p>
                        <br />
                        <Link to="/" className="btn">Início</Link>
                    </div>
                </div>
            </section>
            <Footer />
        </>
    );
}