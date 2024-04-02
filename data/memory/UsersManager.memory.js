class UsersManager {
    static #users = []
    create(data) {
        try {
            const user = {
                id: UsersManager.#users.length === 0 ? 1 : UsersManager.#users[UsersManager.#users.length - 1].id + 1,
                foto: data.foto,
                email: data.email,
                password: data.password,
                role: 0
            };
            if (!data.email) {
                throw new Error("Ingrese los datos del usuario");
            } else {
                UsersManager.#users.push(user);
                console.log("usuario creado");
            }
        } catch (error) {
            console.log(error);
        }
    }

    read() {
        try {
            if (UsersManager.#users.length === 0) {
                throw new Error("No hay usuarios");
            } else {
                return UsersManager.#users
            }
        } catch (error) {
            console.log(error);
        }
    }

    readOne(id) {
        try {
            const one = UsersManager.#users.find((each) => each.id === id);
            if (!one) {
                throw new Error("No existe el usuario");
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
            const within = UsersManager.#users.filter((each) => each.id !== id);
            UsersManager.#users = within;
            console.log("Usuario eliminado");
        } catch (error) {
            console.log(error);
        }
    }

}

const usuarios = new UsersManager();

console.log("***** Create *****");
usuarios.create({
    foto: "foto.png",
    email: "email1@gmail.com",
    password: "pass1"
})
usuarios.create({
    foto: "foto2.png",
    email: "email2@gmail.com",
    password: "12pass"
})
usuarios.create({
    foto: "foto3.png",
    email: "email3@gmail.com",
    password: "123pass"
})
usuarios.create({
    foto: "foto4.png",
    email: "email3@gmail.com",
    password: "1234pass"
})
usuarios.create({
    foto: "foto5.png",
    email: "email5@gmail.com",
    password: "12345pass"
})

console.log("***** Read *****");
console.log(usuarios.read());
console.log("***** ReadOne *****");
console.log(usuarios.readOne(2));
console.log(usuarios.readOne(4));
console.log("***** Destroy *****");
usuarios.destroy(2)
usuarios.destroy(5)
console.log("***** Read *****");
console.log(usuarios.read());