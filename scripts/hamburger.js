document.addEventListener("DOMContentLoaded", function () {
    const menu = document.querySelector(".hamburger-menu");
    const overlay = document.querySelector(".overlay");

    document.getElementById("hamburger-menu").addEventListener("click", function () {
        menu.classList.add("active");
        overlay.classList.add("active");
    });

    document.querySelector(".close-menu").addEventListener("click", function () {
        menu.classList.remove("active");
        overlay.classList.remove("active");
    });

    overlay.addEventListener("click", function () {
        menu.classList.remove("active");
        overlay.classList.remove("active");
    });
});