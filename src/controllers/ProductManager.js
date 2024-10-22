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

    writeProducts = async (products) => { 
        await fs.writeFile(this.path, JSON.stringify(products));
    };

    exist = async (id) => {
        let products = await this.readProducts();
        return products.find(prod => prod.id === id);
    }

    addProducts = async (product) => {
        let productOld = await this.readProducts();
        product.id = nanoid();
        let productAll = [...productOld, product];
        await this.writeProducts(productAll);
        return "producto agregado";
    };

    getProducts = async () => {
        return await this.readProducts();
    };

    getProductsById = async (id) => {
        let productById = await this.exist(id);
        if (!productById) return "Producto inexistente";
        return productById;
    };

    updateProducts = async (id, product) => {
       let productById = await this.exist(id)
       if (!productById) return "Producto inexistente";
       await this.deleteProducts(id)
       let productOld = await this.readProducts()
       let products = [{...product, id : id}, ...productOld]
       await this.writeProducts(products)
       return "Producto actualizado"
    }

    deleteProducts = async (id) => {
        let products = await this.readProducts(); 
        let existProducts = products.some(prod => prod.id === id);  
        if (existProducts) {
            let filterProducts = products.filter(prod => prod.id != id);  
            await this.writeProducts(filterProducts); // Cambié a 'this.writeProducts(filterProducts)'
            return "Producto Eliminado";
        }
        return "El producto a eliminar no existe";
    };
}

export default ProductManager;