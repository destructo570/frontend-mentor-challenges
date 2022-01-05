const navIcon = document.querySelector(".nav__icon");
const navLinks = document.querySelector(".nav__links");

navIcon.addEventListener("click", () => {
  navLinks.classList.toggle("visibility");
});
