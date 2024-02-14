import { useEffect, useMemo, useState } from "react";
import socket from "../../websocket/websocket"
import LoadingComponent from "./loading";
import ShardsDetails from "./shards";

// eslint-disable-next-line react-refresh/only-export-components
export const allStatus = {
    systems: 6,
    partials: 0,
    offlines: 0,
    onlines: 0
}

export default function StatusBox(
    {
        setCircleClass
    }: {
        setCircleClass: React.Dispatch<React.SetStateAction<string>>;
    }) {

    const [shards, setShards] = useState([]);
    const [discord, setDiscord] = useState(<LoadingComponent id="discord" />);
    const [saphire_pi, setSaphire_pi] = useState(<LoadingComponent id="saphire_pi" />);
    const [websocket, setWebsocket] = useState(<LoadingComponent id="websocket" />);
    const [twitch, setTwitch] = useState(<LoadingComponent id="twitch" />);
    const [database1, setDatabase1] = useState(<LoadingComponent id="database1" />);
    const [database2, setDatabase2] = useState(<LoadingComponent id="database2" />);
    const [database3, setDatabase3] = useState(<LoadingComponent id="database3" />);
    const [rediscache, setRediscache] = useState(<LoadingComponent id="rediscache" />);
    const [redisranking, setRedisranking] = useState(<LoadingComponent id="redisranking" />);
    const [redisuser, setRedisuser] = useState(<LoadingComponent id="redisuser" />);
    const [discloud, setDiscloud] = useState(<LoadingComponent id="discloud" />);
    const [topgg, setTopgg] = useState(<LoadingComponent id="topgg" />);
    const [statusResponse, setStatusResponse] = useState({} as any);

    const status = [
        { setted: false, id: "discord", name: "Discord API", state: discord, set: setDiscord },
        { setted: false, id: "saphire_pi", name: "Saphire API", state: saphire_pi, set: setSaphire_pi },
        { setted: false, id: "websocket", name: "Saphire Websocket", state: websocket, set: setWebsocket },
        { setted: false, id: "twitch", name: "Saphire Twitch", state: twitch, set: setTwitch },
        { setted: false, id: "database1", name: "MongoDB Atlas 1", state: database1, set: setDatabase1 },
        { setted: false, id: "database2", name: "MongoDB Atlas 2", state: database2, set: setDatabase2 },
        { setted: false, id: "database3", name: "MongoDB Atlas 3", state: database3, set: setDatabase3 },
        { setted: false, id: "rediscache", name: "Redis Cluster 1", state: rediscache, set: setRediscache },
        { setted: false, id: "redisranking", name: "Redis Cluster 2", state: redisranking, set: setRedisranking },
        { setted: false, id: "redisuser", name: "Redis Cluster 3", state: redisuser, set: setRedisuser },
        { setted: false, id: "discloud", name: "Discloud API", state: discloud, set: setDiscloud },
        { setted: false, id: "topgg", name: "Top GG API", state: topgg, set: setTopgg },
    ];

    useEffect(() => {
        if (socket.hasListeners("status_page")) return;
        socket.on("status_page", value => {
            for (const data of status) data.setted = false;
            if (!Object.keys(value || {})?.length) return setStatusResponse({});
            return setStatusResponse(value);
        });

        for (const data of status) data.setted = false;
        socket
            ?.timeout(5000)
            ?.emitWithAck("status_page", "get")
            ?.then(value => setStatusResponse(value))
            ?.catch(() => setStatusResponse({}));
    }, [])

    useMemo(() => {

        status[2].setted = true;
        setWebsocket(defineStatus({ id: "websocket", ms: socket?.connected ? 12 : -1 }));

        allStatus.systems = 6;
        allStatus.partials = 0;
        allStatus.offlines = 0;
        allStatus.onlines = 0;

        if (statusResponse["shards"]?.length)
            setShards(statusResponse["shards"]);

        for (const stat of status) {
            const ms = statusResponse[stat.id];
            if (typeof ms === "number") {
                stat.setted = true;
                stat.set(defineStatus({ id: stat.id, ms: ms }));
            }
        }

        for (const stat of status)
            if (!stat.setted)
                stat.set(defineStatus({ id: stat.id, ms: 0 }));

        generalStatus(setCircleClass);
    }, [statusResponse]);

    return (
        <div className="status-content">
            {<ShardsDetails shards={shards} />}
            {
                ...status
                    .map(({ name, state }) => (
                        <>
                            <div className="status-box">
                                <div className="status-name">{name}</div>
                                {state}
                            </div>

                        </>
                    ))
            }
        </div>
    );
}

function defineStatus({ id, ms }: { id: string, ms: number }) {

    const data = {
        background: "#363636",
        text: "INDISPONÍVEL"
    }

    if (ms < 500) {
        data.text = "OPERACIONAL";
        data.background = "#23A55A"; // verde
    }

    if (!ms || ms < 1) {
        data.text = "INDISPONÍVEL";
        data.background = "#B3BAC5"; // cinza
    }

    if (ms >= 500 && ms <= 1000) {
        data.text = "RAZOÁVEL";
        data.background = "#FFAB00"; // amarelo
    }

    if (ms > 1000) {
        data.text = "LENTIDÃO";
        data.background = "#ED4344"; // vermelho
    }

    if (data.text === "OPERACIONAL") allStatus.onlines++
    if (["RAZOÁVEL", "LENTIDÃO"].includes(data.text)) allStatus.partials++
    if (data.text == "INDISPONÍVEL") allStatus.offlines++

    return (
        <LoadingComponent
            id={id}
            text={data.text}
            background={data.background}
        />
    );
}

function generalStatus(setCircleClass: React.Dispatch<React.SetStateAction<string>>) {
    let classe = "offline";
    if (allStatus.partials > 0 || allStatus.offlines > 0) classe = "medium";
    if (!allStatus.onlines) classe = "offline";
    if (!allStatus.offlines && !allStatus.partials && allStatus.onlines > 0) classe = "online";
    return setCircleClass(classe);
}