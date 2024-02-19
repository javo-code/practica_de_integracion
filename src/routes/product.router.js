import { Router } from "express";
import ProdController from "../controllers/product.controllers.js";

const router = Router();
const controller = new ProdController();

router
    .get("/", controller.getAll)
    .get("/:id", controller.getById)
    .post("/", controller.create)
    .put("/:id", controller.update)
    .delete("/:id", controller.delete)
    .get("/dto/:id", controller.getProdById)


export default router;
