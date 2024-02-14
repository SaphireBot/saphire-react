import { useState, useEffect } from "react";
import StatusBox from "./box";

export default function Status() {

    const [circleClass, setCircleClass] = useState("");
    const [statusTitle, setStatusTitle] = useState("Buscando dados...");

    useEffect(() => {
        setStatusTitle({
            offline: "Serviços indisponíveis",
            medium: "Sistemas funcionando parcialmente",
            online: "Todos os sistemas estão funcionando corretamente"
        }[circleClass] || "Buscando dados...")

    }, [circleClass])

    return (
        <section className="status padding-top container">
            <div className="status-container">
                <div className="status-header">
                    <div className={"circle " + circleClass} id="circle"></div>
                    <h4 id="allStatus">{statusTitle}</h4>
                </div>
                {<StatusBox setCircleClass={setCircleClass} />}
            </div>
        </section>
    )
}