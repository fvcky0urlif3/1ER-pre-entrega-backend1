import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';

class ProductManager {
    constructor() {
        this.path = "./src/models/products.json";
    };

    readProducts = async () => {
        let products = await fs.readFile(this.path, "utf-8");
        return JSON.parse(products);
    };

    writeProducts = async (product) => {
        await fs.writeFile(this.path, JSON.stringify(product));
    };

    addProducts = async (product) => {
        let productOld = await this.readProducts();
        product.id = nanoid()
        let productAll = [...productOld, product];
     await this.writeProducts(productAll);
        return "producto agregado";
    };

    getProducts = async () => {
        return await this.readProducts();
    };
    getProductsById = async (id) => {
        let product = await this.readProducts();
        let productById = product.find(prod => prod.id === id)
        return productById
    };

}

export default ProductManager;