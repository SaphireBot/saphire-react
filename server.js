import express from "express";
import { createServer } from "http";
import cors from "cors";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { env } from "process";
import cookieParser from "cookie-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const server = createServer(app);

app.disable("x-powered-by");
app.use(cors());
app.use(express.json());
app.use(cookieParser(env.COOKIE_SECRET))

app.use("/", express.static(join(__dirname, 'dist')));
app.get("/login", (_, res) => res.redirect("https://discord.com/api/oauth2/authorize?client_id=912509487984812043&redirect_uri=https%3A%2F%2Freact.saphire.one%2Fredirect&response_type=token&scope=guilds%20email%20identify"))
app.get("/*", (_, res) => res.sendFile(join(__dirname, 'dist', 'index.html')))

server.listen(env.PORT || 8080, (err) => console.log(err || 'Online'));