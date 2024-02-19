// cart.router.js
import { Router } from "express";
import CartController from "../controllers/cart.controllers.js";
import * as ticketController from '../controllers/ticket.controller.js';
import { verifyToken } from '../middlewares/verifyToken.js';

const router = Router();
const controller = new CartController();

router.get("/", controller.getAll)
    .get("/:id", controller.getById)
    .post("/", controller.create)
    .put("/:id", controller.update)
    .delete("/:id", controller.delete)
    .post("/:idCart/products/:idProd", controller.addProdToCart)
    .delete("/:idCart/products/:idProd", controller.removeProdToCart)
    .put("/:idCart/products/:idProd", controller.updateProdQuantityToCart)
    .delete("/:id", controller.clearCart)
    .post('/:cartId/purchase', verifyToken, ticketController.generateTicket)

export default router;
