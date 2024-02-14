
import io from "socket.io-client";

const socket = io("https://react.saphire.one/");
// const socket = io("http://localhost:8080/");
socket.on("connect", () => console.log("[ws] Connected"));
socket.on("error", err => console.log("[ws] Error", err));
socket.on("disconnect", () => console.log("[ws] Disconnected"));

export default socket;