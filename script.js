// Année automatique dans le pied de page
document.getElementById("annee").textContent = new Date().getFullYear();

const barre = document.getElementById("navbar");
const bouton = document.getElementById("menuToggle");
const menu = document.getElementById("navMenu");
const liens = document.querySelectorAll("#navMenu a");

// Menu mobile
function fermerMenu() {
  menu.classList.remove("ouvert");
  bouton.textContent = "☰";
  bouton.setAttribute("aria-expanded", "false");
}

bouton.addEventListener("click", () => {
  const ouvert = menu.classList.toggle("ouvert");
  bouton.textContent = ouvert ? "✕" : "☰";
  bouton.setAttribute("aria-expanded", String(ouvert));
});

// Défilement doux depuis tous les liens internes
document.querySelectorAll('a[href^="#"]').forEach(lien => {
  lien.addEventListener("click", e => {
    const cible = document.querySelector(lien.getAttribute("href"));
    if (cible) {
      e.preventDefault();
      cible.scrollIntoView({ behavior: "smooth" });
      fermerMenu();
    }
  });
});

// Barre de navigation : fond au défilement
function gererBarre() {
  barre.classList.toggle("defile", window.scrollY > 40);
}
window.addEventListener("scroll", gererBarre, { passive: true });
gererBarre();

// Lien actif selon la section visible
const sections = document.querySelectorAll("main section[id]");
const observateurNav = new IntersectionObserver(entrees => {
  entrees.forEach(entree => {
    if (entree.isIntersecting) {
      liens.forEach(l => l.classList.toggle("actif", l.getAttribute("href") === "#" + entree.target.id));
    }
  });
}, { rootMargin: "-45% 0px -50% 0px" });
sections.forEach(s => observateurNav.observe(s));

// Apparition animée (avec léger décalage entre éléments voisins)
const observateur = new IntersectionObserver(entrees => {
  entrees.forEach(entree => {
    if (entree.isIntersecting) {
      const el = entree.target;
      const frères = [...el.parentElement.querySelectorAll(":scope > .reveal")];
      const rang = Math.max(0, frères.indexOf(el));
      el.style.transitionDelay = Math.min(rang * 0.1, 0.4) + "s";
      el.classList.add("visible");
      observateur.unobserve(el);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observateur.observe(el));