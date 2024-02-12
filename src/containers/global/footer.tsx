import { AiOutlineTeam } from "react-icons/ai";
import { FaDiscord, FaGear, FaGithub } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer>
            <div className="socials">
                <abbr title="Desenvolvedores"><Link to="/staff" className="bx"><FaGear className="bxIcon" /></Link></abbr>
                <abbr title="GitHub"><a href="https://github.com/SaphireBot" className="bx"><FaGithub className="bxIcon" /></a></abbr>
                <abbr title="Discord"><a href="https://discord.gg/2EMVCbJxuC" className="bx"><FaDiscord className="bxIcon" /></a></abbr>
                <abbr title="Termos de uso"><Link to="/termos" className="bx"><IoDocumentTextOutline className="bxIcon" /></Link> </abbr>
                <abbr title="Parceiros"><Link to="/partners" className="bx"><AiOutlineTeam className="bxIcon" /></Link></abbr>
            </div>
            <p className="copyright">© Todos os direitos reservados, Saphire Moon - 2023</p>
        </footer >
    )
}