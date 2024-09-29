import { p5ka } from "./5kaShops.js";
export class Pyaterochka{
    constructor(){
        this.codes = Array.from(p5ka.keys());
        this.nameToImg = new Map(); //без повторений
        this.nameToAll = new Map(); //с повторениями для подробного осмотра
    }


async fetchData(){
    let here = this;
    let goods =[]
    async function f(codes){
    for (let code of codes){
        let data1 = await fetch(`https://5d.5ka.ru/api/catalog/v1/stores/${code}/categories/73C2392/products?mode=delivery&limit=499`);
        let jsona = await data1.json();
        (jsona.products).forEach(val=>{
            let {name , prices: {regular : price}, image_links:{small: img}} = val;
            img = img[0];
            goods.push({name,price, img,shop:code})
        })
    }
    }
    await f(this.codes)
    goods.forEach(obj => {
        if (!here.nameToImg.has(obj.name)){
            here.nameToImg.set(obj.name,obj.img);
        }
        if(here.nameToAll.has(obj.name)){
            here.nameToAll.get(obj.name).push(obj)
        }
        else{
            here.nameToAll.set(obj.name,new Array())
            here.nameToAll.get(obj.name).push(obj)
        }
        })
    }
}
