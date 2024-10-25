import { Router } from "express"; 
import CartManager from "../controllers/CartManager.js";

const CartRouter = Router();
const carts = new CartManager();

// Ruta para agregar un carrito
CartRouter.post("/", async (req, res) => {
    res.send(await carts.addCarts());
});

// Ruta para obtener todos los carritos
CartRouter.get('/', async (req, res) => {
    res.send(await carts.readCarts());
});

// Ruta para obtener un carrito específico por ID
CartRouter.get('/:id', async (req, res) => {
    res.send(await carts.getCartsById(req.params.id));
}); 

// Ruta para agregar un producto a un carrito específico
CartRouter.post('/:cid/products/:pid', async (req, res) => {
    let cartId = req.params.cid;
    let productId = req.params.pid;
    res.send(await carts.addProductInCart(cartId, productId));
});

export default CartRouter;
