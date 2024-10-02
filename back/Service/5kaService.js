let adresses5 = new Map();
adresses5
.set("370V","56.329327, 43.956354")
.set("J088","56.336453, 43.938730")
.set("L522","56.346337, 43.925183")
.set("33DY","56.331493, 43.961044")

export class Service5 {
    constructor() {
      this.codes = Array.from(adresses5.keys());
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
            if (val.prices.discount) price = val.prices.discount;
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