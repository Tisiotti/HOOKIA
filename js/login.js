const userInicio = [
    {
        fullname: 'Bruno Tisiotti',
        email: 'admin@admin.com',
        id: '6',
        password: 'admin',
        role: "ROLE_ADMIN"
    },
    {
        fullname: 'Samantha Davis',
        email: 'samantha.davis@example.com',
        id: '7',
        password: 'alfabeta',
        role: "ROLE_CLIENT"
    },
    {
        fullname: 'James Moore',
        email: 'james.moore@example.com',
        id: '8',
        password: 'alfabeta',
        role: "ROLE_CLIENT"
    },
    {
        fullname: 'Isabella Taylor',
        email: 'isabella.taylor@example.com',
        id: '9',
        password: 'alfabeta',
        role: "ROLE_CLIENT"
    },
]

// if( !localStorage.getItem("users")  ) {
if (localStorage.getItem("users") === null) {

    localStorage.setItem("users", JSON.stringify(userInicio))

}

const users = JSON.parse(localStorage.getItem("users"))


const loginForm = document.getElementById("login")

    //1- Capturar el evento submit del formulario
loginForm.addEventListener("submit", (event) => {
    event.preventDefault()

    //2- Capturar los datos del formulario
    const emailInput = event.target.elements.email.value;
    const passwordInput = event.target.elements.password.value;
    
    //3- Validar los datos del formulario (email y password) con los datos de localStorage
    const userExist = users.find(usr => {

        if (usr.email === emailInput) {
            return true
        }

        return false;
    })

    //4- Si los datos son correctos, hacer el login y guardar el usuario en localStorage
    if (!userExist || userExist.password !== passwordInput) {
        Swal.fire("Login incorrecto", "Los datos ingresados son incorrectos", "error");
        return;
    }

    //5- Redireccionar a la página principal 
    if (userExist.role === "ROLE_ADMIN") {
        setTimeout(function () {
            window.location.href = '/pages/admin-products/admin-products.html'
        }, 2000)
        return;
    }

    Swal.fire('Bienvenido', `Que bueno verte de nuevo ${userExist.fullname}`)

    delete userExist.password

    localStorage.setItem("currentUser", JSON.stringify(userExist))

    setTimeout(function () {
        window.location.href = '/index.html'
    }, 1000)
})