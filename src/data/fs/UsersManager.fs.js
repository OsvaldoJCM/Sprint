import fs from "fs";
import crypto from "crypto";
class UsersManager {
    constructor() {
        this.path = "./src/data/fs/files/users.json";
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
            if (!data.email) {
                throw new Error("Enter user details");
            } else {
                const user = {
                    id: crypto.randomBytes(12).toString("hex"),
                    foto: data.foto,
                    email: data.email,
                    password: data.password,
                    role: 0
                };
                let all = await fs.promises.readFile(this.path, "utf-8");
                all = JSON.parse(all);
                all.push(user);
                all = JSON.stringify(all, null, 4);
                await fs.promises.writeFile(this.path, all);
                console.log({ created: user.id });
                return user;
            }
        } catch (error) {
            throw error;
        }
    }
    async read(role) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            role && (all = all.filter(each => each.role === role));
            return all;

        } catch (error) {
            throw error;
        }
    }

    async readOne(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let user = all.find((each) => each.id === id);
            return user;

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
            let user = all.find((each) => each.id === id);
            if (!user) {
                throw new Error("Not found!");
            } else {
                let filtered = all.filter((each) => each.id !== id);
                filtered = JSON.stringify(filtered, null, 2);
                await fs.promises.writeFile(this.path, filtered);
                console.log({ deleted: user.id });
                return user;
            }
        } catch (error) {
            throw error;
        }
    }
}

const usersManager = new UsersManager();
export default usersManager;