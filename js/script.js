const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.nav');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.querySelector('.back-to-top');
const sections = document.querySelectorAll('main section');
const revealElements = document.querySelectorAll('.fade-up');

function updateNavState() {
  const scrollPosition = window.scrollY + window.innerHeight / 3;
  sections.forEach((section) => {
    const id = section.id;
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (!link) return;
    const sectionTop = section.offsetTop;
    if (scrollPosition >= sectionTop) {
      navLinks.forEach((item) => item.classList.remove('active'));
      link.classList.add('active');
    }
  });
}

function toggleMobileMenu() {
  const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!isExpanded));
  nav.classList.toggle('open');
}

function handleScroll() {
  if (window.scrollY > 400) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
  updateNavState();
  revealElements.forEach((element) => {
    const rect = element.getBoundingClientRect();
    if (rect.top < window.innerHeight - 80) {
      element.classList.add('visible');
    }
  });
}

navToggle.addEventListener('click', toggleMobileMenu);
navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      nav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

window.addEventListener('scroll', handleScroll);
window.addEventListener('load', () => {
  handleScroll();
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
      const target = anchor.getAttribute('href');
      if (target.startsWith('#')) {
        event.preventDefault();
        document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
