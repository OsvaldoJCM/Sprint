
import crypto from "crypto";
class CartManager {
    static #carts = []
    create(data) {
        try {
            const cart = {
                id: "8e5bcecf694e87f3313ab508",
                user_id: crypto.randomBytes(12).toString("hex"),
                product_id: crypto.randomBytes(12).toString("hex"),
                quantity: data.quantity,
                state: data.state
            }
            if (!data.quantity) {
                throw new Error("Enter cart details");
            } else {
                CartManager.#carts.push(cart);
                console.log("cart created");
            }
        } catch (error) {
            console.log(error);
        }
    }
    read() {
        try {
            if (CartManager.#carts.length === 0) {
                throw new Error("Not found!");
            } else {

                return CartManager.#carts
            }
        } catch (error) {
            console.log(error);
        }
    }

    readOne(id) {
        try {
            const one = CartManager.#carts.find((each) => each.id === id);
            if (!one) {
                throw new Error("Not found!");
            } else {
                return one;
            }
        } catch (error) {
            console.log(error);
        }
    }
    update(id, data) {
        try {
            let one = CartManager.#carts.find((each) => each.id === id);
            if (one) {
                for (let prop in data) {
                    one[prop] = data[prop];
                }
                return one;
            } else {
                const error = new Error("Not found!");
                error.statusCode = 404;
                throw error;
            }
        } catch (error) {
            console.log(error);
        }
    }
    destroy(id) {
        try {
            this.readOne(id);
            const within = CartManager.#carts.filter((each) => each.id !== id);
            CartManager.#carts = within;
            console.log("Removed cart");
        } catch (error) {
            console.log(error);
        }
    }

}

const carrito = new CartManager()
carrito.create({
    quantity: 10,
    state: "reserved",
})


console.log("***** Read *****");
console.log(carrito.read());
console.log("***** Update *****");
console.log(carrito.update("8e5bcecf694e87f3313ab508", {
    quantity: 222
}));
console.log("***** ReadOne *****");
console.log(carrito.readOne("8e5bcecf694e87f3313ab508"));
console.log("***** Destroy *****");
carrito.destroy("8e5bcecf694e87f3313ab508")
console.log("***** Read *****");
console.log(carrito.read());