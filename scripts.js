const nav = document.querySelector('.nav-bar');
if (nav) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 2) nav.classList.add('nav-bar-scrolled');
    else nav.classList.remove('nav-bar-scrolled');
  }, { passive: true });
  // état initial (optionnel)
  if (window.scrollY > 2) nav.classList.add('nav-bar-scrolled');
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // On ajoute la classe 'show' quand l'élément est visible
      entry.target.classList.add('show');
    } else {
      // On retire la classe quand l'élément sort du viewport
      entry.target.classList.remove('show');
    }
  });
}, {
  threshold: 0.25 // Déclenche l'animation quand 25% de l'élément est visible
});

// On cible tous les éléments qu'on veut animer à leur apparition
const animatedElements = document.querySelectorAll('.card, .titre-section, .contact-column');
animatedElements.forEach((el) => observer.observe(el));

// Gestion du Menu Hamburger
const hamburger = document.querySelector('.hamburger');
const navButtons = document.querySelector('.nav-buttons');

if (hamburger && navButtons) {
    hamburger.addEventListener('click', () => {
        navButtons.classList.toggle('active');
    });

    // Fermer le menu quand on clique sur un lien
    navButtons.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navButtons.classList.remove('active');
        });
    });
}

// Gestion des filtres Technologies
const filterBtns = document.querySelectorAll('.filter-btn');
const techCards = document.querySelectorAll('.tech-card');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Gestion de la classe active sur les boutons
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Filtrage des cartes
            techCards.forEach(card => {
                if (filterValue === 'tous' || card.getAttribute('data-category') === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Initialisation : Appliquer le filtre du bouton actif au chargement
    const activeBtn = document.querySelector('.filter-btn.active');
    if (activeBtn) {
        const filterValue = activeBtn.getAttribute('data-filter');
        techCards.forEach(card => {
            if (filterValue === 'tous' || card.getAttribute('data-category') === filterValue) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }
}