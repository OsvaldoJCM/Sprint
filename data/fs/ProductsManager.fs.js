
import fs from "fs";
import crypto from "crypto";
class ProductsManager {
    constructor() {
        this.path = "./data/fs/files/products.json";
        this.init();
    }
    init() {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            const stringData = JSON.stringify([], null, 4);
            fs.writeFileSync(this.path, stringData);
            console.log("Archivo creado");
        } else {
            console.log("El archivo ya existe");
        }
    }
    async create(data) {
        try {
            if (!data.title) {
                throw new Error("Ingrese los datos del producto");
            } else {
                const product = {
                    id: crypto.randomBytes(12).toString("hex"),
                    title: data.title,
                    photo: data.photo,
                    category: data.category,
                    price: data.price,
                    stock: data.stock
                }
                let all = await fs.promises.readFile(this.path, "utf-8");
                all = JSON.parse(all);
                all.push(product);
                all = JSON.stringify(all, null, 2);
                await fs.promises.writeFile(this.path, all);
                console.log({ created: product.id });
                return product;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async read(cat) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            cat && (all = all.filter(each => each.category === cat));
            return all;
        } catch (error) {
            throw error;
        }
    }

    async readOne(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let prod = all.find((each) => each.id === id);
            return prod;
        } catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            let all = await this.read();
            let one = all.find((each) => each.id === id);
            if (one) {
                for (let prop in data) {
                    one[prop] = data[prop];
                }
                all = JSON.stringify(all, null, 2);
                await fs.promises.writeFile(this.path, all);
                return one;
            } else {
                const error = new Error("Not found!");
                error.statusCode = 404;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }

    async destroy(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let prod = all.find((each) => each.id === id);
            if (prod) {
                let filtered = all.filter((each) => each.id !== id);
                filtered = JSON.stringify(filtered, null, 2);
                await fs.promises.writeFile(this.path, filtered);
                return prod;
            } else {
                const error = new Error("not found!");
                error.statusCode = 404;
                throw error;

            }
        } catch (error) {
            console.log(error);
        }
    }
}

const productsManager = new ProductsManager();
export default productsManager;
