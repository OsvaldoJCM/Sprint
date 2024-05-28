import productsManager from "../data/mongo/managers/ProductsManager.mongo.js"

// import productsManager from "../data/fs/ProductsManager.fs.js"
export default async (socket) => {
    console.log("connection id " + socket.id)
    socket.emit("products", await productsManager.read())
    socket.on("newProduct", async data => {
        socket.emit("products", await productsManager.read())
        // if (result) {
        //     socket.emit("result", {
        //         statusCode: 201,
        //         message: "Created product!"
        //     })
        // } else {
        //     socket.emit("result", {
        //         statusCode: 401,
        //         message: "Bad Auth!"
        //     })
        // }

    })
}

