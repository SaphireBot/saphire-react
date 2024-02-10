import { TfiAlarmClock } from "react-icons/tfi";
import { LuClock5 } from "react-icons/lu";
import { GiOpenTreasureChest } from "react-icons/gi";
import { TbZzz } from "react-icons/tb";
import { MdOutlineSatelliteAlt } from "react-icons/md";
import { FaRankingStar } from "react-icons/fa6";
import { FaPoll, FaRegCalendarCheck } from "react-icons/fa";
import { RiSpamFill } from "react-icons/ri";
import { HiOutlineStatusOnline } from "react-icons/hi";
import FourItens from "./fourSystems";

export default function AllSystems({ active }: { active: boolean }) {
    return (
        <>
            <FourItens />
            <div className={active ? "system-box more" : "system-box more active"}>
                <i className="bx icon"><TfiAlarmClock /></i>
                <h5 className="name">Lembretes</h5>
                <p>Lembretes é um ótimo meio de não esquecer as coisas tanto pessoal como dentro do servidor.</p>
            </div>
            <div className={active ? "system-box more" : "system-box more active"}>
                <i className="bx icon"><LuClock5 /></i>
                <h5 className="name">TempCall</h5>
                <p>Um avançado sistema de contar o tempo de todos os membros em call no servidor inteiro.</p>
            </div>
            <div className={active ? "system-box more" : "system-box more active"}>
                <i className="bx icon"><GiOpenTreasureChest /></i>
                <h5 className="name">Sapphire Chest</h5>
                <p>Um baú lendário que voa em todos os servidores buscando os canais mais ativos para se carregar.</p>
            </div>
            <div className={active ? "system-box more" : "system-box more active"}>
                <i className="bx icon"><TbZzz /></i>
                <h5 className="name">AFK Notification</h5>
                <p>Um simples e avançado sistema que notifica sobre usuários que estão offlines quando mencionados.</p>
            </div>
            <div className={active ? "system-box more" : "system-box more active"}>
                <i className="bx icon"><FaRankingStar /></i>
                <h5 className="name">Rankings</h5>
                <p>Quando se tem vários rankings, um grande sistema deve suprir todos os requisitos.</p>
            </div>
            <div className={active ? "system-box more" : "system-box more active"}>
                <i className="bx icon"><FaPoll /></i>
                <h5 className="name">Votações</h5>
                <p>Votações são necessárias. Automatizadas e bem construído para que nada dê errado.</p>
            </div>
            <div className={active ? "system-box more" : "system-box more active"}>
                <i className="bx icon"><RiSpamFill /></i>
                <h5 className="name">Spam Protect</h5>
                <p>Muitos usuários não sabem usar o Chat. Um sistema de proteção também é necessário além do Automod.
                </p>
            </div>
            <div className={active ? "system-box more" : "system-box more active"}>
                <i className="bx icon"><FaRegCalendarCheck /></i>
                <h5 className="name">MinDay</h5>
                <p>Configure dias mínimos de conta criada para que um usuário entre no servidor. Nada de contas fakes!
                </p>
            </div>
            <div className={active ? "system-box more" : "system-box more active"}>
                <i className="bx icon"><MdOutlineSatelliteAlt /></i>
                <h5 className="name">GSN (Logs)</h5>
                <p>Global System Notification é um sistema que cobre todos os tipos de notificações dentro e fora dos
                    servidores.</p>
            </div>
            <div className={active ? "system-box more" : "system-box more active"}>
                <i className="bx icon"><HiOutlineStatusOnline /></i>
                <h5 className="name">AutoRole</h5>
                <p>Um avançado e seguro sistema de autorole que verifica e adiciona os cargos aos novos membros do seu
                    servidor.</p>
            </div>
        </>
    );
}