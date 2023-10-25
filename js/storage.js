const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(currentUser && currentUser.fullname) {

    const userHeaderNameDiv = document.getElementById("user-header-name");

    userHeaderNameDiv.textContent = currentUser.fullname;

    Swal.fire('Bienvenido', `Que bueno verte de nuevo, ${currentUser.fullname}`);
}