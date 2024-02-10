import express from "express";
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { env } from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
app.use('/', express.static(join(__dirname, 'dist')))

app.listen(env.PORT || 8080, (err) => {
    console.log(err || 'Online')
})