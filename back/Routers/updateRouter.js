//будет обновлять базу данных по запросу клиента
import { Router } from "express";
import { database } from "../mongodb/dbController.js";
import { Service5 } from "../Service/5kaService.js";
import { ServiceM } from "../Service/magnetService.js";
const service5 = new Service5();
const serviceM = new ServiceM();
const updateRouter = new Router();

updateRouter.get("/5ka", async (req, res) => {
  try {
    await service5.actualizeData().then((val) => {
      database.ClearDB("Pyaterochka").then(() => {
        val.forEach(async function (element) {
          database.Save(element);
        });
      });
    });
    res.status(200).send("База данных успешно обновилась");
  } catch (err) {
    res.status(500).send(`обновление базы данных сдохло ошибка: ${err}`);
  }
});

updateRouter.get("/magnet", async(req,res) => {
    try {
        await serviceM.actualizeData().then((val) => {
          database.ClearDB("Magnit").then(() => {
            val.forEach(async function (element) {
              database.Save(element);
            });
          });
        });
        res.status(200).send("База данных успешно обновилась");
      } catch (err) {
        res.status(500).send(`обновление базы данных сдохло ошибка: ${err}`);
      }
});

export { updateRouter };
