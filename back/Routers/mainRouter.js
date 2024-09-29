import { Router } from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import { Pyaterochka } from "../5ka/5kaGetDrinks.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = new Router();

let service = new Pyaterochka()
router.get('/', (req,res)=>res.sendFile(path.join(__dirname, '../../front/index.html'))) //отправка базовой странички
router.get('/api/update', (req,res)=>{
    service.fetchData().then(res.status(200).json(Object.fromEntries(service.nameToImg.entries())))
})
export {router as mainRouter}