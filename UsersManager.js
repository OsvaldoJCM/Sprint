class UsersManager {
    static #users = []
    create(data) {
        const user = {
            id: UsersManager.#users.length === 0 ? 1 : UsersManager.#users[UsersManager.#users.length - 1].id + 1,
            foto: data.foto,
            email: data.email,
            password: data.password,
            role: 0
        }
        UsersManager.#users.push(user);
        console.log("usuario creado");
    }
    read() {
        return UsersManager.#users
    }

}

const usuarios = new UsersManager()
usuarios.create({
    foto: "foto.png",
    email: "osvaldojosuecruz@gmail.com",
    password: "pass123"
})
usuarios.create({
    foto: "foto2.png",
    email: "osvaldo@gmail.com",
    password: "123pass"
})
console.log(usuarios.read());
