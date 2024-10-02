//отсылает актуальный каталог энергосов/инфу по конкретному энергосу
import { Router } from "express";
import { generalService } from "../Service/generalService.js";
import { database } from "../mongodb/dbController.js";

const gService = new generalService();
const getRouter = new Router();

getRouter.get('/product/:id?', (req,res)=>{
    let id = req.params.id;
    console.log(`получен id ${id}`)
    database.GetAllById(id).then(val=>{
        let prods = gService.excludeExtra(val);
        res.status(200).json(prods);
    })
})
getRouter.get('/5ka',(req,res)=>{
        database.GetCatalog("Pyaterochka").then(val => {
            console.log("Получен массив энергосов из пятерочки")
            let filtered = gService.filterUnique(val)
            res.status(200).json(filtered);
        })
     })

export {getRouter}