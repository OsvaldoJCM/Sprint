class ProductManager {
    static #products = []
    create(data) {
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
        ProductManager.#products.push(product);
        console.log("producto creado");
    }
    read() {
        return ProductManager.#products
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

console.log(productos.read());