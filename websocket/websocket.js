// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Server, Socket } from "socket.io";
import { env } from "process";
import { QuickDB } from "quick.db";
import { io } from "socket.io-client";
import { GetStatus, GeneralStatus } from "./status.js";
const statusPageInterval = new Map();
const SQLite = new QuickDB({ filePath: "cache.sqlite" });
GetStatus();

export default class SocketServer extends Server {

    constructor(http) {
        super(
            http,
            { cors: { origin: "*" } }
        );
        this.api = new io(`${env.WEBSOCKET_SAPHIRE_API_LOGIN_URL}`,
            {
                reconnectionDelayMax: 5000,
                auth: {
                    token: `${env.WEBSOCKET_SAPHIRE_API_LOGIN_PASSWORD}`,
                    shardId: "react"
                }
            });
        this.staffs = new Map();
        this.guilds = new Map();
        this.commands = new Map();
        this.interactions = 0;
    }

    async enableListeners() {
        this.interactions = await SQLite.get("interactions").catch(() => 0) || 0
        this.APIListeners();
        this.on("connection", socket => {
            this.connection(socket);
        })
        return;
    }

    APIListeners() {
        this.api.on("connect", () => "API Socket Client Connected");
        this.api.on("error", err => console.log("API Socket Client Error", err));
        this.api.on("disconnect", () => console.log("API Socket Client Disconnected"));
        this.api.on("message", message => this.newMessageFromApi(message));

        this.api.on("refresh", data => {
            if (data?.guilds?.length)
                for (const guild of data.guilds)
                    this.guilds.set(guild.id, guild)

            if (data?.commands?.length)
                for (const cmd of data.commands)
                    this.commands.set(cmd.name, cmd)

            if (data?.staffs?.length)
                for (const staff of data.staffs)
                    this.staffs.set(staff.id, staff)
        })

    }

    async newMessageFromApi(message) {

        // if (data?.type) {
        //     switch (data?.type) {
        //         case "blacklistRemove": blacklist.delete(data.id); break;
        //         case "blacklistSet": blacklist.set(data.data.id, data.data); break;
        //     }
        // }

        if (message == "addInteraction") {
            this.interactions++
            this.refreshHomeStatus();
            return await SQLite.add("interactions", 1).catch(() => { });
        }
        return
    }

    /**
     * @param { Socket } socket 
     */
    connection(socket) {
        socket.once("connected", () => {
            this.refreshHomeStatus();
        });

        socket.once("disconnect", () => {
            clearInterval(statusPageInterval.get(socket.id));
            statusPageInterval.delete(socket.id)
            this.refreshHomeStatus();
        });

        socket.on("ping", (_, callback) => callback(true));
        socket.on("home", (_, callback) => callback(this.home));
        socket.on("status_page", (_, callback) => {
            callback(GeneralStatus);

            if (statusPageInterval.has(socket.id)) return;
            const interval = setInterval(() => socket.emit("status_page", GeneralStatus), 3000);
            statusPageInterval.set(socket.id, interval);
            return;
        });
    }

    refreshHomeStatus() {
        this.emit("home", this.home);
    }

    get home() {
        const data = {
            guilds: this.guilds.size,
            interactions: this.interactions,
            commands: this.commands.size,
            viewers: this.sockets.sockets.size
        };
        return data;
    }

}