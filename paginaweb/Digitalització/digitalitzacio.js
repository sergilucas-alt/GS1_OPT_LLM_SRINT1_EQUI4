// ============================================
// SCRIPT PER A LA PÀGINA DE DIGITALITZACIÓ
// Gestiona el carrusel i la navegació
// ============================================

/**
 * Funció per tornar a la pàgina d'inici
 */
function tornarAInici() {
	window.location.href = '../pagina_inici/OPT.html';
}

// ============================================
// GESTIÓ DEL CARRUSEL
// ============================================

let index = 0;
const slides = document.querySelectorAll('.slide');

/**
 * Mostra la diapositiva especificada per l'índex
 * @param {number} i - Índex de la diapositiva a mostrar
 */
function showSlide(i) {
	slides.forEach((slide, idx) => {
		slide.classList.toggle('active', idx === i);
	});
}

// ============================================
// INICIALITZACIÓ - Event listeners
// ============================================

document.addEventListener('DOMContentLoaded', () => {
	// Botó del header per tornar a l'inici
	const btnHeader = document.getElementById('btnIniciHeader');
	if (btnHeader) {
		btnHeader.addEventListener('click', tornarAInici);
	}

	// Botó de navegació següent
	const btnNext = document.getElementById('next');
	if (btnNext) {
		btnNext.addEventListener('click', () => {
			index = (index + 1) % slides.length;
			showSlide(index);
		});
	}

	// Botó de navegació anterior
	const btnPrev = document.getElementById('prev');
	if (btnPrev) {
		btnPrev.addEventListener('click', () => {
			index = (index - 1 + slides.length) % slides.length;
			showSlide(index);
		});
	}

	// Suport per a navegació amb teclat
	document.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowRight') {
			index = (index + 1) % slides.length;
			showSlide(index);
		} else if (e.key === 'ArrowLeft') {
			index = (index - 1 + slides.length) % slides.length;
			showSlide(index);
		}
	});

	// Ajustar variables CSS per al header/footer (mida real) al carregar
	if (typeof setCarouselOffsets === 'function') setCarouselOffsets();
});

/**
 * Mesura l'altura del header i footer i actualitza les variables CSS
 * Això evita que el carrusel quedi per darrere del footer i assegura
 * que la seva alçada coincideixi amb l'espai real disponible.
 */
function setCarouselOffsets() {
  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const root = document.documentElement;
  const h = header ? Math.ceil(header.getBoundingClientRect().height) : 70;
  const f = footer ? Math.ceil(footer.getBoundingClientRect().height) : 60;
  root.style.setProperty('--header-height', `${h}px`);
  root.style.setProperty('--footer-height', `${f}px`);
}

// Recalcula al redimensionar la finestra
window.addEventListener('resize', setCarouselOffsets);
