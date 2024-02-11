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
app.get("/*", (_, res) => res.sendFile(join(__dirname, 'dist', 'index.html')))

server.listen(env.PORT || 8080, (err) => console.log(err || 'Online'));