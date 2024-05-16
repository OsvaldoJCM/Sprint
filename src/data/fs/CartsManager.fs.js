import fs from "fs";
import crypto from "crypto";
class CartsManager {
    constructor() {
        this.path = "./src/data/fs/files/carts.json";
        this.init();
    }
    init() {
        const exists = fs.existsSync(this.path);
        if (!exists) {
            const stringData = JSON.stringify([], null, 4);
            fs.writeFileSync(this.path, stringData);

        }
    }
    async create(data) {
        try {
            if (!data.quantity) {
                throw new Error("Enter cart details! ");
            } else {
                const cart = {
                    id: crypto.randomBytes(12).toString("hex"),
                    user_id: crypto.randomBytes(12).toString("hex"),
                    product_id: crypto.randomBytes(12).toString("hex"),
                    quantity: data.quantity,
                    state: data.state
                }
                let all = await fs.promises.readFile(this.path, "utf-8");
                all = JSON.parse(all);
                all.push(cart);
                all = JSON.stringify(all, null, 2);
                await fs.promises.writeFile(this.path, all);
                console.log({ created: cart.id });
                return cart;
            }
        } catch (error) {
            throw error;
        }
    }
    async read(state) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            state && (all = all.filter(each => each.state === state));
            return all;
        } catch (error) {
            throw error;
        }
    }

    async readOne(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let cart = all.find((each) => each.id === id);
            return cart;
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
            let cart = all.find((each) => each.id === id);
            if (cart) {
                let filtered = all.filter((each) => each.id !== id);
                filtered = JSON.stringify(filtered, null, 2);
                await fs.promises.writeFile(this.path, filtered);
                return cart;
            } else {
                const error = new Error("not found!");
                error.statusCode = 404;
                throw error;
            }
        } catch (error) {
            throw error;
        }
    }
}

const cartsManager = new CartsManager();

await cartsManager.create({
    quantity: 10,
    state: "Reserved"
});
console.log("Lista de carts:");
console.log(await cartsManager.read());

console.log("Update carts:");
console.log(await cartsManager.update("56deed42e7c6b08196b3af92", {
    state: "delivered"
}));
console.log("***** ReadOne *****");
console.log(await cartsManager.readOne("56deed42e7c6b08196b3af92"));

// console.log("Eliminar:");
// console.log(await cartsManager.destroy("1770f95b0d35a325734545cc"));

// export default cartsManager;