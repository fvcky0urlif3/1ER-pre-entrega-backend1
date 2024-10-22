import express from "express";
import ProductManager from "./controllers/productmanager";

const product = new ProductManager();

const app = express();
const PORT = 4020;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/products", async (req, res) => {
   let newProduct = req.body; 
   res.send(await product.writeProducts(newProduct));
});

app.listen(PORT, () => {
    console.log(`Servidor Express Puerto ${PORT}`);
});