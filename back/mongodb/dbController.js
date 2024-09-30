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
    newDrink.save().then(()=>{console.log(`успешно сохранен ${drink.name}`)}).catch(()=>{console.log("дубликат или другая ошибка(")})
  }
  
}

export const database = new dbController();
