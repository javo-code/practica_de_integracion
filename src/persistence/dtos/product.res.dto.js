export default class ProductResDTO {
  constructor(product) {
    this.nombre = product.product_name;
    this.precio = product.product_price;
  }
}
export default class ProductReqDTO {
  constructor(product) {
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.stock = product.stock;
  }
}