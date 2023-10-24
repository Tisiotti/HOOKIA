// const currentUser = JSON.parse(localStorage.getItem("currentUser"))
//Obtenemos elementos HTML
const headerUserInfo = document.getElementById("user-header-name")
const headerUserAction = document.getElementById("user-action")
const navbarLink = document.querySelector("ul.navbar-nav#nav-list")


// Mostrar el nombre del usuario 
if (currentUser) {
    JSON.parse(localStorage.getItem("currentUser"))
}

if (currentUser) {
    headerUserAction.innerHTML = `<button class="btn btn-danger" onclick="logout()">Logout</button>`
    
    if (currentUser.role === 'ROLE_ADMIN') {

        const adminProductLink = document.createElement('li')
        adminProductLink.classList.add('nav-item')
        adminProductLink.id = 'nav-admin-product'
        
        const url = window.location.pathname;
        if (url.includes('admin.html')) {

            adminProductLink.classList.add('active')
        }
    }
} else {
    headerUserAction.innerHTML = `<a class="btn btn-dark" href="/pages/login/login.html">Login</a>`
}

function logout() {
    localStorage.clear()
    setTimeout(function () {
        window.location.href = "/index.html"
    }, 500)
}