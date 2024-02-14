import { TbStarsFilled } from "react-icons/tb";
import { useMemo, useState } from "react";
import LoadingComponent from "./loading";
import { allStatus } from "./box";

export default function ShardsDetails({ shards }: { shards: any[] }) {

    const [status, setStatus] = useState(<LoadingComponent id="" />);
    const [shardsStatus, setShardsStatus] = useState(<></>);

    useMemo(() => {

        const res = {
            background: "",
            text: ""
        };

        if (!shards?.length) {
            res.background = "#A52338";
            res.text = "OFFLINE";
            allStatus.offlines++
            return;
        }

        // let html = "";
        const status = {
            online: 0,
            offline: 0,
            partial: 0
        };

        setShardsStatus(
            <>
                {
                    shards.map(({ shard, ms, guilds }) => {

                        let classeName = "shard-name ";

                        if (ms > 0 && ms < 500) {
                            status.online++;
                            classeName += "online";
                        }
                        if (!ms || ms < 1 || isNaN(ms)) {
                            status.offline++;
                            classeName += "offline";
                        }
                        if (ms >= 500) {
                            status.partial++;
                            classeName += "medium";
                        }

                        return (
                            <div className="shard-box">
                                <div className={classeName}>{(shard || 0) + 1}</div>
                                <div className="shard-info">
                                    <div><span>Shard {(shard || 0) + 1}</span></div>
                                    <div><span>Status:</span><p>{ms <= 0 ? "Inicializando" : ms > 0 ? "Online" : "Offline"}</p></div>
                                    <div><span>Ping:</span><p>{ms || 0}ms</p></div>
                                    <div><span>Guilds:</span><p>{guilds || 0}</p></div>
                                </div>
                            </div>
                        );
                    })
                }
            </>
        );

        let color = "#23A55A";
        let text = "OPERACIONAL";

        if (status.partial > 0 || status.offline > 0) {
            color = "#DE870D";
            text = "PARCIAL";
        }
        if (!status.online) {
            color = "#A52338";
            text = "OFFLINE";
        }

        if (text === "OPERACIONAL") allStatus.onlines++
        if (text == "PARCIAL") allStatus.partials++
        if (text == "OFFLINE") allStatus.offlines++

        setStatus(<LoadingComponent background={color} text={text} />);
    }, [shards])

    return (
        <details className="status-item">
            <summary>
                <div className="faq-title"><TbStarsFilled />Saphire Shards</div>
                {status}
            </summary>
            <div className="status-content">
                Shards são pedaços da Saphire para evitar problemas e aumentar o desempenho. Cada Shard tem
                uma quantia de servidores e usuários.
                <div className="shards-container">{shardsStatus}</div>
            </div>
        </details>
    );
}