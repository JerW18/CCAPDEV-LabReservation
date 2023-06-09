import { labs, tables, users, reservations } from "./db.js";

// Animation of Forms
$('#registerMessage a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
});

// Guest Log In
$('#guestMessage a').click(function(){
    window.location.assign("../html/temp_guest_reserve.html");;
});

// Login Form
const loginForm = document.getElementById("login");
const loginButton = document.getElementById("login-form-submit");

loginButton.addEventListener("click", (e) => {
    e.preventDefault();

    const username = loginForm.logEmail.value;
    const password = loginForm.logPassword.value;
    let isLogin = false;
    let isAdmin = false;

    for (const user of users) {
        if (user.email === username && user.password === password) {
            isLogin = true;

            loginForm.logEmail.value = "";
            loginForm.logPassword.value = "";
            
            if (user.isAdmin === true) {
                isAdmin = true;
            }
        }
    }

    if (isLogin && !isAdmin) {
        window.location.assign("html/reserve.html");
    } else if (isLogin && isAdmin) {
        window.location.assign("html/temp_admin_reserve.html");
    } else {
        alert("Invalid username or password.");
    }
})

// Register Form
const registerForm = document.getElementById("register");
const registerButton = document.getElementById("register-form-submit");

registerButton.addEventListener("click", (e) => {
    e.preventDefault();

    const username = registerForm.regEmail.value;
    const password = registerForm.regPassword.value;
    const confirmPassword = registerForm.regConfirmPassword.value;
    let isRegister = true;

    if (password !== confirmPassword) {
        alert("Passwords do not match.");
        isRegister = false;
    }

    for (const user of users) {
        if (user.email === username) {
            alert("Username already exists.");
            isRegister = false;
        }
    }

    if (isRegister) {
        users.push({ username: username, password: password, isAdmin: false});
        alert("You have successfully registered.");
    }
})