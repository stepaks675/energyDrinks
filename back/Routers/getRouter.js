//отсылает актуальный каталог энергосов/инфу по конкретному энергосу
import { Router } from "express";

const getRouter = new Router();

getRouter.get('/5ka/:product?',(req,res)=>{
    const product = req.params.product;
    if (product) {
        res.send(`Информация о продукте: ${product}`);
    } else {
        res.send('Просто каталог из пятерочки');
    }
})

export {getRouter}