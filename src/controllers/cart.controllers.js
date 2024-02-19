import Controllers from "./class.controller.js";
import CartService from "../services/cart.services.js";
const cartService = new CartService();

export default class CartController extends Controllers {
  constructor() {
    super(new CartService());
  }

  async addProdToCart (req, res, next){
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const newProdToUserCart = await cartService.addProdToCart(
        idCart,
        idProd,
      );
      if (!newProdToUserCart) res.json({ msg: "Error add product to cart" });
      else res.json(newProdToUserCart);
    } catch (error) {
      console.log("👹Error desde el addProd del carts.controller:",error); // Agrega un registro de depuración
      next(error.message);
    }
  };

  async removeProdToCart (req, res, next){
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const delProdToUserCart = await cartService.removeProdToCart(
        idCart,
        idProd,
      );
      if (!delProdToUserCart) res.json({ msg: "Error remove product to cart" });
      else res.json({msg: `product ${idProd} deleted to cart`});
    } catch (error) {
      next(error.message);
    }
  };

  async updateProdQuantityToCart (req, res, next){
    try {
      const { idCart } = req.params;
      const { idProd } = req.params;
      const { quantity } = req.body;
      const  updateProdQuantity = await this.service.updateProdQuantityToCart(
        idCart,
        idProd,
        quantity
      );
      if (!updateProdQuantity) res.json({ msg: "Error update product quantity to cart" });
      else res.json(updateProdQuantity);
    } catch (error) {
      next(error.message);
    }
  };

  async clearCart (req, res, next){
    try {
      const { idCart } = req.params;
      const clearCart = await this.service.clearCart(
        idCart,
      );
      if (!clearCart) res.json({ msg: "Error clear cart" });
      else res.json(clearCart);
    } catch (error) {
      next(error.message);
    }
  };
}
