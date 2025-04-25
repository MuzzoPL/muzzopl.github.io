function toggleMenu() {
    var navMenu = document.querySelector('.nav-menu');
    var overlay = document.querySelector('.overlay');
    navMenu.classList.toggle('active');
    overlay.classList.toggle('active');
}

function closeMenu() {
    var navMenu = document.querySelector('.nav-menu');
    var overlay = document.querySelector('.overlay');
    navMenu.classList.remove('active');
    overlay.classList.remove('active');
}

// Fecha o menu ao clicar fora dele
document.addEventListener('click', function(e) {
    var navMenu = document.querySelector('.nav-menu');
    var overlay = document.querySelector('.overlay');
    var menuToggle = document.querySelector('.menu-toggle');
    if (navMenu.classList.contains('active') && 
        !navMenu.contains(e.target) && 
        !menuToggle.contains(e.target)) {
        closeMenu();
    }
});