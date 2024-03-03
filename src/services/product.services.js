import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
const { prodDao } = factory;
import ProductRepository from "../persistence/repository/product.repository.js";
import { createRandomProd } from "../mocks.js";
import { ProductModel } from "../persistence/daos/mongoDB/products/product.model.js";
const productRepository = new ProductRepository();

export default class ProductService extends Services {
  constructor() {
    super(prodDao);
  }
  async getProdById(id) {
    try {
      const prod = await productRepository.getProdById(id);
      if (!prod) return false;
      else return prod;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  async createProductsMock(cant = 100){
    try {
      const productsArray = [];
      for (let i = 0; i < cant; i++) {
        const randomProd = createRandomProd();
        productsArray.push(randomProd)
      }
      const randomProducts = await ProductModel.create(productsArray);
      return randomProducts
    } catch (error) {
        throw new Error(error.message);
    }
  };
}
