let adresses5 = new Map();
adresses5
.set("370V","Нижний Новгород, Должанская, 6Б")
.set("J088","Нижний Новгород, Мещерский б-р,  5")
.set("L522","Нижний Новгород, Сергея Акимова, 43")
.set("33DY","Нижний Новгород, Должанская, 1А")

export class Service5 {
    constructor() {
      this.codes = Array.from(adresses5.keys());
      this.nameToImg = new Map(); //без повторений
      this.nameToAll = new Map(); //с повторениями для подробного осмотра
    }
  
    async actualizeData() {
      const shop = "Pyaterochka"
      let here = this;
      let goods = [];
      async function f(codes) {
        for (let code of codes) {
          let data1 = await fetch(
            `https://5d.5ka.ru/api/catalog/v1/stores/${code}/categories/73C2392/products?mode=delivery&limit=499`
          );
          let jsona = await data1.json();
          jsona.products.forEach((val) => {
            let {
              name,
              prices: { regular: price },
              image_links: { small: img },
            } = val;
            img = img[0];
            let shopAdress = adresses5.get(code);
            goods.push({ name, price, img, shop, shopAdress });
          });

          let s = await new Promise((resolve) => {
            //чтоб не банил сервер
            setTimeout(() => {
              resolve(code);
            }, 2000);
          });
          console.log(`success 5ka code ${s}`);
        }
      }
      try {
        await f(here.codes);
        return goods;
      } 
      catch (err) {
        console.log(err);
      }
    }
  }

 /* goods.forEach((obj) => {
    if (!here.nameToImg.has(obj.name)) {
      here.nameToImg.set(obj.name, obj.img);
    }
    if (here.nameToAll.has(obj.name)) {
      here.nameToAll.get(obj.name).push(obj);
    } else {
      here.nameToAll.set(obj.name, new Array());
      here.nameToAll.get(obj.name).push(obj);
    }
  }); */