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
	index = i; // Actualitza l'índex global
}

/**
 * Gestiona la navegació per hash des del menú
 */
function handleHashChange() {
	const hash = window.location.hash;
	if (hash && hash.startsWith('#slide-')) {
		const slideNum = parseInt(hash.split('-')[1]);
		if (!isNaN(slideNum) && slideNum >= 0 && slideNum < slides.length) {
			showSlide(slideNum);
		}
	}
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
			const newIndex = (index + 1) % slides.length;
			window.location.hash = `slide-${newIndex}`;
		});
	}

	// Botó de navegació anterior
	const btnPrev = document.getElementById('prev');
	if (btnPrev) {
		btnPrev.addEventListener('click', () => {
			const newIndex = (index - 1 + slides.length) % slides.length;
			window.location.hash = `slide-${newIndex}`;
		});
	}

	// Suport per a navegació amb teclat
	document.addEventListener('keydown', (e) => {
		if (e.key === 'ArrowRight') {
			const newIndex = (index + 1) % slides.length;
			window.location.hash = `slide-${newIndex}`;
		} else if (e.key === 'ArrowLeft') {
			const newIndex = (index - 1 + slides.length) % slides.length;
			window.location.hash = `slide-${newIndex}`;
		}
	});

	// Inicialitza el menú de navegació
	inicialitzarMenu();

	// Gestió de navegació directa per hash (URL amb #slide-N)
	handleHashChange();

	// Afegir listener per detectar canvis de hash (quan es clica un enllaç del menú)
	window.addEventListener('hashchange', handleHashChange);
});

// ============================================
// MENÚ DE NAVEGACIÓ
// ============================================

/**
 * Gestiona el menú hamburguesa en mòbil
 */
function inicialitzarMenu() {
	const menuToggle = document.getElementById('menuToggle');
	const navbar = document.getElementById('navbar');

	if (menuToggle && navbar) {
		menuToggle.addEventListener('click', () => {
			navbar.classList.toggle('active');
		});
	}

	// Gestionar dropdowns en mòbil
	const dropdowns = document.querySelectorAll('.dropdown');
	dropdowns.forEach(dropdown => {
		const toggle = dropdown.querySelector('.dropdown-toggle');
		if (toggle) {
			toggle.addEventListener('click', (e) => {
				// En mòbil, alternar el dropdown
				if (window.innerWidth <= 968) {
					e.stopPropagation();
					dropdown.classList.toggle('active');
				}
			});
		}
	});

	// Tancar el menú en clicar fora
	document.addEventListener('click', (e) => {
		if (!e.target.closest('.barradalt')) {
			navbar.classList.remove('active');
		}
	});
}
