export const GeneralStatus = {};

export async function GetStatus() {
    let date = Date.now();
    await fetch("https://api.saphire.one/status", { method: "GET" })
        .then(res => {
            GeneralStatus["saphire_pi"] = Date.now() - date;
            return res.json();
        })
        .then(res => {

            if (!res || !Array.isArray(res) || !res?.length) return;

            for (const data of res)
                GeneralStatus[data.name] = data.data || data.ms || 0;
        })
        .catch(console.log);

    date = Date.now();
    await fetch("https://twitch.saphire.one/ping", { method: "GET" })
        .then(() => GeneralStatus["twitch"] = Date.now() - date)
        .catch(() => { });

    return setTimeout(() => GetStatus(), 1000 * 5);
}