window.addEventListener("DOMContentLoaded", function () {
  let menu = document.getElementById("menu");
  menu.addEventListener("click", function () {
    menu.classList.toggle("navopen");
    document.querySelector(".nav-ul").classList.toggle("navshow");
  });
});
