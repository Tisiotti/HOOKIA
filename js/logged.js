const nonLoggedButtons = document.getElementById("nonLoggedButtons");
const loggedContent = document.getElementById("loggedContent");
const userDisplayName = document.getElementById("userDisplayName");

function checkLoginStatus() {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    const adminProducts = document.getElementById("adminProducts");
    const adminUsers = document.getElementById("adminUsers");

    if (currentUser !== null) { 
        nonLoggedButtons.style.display = "none"; 
        loggedContent.style.display = "flex"; 

        if (currentUser.fullname) {
            userDisplayName.textContent = currentUser.fullname;
        }

        if (currentUser.role === "Administrator") {
            adminProducts.style.display = "block";
            adminUsers.style.display = "block";
        } else {
            adminProducts.style.display = "none";
            adminUsers.style.display = "none";
        }
    } else { 
        nonLoggedButtons.style.display = "flex";
        loggedContent.style.display = "none"; 

        adminProducts.style.display = "none";
        adminUsers.style.display = "none";
    }
}

window.onload = function() {
    checkLoginStatus();
}

function logout() {
    localStorage.removeItem("currentUser");
    checkLoginStatus();
    setTimeout(function () {
        window.location.href = "/index.html";
    }, 1500);
}