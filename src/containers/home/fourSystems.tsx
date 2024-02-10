import { FaTwitch } from "react-icons/fa";
import { GiPartyPopper } from "react-icons/gi";
import { IoIosLink } from "react-icons/io";
import { LuLanguages } from "react-icons/lu";

export default function FourItens() {
    return (
        <>
            <div className="system-box twitch">
                <i className="bx icon"><FaTwitch /></i >
                <h5 className="name">Twitch</h5>
                <p>Ative as notificações dos seus streamers favoritos diretamente nos canais do seu servidor.</p>
            </div >
            <div className="system-box sorteios">
                <i className="bx icon"><GiPartyPopper /></i>
                <h5 className="name">Sorteios</h5>
                <p>Sorteios é um dos principais meios para interagir com os membros do servidor. E isso é muito
                    avançado!</p>
            </div>
            <div className="system-box languages">
                <i className="bx icon"><LuLanguages /></i>
                <h5 className="name">Idiomas</h5>
                <p>Com suporte a 7 idiomas diferentes, atendendo a mais de 100 paises ao redor do mundo, os limites aumentam.</p>
            </div>
            <div className="system-box linkedroles">
                <i className="bx icon"><IoIosLink /></i>
                <h5 className="name">Cargos Vinculados</h5>
                <p>Um sistema integrado com o Discord que possibilita você pegar cargos com requisitos em todos os servidores</p>
            </div>
        </ >
    );
}