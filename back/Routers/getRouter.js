//отсылает актуальный каталог энергосов/инфу по конкретному энергосу
import { Router } from "express";
import { generalService } from "../Service/generalService.js";
import { database } from "../mongodb/dbController.js";

const gService = new generalService();
const getRouter = new Router();

getRouter.get('/5ka/:product?',(req,res)=>{
    const product = req.params.product;
    if (product) {
        res.send(`Информация о продукте: ${product}`);
    } else {
        database.GetCatalog("Pyaterochka").then(val => {
            console.log("Получен массив энергосов из пятерочки")
            let filtered = gService.filterUnique(val)
            res.status(200).json(filtered);
        })
    }
})

export {getRouter}