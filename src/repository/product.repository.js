import factory from "../persistence/daos/factory.js";
import ProductResDTO from "../persistence/dtos/product.res.dto.js";
const { prodDao } = factory;

export default class ProductRepository {
    constructor() {
        this.dao = prodDao;
    }

    async getProdById(id) {
        try {
            const prod = await this.dao.getById(id);
            const productResDto = new ProductResDTO(prod)
            return productResDto;
        } catch (error) {
            
        }
    }
}