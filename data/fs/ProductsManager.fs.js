const fs = require("fs");
const crypto = require("crypto");

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
    async read() {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            if (all.length === 0) {
                throw new Error("No hay productos");
            } else {
                console.log(all);
                return all;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async readOne(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let prod = all.find((each) => each.id === id);
            if (!prod) {
                throw new Error("Producto no encontrado");
            } else {
                console.log(prod);
                return prod;
            }
        } catch (error) {
            console.log(error);
        }
    }

    async destroy(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let prod = all.find((each) => each.id === id);
            if (!prod) {
                throw new Error("Producto no encontrado");
            } else {
                let filtered = all.filter((each) => each.id !== id);
                filtered = JSON.stringify(filtered, null, 2);
                await fs.promises.writeFile(this.path, filtered);
                console.log({ deleted: prod.id });
                return prod;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

async function test() {
    try {
        const productos = new ProductsManager();
        await productos.create({
            title: "Zapatilla",
            photo: "zapatilla.png",
            category: "calzado",
            price: 35000,
            stock: 100
        })
        await productos.create({
            title: "Poleron",
            photo: "poleron.png",
            category: "ropa",
            price: 15000,
            stock: 80
        })
        await productos.create({
            title: "Lentes",
            photo: "lentes.png",
            category: "accesorios",
            price: 5000,
            stock: 20
        })
        await productos.create({
            title: "Botin",
            photo: "botin.png",
            category: "calzado",
            price: 40000,
            stock: 50
        })
        await productos.create({
            title: "Camisa",
            photo: "camisa.png",
            category: "ropa",
            price: 8000,
            stock: 30
        })

        console.log("***** Read *****");
        const allProducts = await productos.read();
        console.log("***** ReadOne *****");
        await productos.readOne(allProducts[0].id);
        await productos.readOne(allProducts[1].id);

        console.log("***** Create adicional*****");
        const adicional = await productos.create({
            title: "Mochila para computador",
            photo: "mochila.png",
            category: "tecnologia",
            price: 500000,
            stock: 10
        });
        console.log("***** ReadOne adicional*****");
        await productos.readOne(adicional.id);
        console.log("***** Destroy adicional*****");
        await productos.destroy(adicional.id);
    } catch (error) {
        console.log(error);
    }
}
test();