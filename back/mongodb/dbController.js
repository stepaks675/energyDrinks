import dotenv from "dotenv"
import mongoose from "mongoose";

dotenv.config()

class dbController {

  constructor() {
    this.uri = process.env.DB_ACCESS;
  }

  Start() {
    mongoose
      .connect(this.uri)
      .then(() => {
        console.log("база данных РАБОТАЕТ");
        this.drinkSchema = new mongoose.Schema({
            name:{type: String, required:true},
            price:{type: Number, required:true},
            shop:{type: String, required:true},
            shopAdress:{type: String, required:true},
            img:{type:String, required:true}
        })
        this.drinkSchema.index({ name: 1, price: 1, shop: 1, shopAdress: 1 }, { unique: true });
        this.Drink= mongoose.model("Drink",this.drinkSchema)
      })
      .catch((error) => {
        console.error("БАЗА ДАННЫХ НЕ РАБОТАЕТ =( :", error);
      });
  }

  Save(drink){
    let newDrink = new this.Drink(drink)
    newDrink.save().then(()=>{console.log(`успешно сохранен ${drink.name}`)}).catch((err)=>{console.log(`ошибка при попытке сохранить энергосик : ${err}`)})
  }

  async GetCatalog(shopN){ //получаем энергосы по магазину
    try{
      let c = await this.Drink.find({shop: shopN})
      if (!c.length) throw "Для запрашиваемого магазина база данных пуста"
      return c
    }
    catch(err){
      console.log(`ошибка при получении каталога : ${err}`)
    }
  }

  async GetAllById(id){ //получаем все одинаковые энергосы
    try{
      let prod = await this.Drink.findById(id);
      if (!prod) throw "Запрашиваемый товар отсутствует (?)"
      let prods = await this.Drink.find({name : prod.name, shop : prod.shop});
      return prods
    } catch(err){
      console.log(`ошибка при получении товара по id : ${err}`)
    }
  }  
  
  async ClearDB(shop){
    try {
      await this.Drink.deleteMany({shop: shop})
      console.log("база данных очищена");
      return true;
  }
    catch(err){console.log(`ошибка при очистке базы данных ${err}`)}
  }
}

export const database = new dbController();
