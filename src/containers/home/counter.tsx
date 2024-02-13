import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loading from "../global/loading";
import socket from "../../websocket/websocket";
type setter = React.Dispatch<React.SetStateAction<string>>;

export default function Counter() {

    const location = useLocation();
    const [guilds, setGuilds] = useState("");
    const [commands, setCommands] = useState("");
    const [interactions, setInteractions] = useState("");
    const [viewers, setViewers] = useState("");
    const [oldData, setOldData] = useState({ guilds: -1, commands: -1, interactions: -1, viewers: -1 });
    const [data, setData] = useState({ guilds: 0, commands: 0, interactions: 0, viewers: 0 });

    useEffect(() => {
        if (location.pathname !== "/") return;
        if (!socket.hasListeners("home"))
            socket.on("home", value => {
                if (value) setData(value);
            });

        socket
            .timeout(3000)
            .emitWithAck("home", "get")
            .then(value => {
                if (value) setData(value)
            })
            .catch(() => { })

    }, [location.pathname])

    useEffect(() => {
        if (location.pathname !== "/") return;
        numberCount(oldData?.guilds || 0, data?.guilds || 0, setGuilds);
        numberCount(oldData?.commands || 0, data?.commands || 0, setCommands);
        numberCount(oldData?.interactions || 0, data?.interactions || 0, setInteractions);
        numberCount(oldData?.viewers || 0, data?.viewers || 0, setViewers);

        setOldData({
            viewers: data?.viewers || 0,
            guilds: data?.guilds || 0,
            commands: data?.commands || 0,
            interactions: data?.interactions || 0
        });
    }, [data.viewers, data.commands, data.guilds, data.interactions]);

    return (
        <section className="invite">
            <div className="section-bg">
                <div className="invite-container container">
                    <div className="invite-left">
                        <h6 className="heading">torne uma experiência única</h6>
                        <h3 className="title">Por que me adicionar em seu servidor?</h3>
                        <div className="statics">
                            <div className="static serv"><span className="number shine" id="guilds">{guilds || <Loading sizeInPx={25} />}</span><Link className="name" id="guilds"
                                to="/servers">servidores</Link></div>
                            <div className="static cmd"><span className="number shine" id="commands">{commands || <Loading sizeInPx={25} />}</span><Link className="name" id="commands"
                                to="/commands">comandos</Link></div>
                            <div className="static msg"><span className="number shine" id="interactions">{interactions || <Loading sizeInPx={25} />}</span><span
                                className="name">interações</span></div>
                            <div className="static msg"><span className="number shine" id="viewers">{viewers || <Loading sizeInPx={25} />}</span><span
                                className="name">👀</span></div>
                        </div>
                        <h6 className="h6Text">*Os dados acima são atualizados em tempo real</h6>
                    </div>
                    <div className="invite-right">
                        <p>Diversão e Entretenimento, Customização, Jogos, Moderação Eficiente, Recursos Úteis, Constante
                            Desenvolvimento, Suporte 24/7, uma economia avançada e muito mais. O limite aqui é a sua
                            imaginação.</p>
                        <br />
                        <p>Por algum motivo não tem o que você quer? Fale com o suporte que vamos tentar adicionar tudo o
                            que te agrada.</p>
                        <br />
                        <p>Se mais de{commands || 0} comandos, diversos sistemas e jogos não é motivo para me adicionar no seu servidor,
                            não sei o que mais te agrada.</p><br />
                    </div>
                </div>
            </div>
        </section>
    );

    function numberCount(before: number, after: number, set: setter) {
        if (before === after) return;

        const minOrMax = before < after ? Math.min : Math.max;
        const difference = after - before;
        const intervals = Math.min(100, Math.abs(difference)) || 1;
        const int = difference / ((intervals - 1) || 1);

        let i = 1
        const interval = setInterval(() => {
            set(
                currency(
                    (minOrMax(i * int, difference) + before).toFixed(0)
                )
            );
            i++
            if (i >= intervals)
                clearInterval(interval)
        });

        return after
    }

    function currency(num: string) {
        const numberFormated = `${Intl.NumberFormat('pt-BR', {
            currency: 'BRL',
            style: 'currency'
        }).format(parseInt(num))}`

        return numberFormated.substring(0, numberFormated.length - 3).replace(/R\$/g, "")
    }
}