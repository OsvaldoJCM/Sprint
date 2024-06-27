document.querySelector("#login").addEventListener("click", async () => {
    const data = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value,
    };
    const opts = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    };
    let response = await fetch("/api/sessions/login", opts);
    response = await response.json();

    if (response.statusCode === 200) {

        // localStorage.setItem("token", response.token)
        return Swal.fire({
            title: response.message,
            icon: "success",
            timer: 5000,
            timerProgressBar: true,
            iconColor: "rgb(31, 41, 55)",
            color: "rgb(31, 41, 55)",
            confirmButtonColor: "rgb(31, 41, 55)",
        }).then((result) => {
            if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                location.replace("/");
            }
        });
    } else {
        return Swal.fire({
            title: response.message,
            icon: "error",
            timer: 5000,
            timerProgressBar: true,
            iconColor: "rgb(31, 41, 55)",
            color: "rgb(31, 41, 55)",
            confirmButtonColor: "rgb(31, 41, 55)",
        }).then((result) => {
            if (result.isConfirmed || result.dismiss === Swal.DismissReason.timer) {
                document.getElementById('loginForm').reset();
            }
        });
    }
});