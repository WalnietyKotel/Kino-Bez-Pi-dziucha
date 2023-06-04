const modal = document.querySelector(".modal")
const modal1 = document.querySelector("#modal1")
const modal2 = document.querySelector("#modal2")
const modal3 = document.querySelector("#modal3")
const openIgor = document.querySelector(".openigor")
const openPrzemek = document.querySelector(".openprzemek")
const openWiktor = document.querySelector(".openwiktor")
const closeModal = document.querySelector(".closebutton")
const closeModal1 = document.querySelector(".closebutton1")
const closeModal2 = document.querySelector(".closebutton2")

openIgor.addEventListener('click', () => {
    modal1.showModal();
})

openPrzemek.addEventListener('click', () => {
    modal2.showModal();
})

openWiktor.addEventListener('click', () => {
    modal3.showModal();
})

closeModal.addEventListener('click', () => {
    modal.close();
})

closeModal1.addEventListener('click', () => {
    modal2.close();
})

closeModal2.addEventListener('click', () => {
    modal3.close();
})

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
