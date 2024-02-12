import { Link } from "react-router-dom";
const unauthorizedImage = "/assets/images/unauthorized.png";

export default function Unauthorized() {
    localStorage.setItem("redirect", "/");
    return (
        <>
            <div className="security padding-top">
                <div className="security-container container">
                    <img src={unauthorizedImage} alt="unauthorizedImage" />
                    <div className="security-content">
                        <h6 className="heading">Não Autorizado</h6>
                        <h3 className="title">Alguns dados estão faltando</h3>
                        <p style={{ paddingBottom: "5%" }}>Verifique se você fez tudo certo e tente novamente. Qualquer coisa, chame
                            o suporte, tudo bem?</p>
                        <br />
                        <Link to="/" className="btn">Início</Link>
                    </div>
                </div>
            </div>
        </>
    )
}