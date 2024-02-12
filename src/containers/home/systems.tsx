import { useState } from 'react';
import AllSystems from "./allSystems";

export default function Systems() {

    const [active, setActive] = useState(true);
    const systemMore = () => setActive(!active);

    return (
        <section className="system container">
            <div className="system-heading">
                <div className="system-title">
                    <h6 className="heading">sistemas automáticos</h6>
                    <h3 className="title">Está curioso(a) para saber alguns sistemas?</h3>
                    <p>Confira os diversos sistemas que ficam ligados 24 horas por dia para ajudar você e ao seu servidor
                    </p>
                </div>
                <div className="system-action"><button onClick={systemMore} id="toggleButton" className="btn">{active ? "Mostrar todos" : "Mostrar menos"}</button></div>
            </div>
            <div className="system-container" id="systems-container">
                <AllSystems active={active} />
            </div>
        </section>
    );
}

