class ProductManager {
    static #products = []
    create(data) {
        try {
            const product = {
                id: ProductManager.#products.length === 0
                    ? 1
                    : ProductManager.#products[ProductManager.#products.length - 1].id + 1,
                title: data.title,
                photo: data.photo,
                category: data.category,
                price: data.price,
                stock: data.stock
            }
            if (!data.title) {
                throw new Error("Ingrese los datos del producto");
            } else {
                ProductManager.#products.push(product);
                console.log("Producto creado");
            }
        } catch (error) {
            console.log(error);
        }
    }
    read() {
        try {
            if (ProductManager.#products.length === 0) {
                throw new Error("No hay productos");
            } else {

                return ProductManager.#products
            }
        } catch (error) {
            console.log(error);
        }
    }

    readOne(id) {
        try {
            const one = ProductManager.#products.find((each) => each.id === id);
            if (!one) {
                throw new Error("No existe el producto");
            } else {
                return one;
            }
        } catch (error) {
            console.log(error);
        }
    }
    destroy(id) {
        try {
            this.readOne(id);
            const within = ProductManager.#products.filter((each) => each.id !== id);
            ProductManager.#products = within;
            console.log("producto eliminado");
        } catch (error) {
            console.log(error);
        }
    }

}

const productos = new ProductManager()
productos.create({
    title: "Zapatilla",
    photo: "zapatilla.png",
    category: "calzado",
    price: 35000,
    stock: 100
})
productos.create({
    title: "Poleron",
    photo: "poleron.png",
    category: "ropa",
    price: 15000,
    stock: 80
})
productos.create({
    title: "Lentes",
    photo: "lentes.png",
    category: "accesorios",
    price: 5000,
    stock: 20
})
productos.create({
    title: "Botin",
    photo: "botin.png",
    category: "calzado",
    price: 40000,
    stock: 50
})
productos.create({
    title: "Camisa",
    photo: "camisa.png",
    category: "ropa",
    price: 8000,
    stock: 30
})

console.log("***** Read *****");
console.log(productos.read());
console.log("***** ReadOne *****");
console.log(productos.readOne(2));
console.log(productos.readOne(4));
console.log("***** Destroy *****");
productos.destroy(2)
productos.destroy(5)
console.log("***** Read *****");
console.log(productos.read());