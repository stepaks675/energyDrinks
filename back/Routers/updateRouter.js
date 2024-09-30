//будет обновлять базу данных по запросу клиента
import { Router } from "express";
import { database } from "../mongodb/dbController.js";
import { Service5 } from "../Service/5kaService.js";
const service5 = new Service5();
const updateRouter = new Router();

updateRouter.get('/5ka', async (req,res)=>{
    await service5.actualizeData().then(val=>{val.forEach(element => {
        database.Save(element);
    })})
    res.send("База данных успешно (или не очень) обновилась");
})

export {updateRouter}