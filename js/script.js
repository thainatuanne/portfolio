const menuIcon = document.querySelector('#menu-icon');
const navLinks = document.querySelector('.nav-links');

menuIcon.onclick = () => {
    navLinks.classList.toggle('active');

}

// texto animado

document.addEventListener("DOMContentLoaded", () => {
    const textos = document.querySelectorAll(".texto-animado");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("ativo");
            }
        });
    });

    textos.forEach((texto) => {
        observer.observe(texto);
    });
});