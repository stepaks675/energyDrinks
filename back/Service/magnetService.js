
let addressesMagnet = new Map()
addressesMagnet
.set("524653","56.345, 43.928435")
.set("524805", "56.342012, 43.946374")
.set("520142","56.339003, 43.929495")
.set("520208","56.332975, 43.941308")
.set("520086","56.329217, 43.960801")
.set("522941","56.327086, 43.935783")
.set("522922","56.33042, 43.920763")
.set("524695","56.323558, 43.932064")
.set("523386","56.321276, 43.931121")
.set("522872","56.323677, 43.919074")
.set("522916","56.326712, 43.915275")
.set("524607","56.327056, 43.910513")
.set("103328","56.309234, 43.945144")
.set("524908","56.324471, 43.98449")
export class ServiceM{

    constructor() {
        this.codes = Array.from(addressesMagnet.keys());
    }

    async actualizeData(){
        const shop ="Magnit"
        let goods = [];

        function formReq(offset, storecode){
            return {
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify({
                    "sort":{"order":"desc","type":"popularity"},
                    "pagination":{"limit":50,"offset":offset},
                    "categories":[4883],
                    "includeAdultGoods":true,
                    "storeCode": storecode ,
                    "storeType":"1","catalogType":"1"
                })
            }
        }

        async function f(codes){
            for (let code of codes){
                let response = await fetch("https://magnit.ru/webgate/v2/goods/search" , formReq(0, code))
                let jsona = await response.json();
                jsona.items.forEach(item => {
                    let {name, price} = item;
                    price/=100;
                    let shopAdress = addressesMagnet.get(code);
                    let img = item?.gallery[0]?.url;
                    if (!img) img = "https://smart.mag-river.ru/uploads/goods/img/445-360/fit/no-image.png"
                    goods.push({name,price,shopAdress,shop,img});
                })
                if (jsona.pagination.hasMore){
                    let response = await fetch("https://magnit.ru/webgate/v2/goods/search" , formReq(50, code))
                let jsona = await response.json();
                jsona.items.forEach(item => {
                    let {name, price} = item;
                    price/=100;
                    let shopAdress = addressesMagnet.get(code);
                    let img = item?.gallery[0]?.url;
                    if (!img) img = "https://smart.mag-river.ru/uploads/goods/img/445-360/fit/no-image.png"
                    goods.push({name,price,shopAdress,shop,img});
                })
                }
            }     
        }
        try{
            await f(this.codes);
            return goods
        }
        catch(err){
            console.log(err)
            throw err;
        }
    }
}
