import Services from "./class.services.js";
import factory from "../persistence/daos/factory.js";
const { prodDao } = factory;
import ProductRepository from "../repository/product.repository.js";
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
  }
}