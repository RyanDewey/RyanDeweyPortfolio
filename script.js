// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Fade in elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Resume download function
function downloadResume() {
    // This will open the resume in a new tab and trigger download
    const link = document.createElement('a');
    link.href = 'images/RyanDeweyResume.pdf'; // Replace with actual path to your resume
    link.download = 'RyanDeweyResume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Nav background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('.nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.05)';
    }

    if (window.scrollY > 850) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  const toggle = document.querySelector('.nav-toggle');
  const links = document.getElementById('nav-links');

  if (!nav || !toggle || !links) {
    // If markup isn't present, just do nothing.
    return;
  }

  function setOpen(isOpen) {
    nav.classList.toggle('nav--open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
    toggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    setOpen(!nav.classList.contains('nav--open'));
  });

  // Close when clicking a link
  links.addEventListener('click', (e) => {
    const a = e.target && e.target.closest && e.target.closest('a');
    if (a) setOpen(false);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!nav.classList.contains('nav--open')) return;
    if (!nav.contains(e.target)) setOpen(false);
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setOpen(false);
  });

  // Reset if resizing back to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) setOpen(false);
  });
});
