import fs from "fs";
import crypto from "crypto";
class UsersManager {
    constructor() {
        this.path = "./data/fs/files/users.json";
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
            if (!data.email) {
                throw new Error("Ingrese los datos del usuario");
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
            console.log(error);
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

    async destroy(id) {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            let user = all.find((each) => each.id === id);
            if (!user) {
                throw new Error("Usuario no encontrado");
            } else {
                let filtered = all.filter((each) => each.id !== id);
                filtered = JSON.stringify(filtered, null, 2);
                await fs.promises.writeFile(this.path, filtered);
                console.log({ deleted: user.id });
                return user;
            }
        } catch (error) {
            console.log(error);
        }
    }
}

const usersManager = new UsersManager();
export default usersManager;