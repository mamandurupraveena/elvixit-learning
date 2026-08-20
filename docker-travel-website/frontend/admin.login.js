const form = document.getElementById("adminLoginForm");
const message = document.getElementById("loginMessage");

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const username =
        document.getElementById("username").value;

    const password =
        document.getElementById("password").value;


    // Demo admin credentials
    if (
        username === "admin" &&
        password === "admin123"
    ) {

        sessionStorage.setItem(
            "travelgoAdmin",
            "true"
        );

        window.location.href =
            "admin.html";

    } else {

        message.textContent =
            "❌ Invalid username or password.";

        message.style.color = "red";

    }

});