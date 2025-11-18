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
});
