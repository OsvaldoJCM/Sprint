const fs = require("fs");
const crypto = require("crypto");

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
    async read() {
        try {
            let all = await fs.promises.readFile(this.path, "utf-8");
            all = JSON.parse(all);
            if (all.length === 0) {
                throw new Error("No hay usuarios");
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
            let user = all.find((each) => each.id === id);
            if (!user) {
                throw new Error("Usuario no encontrado");
            } else {
                console.log(user);
                return user;
            }
        } catch (error) {
            console.log(error);
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
async function test() {
    try {
        const usuarios = new UsersManager();
        await usuarios.create({
            foto: "foto.png",
            email: "email1@gmail.com",
            password: "pass1"
        })
        await usuarios.create({
            foto: "foto2.png",
            email: "email2@gmail.com",
            password: "12pass"
        })
        await usuarios.create({
            foto: "foto3.png",
            email: "email3@gmail.com",
            password: "123pass"
        })
        await usuarios.create({
            foto: "foto4.png",
            email: "email3@gmail.com",
            password: "1234pass"
        })
        await usuarios.create({
            foto: "foto5.png",
            email: "email5@gmail.com",
            password: "12345pass"
        })

        console.log("***** Read *****");
        const allUsers = await usuarios.read();
        console.log("***** ReadOne *****");
        await usuarios.readOne(allUsers[0].id);
        await usuarios.readOne(allUsers[1].id);

        console.log("***** Create adicional*****");
        const adicional = await usuarios.create({
            foto: "fotoAdicional.png",
            email: "adicional@gmail.com",
            password: "adicional123"
        });
        console.log("***** ReadOne adicional*****");
        await usuarios.readOne(adicional.id);
        console.log("***** Destroy adicional*****");
        await usuarios.destroy(adicional.id);
    } catch (error) {
        console.log(error);
    }
}
test();