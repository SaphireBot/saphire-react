import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
type setter = React.Dispatch<React.SetStateAction<string>>;

export default function Counter() {
    const [guilds, setGuilds] = useState("0");
    const [commands, setCommands] = useState("0");
    const [interactions, setInteractions] = useState("0");

    const query = useQuery({
        queryKey: ["home"],
        refetchInterval: 1000 * 10,
        async queryFn() {
            const res = await fetch("https://api.saphire.one/home", { method: "GET" })
                .then(res => res.json())
                .catch(() => { });
            return res;
        }
    })

    useMemo(() => {
        numberCount(parseInt(guilds || "0"), query.data?.guilds || 0, setGuilds)
        numberCount(parseInt(commands || "0"), query.data?.commands || 0, setCommands)
        numberCount(parseInt(interactions || "0"), query.data?.interactions || 0, setInteractions)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [query.data]);

    return (
        <section className="invite">
            <div className="section-bg">
                <div className="invite-container container">
                    <div className="invite-left">
                        <h6 className="heading">torne uma experiência única</h6>
                        <h3 className="title">Por que me adicionar em seu servidor?</h3>
                        <div className="statics">
                            <div className="static serv"><span className="number shine" id="guilds">{guilds || "00"}</span><Link className="name" id="guilds"
                                to="/servers">servidores</Link></div>
                            <div className="static cmd"><span className="number shine" id="commands">{commands || "00"}</span><Link className="name" id="commands"
                                to="/commands">comandos</Link></div>
                            <div className="static msg"><span className="number shine" id="interactions">{interactions || "00"}</span><span
                                className="name">interações</span></div>
                        </div>
                        <h6 className="h6Text">*Os dados acima são atualizados a cada 5 segundos</h6>
                    </div>
                    <div className="invite-right">
                        <p>Diversão e Entretenimento, Customização, Jogos, Moderação Eficiente, Recursos Úteis, Constante
                            Desenvolvimento, Suporte 24/7, uma economia avançada e muito mais. O limite aqui é a sua
                            imaginação.</p>
                        <br />
                        <p>Por algum motivo não tem o que você quer? Fale com o suporte que vamos tentar adicionar tudo o
                            que te agrada.</p>
                        <br />
                        <p>Se mais de 85 comandos, diversos sistemas e jogos não é motivo para me adicionar no seu servidor,
                            não sei o que mais te agrada.</p><br />
                    </div>
                </div>
            </div>
        </section>
    );

    function numberCount(before: number, after: number, set: setter) {

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