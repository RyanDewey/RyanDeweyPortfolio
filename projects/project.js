// Nav scroll behavior — lower threshold since there's no full-screen hero
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 250) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Fade-in on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Hamburger menu
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav-toggle');
    const links = document.getElementById('nav-links');
    if (!nav || !toggle || !links) return;

    function setOpen(isOpen) {
        nav.classList.toggle('nav--open', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
        toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
    }

    toggle.addEventListener('click', e => { e.stopPropagation(); setOpen(!nav.classList.contains('nav--open')); });
    links.addEventListener('click', e => { if (e.target?.closest?.('a')) setOpen(false); });
    document.addEventListener('click', e => { if (nav.classList.contains('nav--open') && !nav.contains(e.target)) setOpen(false); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') setOpen(false); });
    window.addEventListener('resize', () => { if (window.innerWidth > 768) setOpen(false); });
});
