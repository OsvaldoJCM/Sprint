import { Schema, model } from "mongoose"

const collection = "products"
const schema = new Schema({
    title: { type: String, required: true, index: true },
    photo: { type: String, default: "assets/prueba.png" },
    category: { type: String, default: "De todo" },
    price: { type: Number, default: 1 },
    stock: { type: Number, default: 1 }
}, {
    timestamps: true
})

const Product = model(collection, schema);
export default Product;