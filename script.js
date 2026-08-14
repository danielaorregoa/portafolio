/* =========================================================
   ACTIVAR JAVASCRIPT
========================================================= */

document.body.classList.add("js-ready");



/* =========================================================
   ELEMENTOS PRINCIPALES
========================================================= */

const header =
    document.querySelector(".site-header");

const navToggle =
    document.querySelector(".nav-toggle");

const navMenu =
    document.querySelector(".nav-menu");

const navLinks =
    [...document.querySelectorAll(".nav-link")];

const year =
    document.querySelector("#year");



/* =========================================================
   AÑO AUTOMÁTICO
========================================================= */

if (year) {

    year.textContent =
        new Date().getFullYear();

}



/* =========================================================
   HEADER AL HACER SCROLL
========================================================= */

function setHeaderState() {

    if (!header) return;

    if (window.scrollY > 20) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }

}


setHeaderState();


window.addEventListener(
    "scroll",
    setHeaderState,
    {
        passive: true
    }
);



/* =========================================================
   MENÚ RESPONSIVE
========================================================= */

if (navToggle && navMenu) {

    navToggle.addEventListener(
        "click",
        () => {

            const isOpen =
                navMenu.classList.toggle("open");

            navToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );

}



/* =========================================================
   CERRAR MENÚ Y ACTIVAR PESTAÑA
========================================================= */

navLinks.forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                if (navMenu) {

                    navMenu.classList.remove(
                        "open"
                    );

                }


                if (navToggle) {

                    navToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }


                navLinks.forEach(
                    (item) => {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                link.classList.add(
                    "active"
                );

            }
        );

    }
);



/* =========================================================
   SECCIONES
========================================================= */

const sections =
    navLinks
        .map(
            (link) => {

                const id =
                    link.getAttribute("href");

                const section =
                    document.querySelector(id);

                return {
                    link,
                    section
                };

            }
        )
        .filter(
            (item) =>
                item.section !== null
        );



/* =========================================================
   ACTUALIZAR PESTAÑA ACTIVA
========================================================= */

function updateActiveSection() {

    if (!sections.length) return;


    const scrollPosition =
        window.scrollY + 180;


    let currentSection =
        sections[0];


    sections.forEach(
        (item) => {

            const sectionTop =
                item.section.offsetTop;


            if (
                scrollPosition >= sectionTop
            ) {

                currentSection =
                    item;

            }

        }
    );


    navLinks.forEach(
        (link) => {

            link.classList.remove(
                "active"
            );

        }
    );


    if (currentSection) {

        currentSection.link.classList.add(
            "active"
        );

    }

}



/* =========================================================
   AL CARGAR
========================================================= */

updateActiveSection();



/* =========================================================
   AL HACER SCROLL
========================================================= */

let scrollTimeout = null;


window.addEventListener(
    "scroll",
    () => {

        if (scrollTimeout) {

            cancelAnimationFrame(
                scrollTimeout
            );

        }


        scrollTimeout =
            requestAnimationFrame(
                () => {

                    updateActiveSection();

                }
            );

    },
    {
        passive: true
    }
);



/* =========================================================
   ANIMACIONES AL HACER SCROLL
========================================================= */

const revealElements =
    document.querySelectorAll(
        ".reveal"
    );


if (
    "IntersectionObserver"
    in window
) {

    const revealObserver =
        new IntersectionObserver(
            (
                entries,
                observer
            ) => {

                entries.forEach(
                    (entry) => {

                        if (
                            !entry.isIntersecting
                        ) {

                            return;

                        }


                        entry.target.classList.add(
                            "visible"
                        );


                        observer.unobserve(
                            entry.target
                        );

                    }
                );

            },
            {
                threshold:
                    0.08
            }
        );


    revealElements.forEach(
        (element) => {

            revealObserver.observe(
                element
            );

        }
    );

} else {

    revealElements.forEach(
        (element) => {

            element.classList.add(
                "visible"
            );

        }
    );

}



/* =========================================================
   FORMULARIO DE CONTACTO
========================================================= */

const contactForm =
    document.querySelector(
        "#contactForm"
    );


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const name =
                document
                    .querySelector(
                        "#contactName"
                    )
                    .value
                    .trim();


            const email =
                document
                    .querySelector(
                        "#contactEmail"
                    )
                    .value
                    .trim();


            const subject =
                document
                    .querySelector(
                        "#contactSubject"
                    )
                    .value
                    .trim();


            const message =
                document
                    .querySelector(
                        "#contactMessage"
                    )
                    .value
                    .trim();



            const phone =
                "573011241511";



            const whatsappMessage =

`Hola Daniela 👋

Mi nombre es: ${name}

Mi correo es: ${email}

Asunto: ${subject}

Mensaje:

${message}`;



            const encodedMessage =
                encodeURIComponent(
                    whatsappMessage
                );



            const whatsappURL =
                `https://wa.me/${phone}?text=${encodedMessage}`;



            window.open(
                whatsappURL,
                "_blank"
            );



            contactForm.reset();

        }
    );
}