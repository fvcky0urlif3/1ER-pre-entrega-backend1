import express from "express";
import ProductRouter from "./Router/product.routes.js";


const app = express();
const PORT = 4020;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/products", ProductRouter)


app.listen(PORT, () => {
    console.log(`Servidor Express Puerto ${PORT}`);
});