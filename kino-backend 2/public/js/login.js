const pix = document.getElementsByClassName("pixel");

for (let i = 0; i < pix.length; i++) {
  pix[i].style.animationDelay = Math.ceil(Math.random()*5000)+"ms";
}

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".navmenu");


hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
})

document.querySelectorAll(".navlink").forEach(link => link.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
}))

