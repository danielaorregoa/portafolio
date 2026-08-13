// =========================================================
// MENÚ RESPONSIVE
// =========================================================

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");


menuButton.addEventListener("click", () => {

    navMenu.classList.toggle("active");

});


// =========================================================
// CERRAR MENÚ AL SELECCIONAR UNA SECCIÓN
// =========================================================

const navLinks = document.querySelectorAll(".nav-menu a");


navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

    });

});


// =========================================================
// AÑO AUTOMÁTICO DEL FOOTER
// =========================================================

const year = document.getElementById("year");

year.textContent = new Date().getFullYear();


// =========================================================
// ANIMACIONES AL HACER SCROLL
// =========================================================

const animatedElements = document.querySelectorAll(
    ".trait, .skill-card, .certificate-card, .experience-card"
);


const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                observer.unobserve(entry.target);

            }

        });

    },
    {
        threshold: 0.12
    }
);


animatedElements.forEach((element) => {

    element.classList.add("animate");

    observer.observe(element);

});


// =========================================================
// EFECTO SUAVE PARA EL HERO
// =========================================================

const heroVisual = document.querySelector(".hero-visual");


window.addEventListener("mousemove", (event) => {

    if (!heroVisual) return;

    const x = (window.innerWidth / 2 - event.clientX) / 80;
    const y = (window.innerHeight / 2 - event.clientY) / 80;

    heroVisual.style.transform =
        `translate(${x}px, ${y}px)`;

});