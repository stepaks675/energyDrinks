import { Router } from "express";
import { getRouter } from "./getRouter.js";
import { updateRouter } from "./updateRouter.js";

import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const mainRouter = new Router();

mainRouter.get('/', (req,res)=>res.sendFile(path.join(__dirname, '../../front/index.html'))) //отправка базовой странички

mainRouter.use('/api/catalog', getRouter)

mainRouter.use('/api/update', updateRouter)

export {mainRouter}