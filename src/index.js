import express from "express";
import ProductRouter from "./Router/product.routes.js";
import CartRouter from "./Router/carts.routes.js"

const app = express();
const PORT = 4020;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", ProductRouter)
app.use("/api/cart", CartRouter)

app.listen(PORT, () => {
    console.log(`Servidor Express Puerto ${PORT}`);
});