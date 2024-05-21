import { Schema, model } from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2";

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

schema.plugin(mongoosePaginate);
const Product = model(collection, schema);
export default Product;