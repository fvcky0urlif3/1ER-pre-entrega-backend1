import { promises as fs } from 'fs';
import { nanoid } from 'nanoid';
import ProductManager from './ProductManager.js';

const productALL = new ProductManager   

class CartManager {
    constructor() {
    this.path = "./src/models/carts.json";
    };

    readCarts = async () => {
        let carts = await fs.readFile(this.path, "utf-8");
        return JSON.parse(carts);
    };

    writeCarts = async (carts) => { 
        await fs.writeFile(this.path, JSON.stringify(carts));
    };

    exist = async (id) => {
        let carts = await this.readCarts();
        return carts.find(cart => cart.id === id);
    }


    addCarts = async () => {
        let cartsOld = await this.readCarts();
        let id = nanoid()
        let cartsConcat = [{id :id, products : [] }, ...cartsOld]
        await this.writeCarts(cartsConcat)
        return "Carrito Agregado"
    };

    getCartsById = async (id) => {
        let cartById = await this.exist(id);
        if (!cartById) return "Carrito inexistente";
        return cartById;
    };

    addProductInCart = async (cartId, productId) => {
        let cartById = await this.exist(cartId);
        if (!cartById) return "Carrito inexistente";
        let productById = await productALL.exist(productId);
        if (!productById) return "Producto inexistente";
    
        let cartsALL = await this.readCarts();
        let cartFilter = cartsALL.filter(cart => cart.id != cartId);
    
        if (cartById.products.some(prod => prod.id === productId)) {
            let productInCart = cartById.products.find(prod => prod.id === productId);
            productInCart.cantidad++;
            let cartsConcat = [{ ...cartById }, ...cartFilter]; // Se mantiene el carrito actualizado
            await this.writeCarts(cartsConcat);
            return "Producto sumado exitosamente";
        }
    
        cartById.products.push({ id: productById.id, cantidad: 1 });
        let cartsConcat = [{ ...cartById }, ...cartFilter];
        await this.writeCarts(cartsConcat);
        return "Producto agregado exitosamente";
    };

}

export default CartManager