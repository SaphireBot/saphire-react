import "../../index.css";
import SaphireImage from "../../assets/images/home.png";
import securutyImage from "../../assets/images/security.png";
import Counter from "./counter";
import Systems from "./systems";
import { Header, Footer } from "../headerAndFooter"
import { Link } from "react-router-dom";
import NotFoundImage from "../../assets/images/notfound.png";

export function Home() {
    window.document.title = "Saphire Moon - React";

    return (
        <>
            <Header />
            <section className="home container"><img src={SaphireImage} alt="" />
                <div className="home-content">
                    <h4 className="logo-text shine">Saphire Moon</h4>
                    <p>Todo servidor do Discord precisa de um brilho para iluminar até mesmo os cantos mais escuros.
                        Administração, Economia, Jogos, Comandos divertidos, Sistemas de Logs e Segurança, etc etc e etc. Sim,
                        eu tenho tudo isso para te ajudar e crescer ainda mais o seu servidor. ✨</p>
                    <a
                        href="https://discord.com/oauth2/authorize?client_id=912509487984812043&scope=bot%20applications.commands&permissions=2146958847"
                        className='btn' target="_blank" rel="noreferrer">Convide-me</a>
                </div>
            </section>
            <Counter />
            <section className="system container">
                <Systems />
            </section >
            <section className="security">
                <div className="section-bg">
                    <div className="security-container container"><img src={securutyImage} alt="securutyImage" />
                        <div className="security-content">
                            <h6 className="heading">Segurança</h6>
                            <h3 className="title">Protegendo seus dados: Priorizando a segurança!</h3>
                            <p>Todos os bancos de dados da Saphire Moon são protegidos por senhas e criptografados para que
                                alguém mal intencionado não consiga seus dados.</p>
                            <br />
                            <p>Você também tem o controle do que quer salvar e deletar a qualquer momento de qualquer dia.</p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="faq container">
                <h6 className="heading">FAQ</h6>
                <h3 className="title">Desvendando as dúvidas mais comuns</h3>
                <div className="faq-container">
                    <details className="accordion-item">
                        <summary>
                            <div className="faq-title">Como ganhar Safiras na Saphire Moon?</div><i
                                className="bx bxs-chevron-right expand-icon"></i>
                        </summary>
                        <div className="faq-content">Você pode ganhar Safiras nos comandos daily e apostando com outros jogadores.
                        </div>
                    </details>
                    <details className="accordion-item">
                        <summary>
                            <div className="faq-title">O que eu ganho votando no TopGG?</div><i
                                className="bx bxs-chevron-right expand-icon"></i>
                        </summary>
                        <div className="faq-content">Ao <a href="https://top.gg/bot/912509487984812043">votar em mim</a> no TopGG, você
                            ganha 5.000 Safiras + 1.000 Experiências por voto. Além de me ajudar ajudar a crescer no Discord e
                            no TopGG.</div>
                    </details>
                    <details className="accordion-item">
                        <summary>
                            <div className="faq-title">Emprestei Safiras para o meu amigo e ele não quer me devolver</div><i
                                className="bx bxs-chevron-right expand-icon"></i>
                        </summary>
                        <div className="faq-content">A Saphire's Team não irá fazer nada em relação a isso. As Safiras são suas e a
                            equipe da Saphire só pode interferir na quebra de alguma regra ou bug. Tome cuidado ao "emprestar"
                            Safiras, isso pode ser muito perigoso.</div>
                    </details>
                    <details className="accordion-item">
                        <summary>
                            <div className="faq-title">Eu não consigo usar nenhum comando da Saphire ou eles não aparecem</div><i
                                className="bx bxs-chevron-right expand-icon"></i>
                        </summary>
                        <div className="faq-content">Se os comandos não aparecem, quer dizer que os <a
                            href="https://support.discord.com/hc/en-us/articles/1500000368501-Slash-Commands-FAQ">/slashcommands</a>foram
                            bloqueados no servidor ou não tem permissão para isso. Se os comandos aparecem e a Saphire não
                            responde, quer dizer que ela caiu ou está reiniciando. Talvez o comando possa estar com algum bug,
                            mas é muito difícil. Recomendamos fortemente entrar em contato com o suporte para que possamos
                            fornecer alguma ajuda considerável.</div>
                    </details>
                    <details className="accordion-item">
                        <summary>
                            <div className="faq-title">Minha dúvida não está aqui!</div><i
                                className="bx bxs-chevron-right expand-icon"></i>
                        </summary>
                        <div className="faq-content">Entre em contato com o <a href="https://discord.gg/2EMVCbJxuC">suporte</a>, orás
                            bolas.</div>
                    </details>
                </div>
            </section>
            <Footer />
        </>
    )
}

export function NotFound() {

    return (
        <>
            <Header />
            <section className="security padding-top">
                <div className="security-container container">
                    <img src={NotFoundImage} alt="NotFoundImage" />
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