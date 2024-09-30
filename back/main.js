import express from 'express'
import {mainRouter} from "../back/Routers/mainRouter.js"
import { database } from './mongodb/dbController.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json())

const PORT = 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

database.Start()

app.use(express.static(path.join(__dirname, '../front')));

app.use('/',mainRouter)

app.listen(PORT, ()=>{console.log(`SERVER IS LISTENING ON PORT: ${PORT}`)})