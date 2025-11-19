// ============================================
// SCRIPT PER A LA PÀGINA D'INICI DE MONTSIÀ30
// Gestiona la navegació i interacció dels botons principals
// ============================================

/**
 * Funció per navegar al botó del header
 */
function tornarAInici() {
	window.location.href = 'OPT.html';
}

/**
 * Funció per navegar a la secció de sostenibilitat
 */
function navegarASostenibilitat() {
	alert('Secció de sostenibilitat (en desenvolupament)');
}

/**
 * Funció per navegar a la secció de digitalització
 */
function navegarADigitalitzacio() {
	window.location.href = '../Digitalització/digitalitzacio.html';
}

/**
 * Funció per navegar a la intranet
 */
function navegarAIntranet() {
	window.location.href = '../Intranet/intranet.html';
}

// ============================================
// EFECTES D'INTERACCIÓ PER ALS BOTONS
// ============================================

/**
 * Afegeix efecte d'escala al passar el ratolí per sobre d'un botó
 */
function afegirEfecteHover(boto) {
	boto.addEventListener('mouseenter', () => {
		boto.classList.add('hover-scale');
		boto.classList.remove('no-hover-bright');
	});

	boto.addEventListener('mouseleave', () => {
		boto.classList.remove('hover-scale');
		boto.classList.remove('active-scale');
	});

	boto.addEventListener('mousedown', () => {
		boto.classList.add('active-scale');
		boto.classList.add('no-hover-bright');
	});

	boto.addEventListener('mouseup', () => {
		boto.classList.remove('active-scale');
	});
}

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

// ============================================
// INICIALITZACIÓ - Event listeners per als botons
// ============================================

document.addEventListener('DOMContentLoaded', () => {
	// Inicialitza el menú de navegació
	inicialitzarMenu();

	// Botó del header
	const btnHeader = document.getElementById('btnIniciHeader');
	if (btnHeader) {
		btnHeader.addEventListener('click', tornarAInici);
	}

	// Botó sostenibilitat
	const btnSostenibilitat = document.getElementById('btnSostenibilitat');
	if (btnSostenibilitat) {
		btnSostenibilitat.addEventListener('click', navegarASostenibilitat);
		afegirEfecteHover(btnSostenibilitat);
	}

	// Botó digitalització
	const btnDigitalitzacio = document.getElementById('btnDigitalitzacio');
	if (btnDigitalitzacio) {
		btnDigitalitzacio.addEventListener('click', navegarADigitalitzacio);
		afegirEfecteHover(btnDigitalitzacio);
	}

	// Botó intranet
	const btnIntranet = document.getElementById('btnIntranet');
	if (btnIntranet) {
		btnIntranet.addEventListener('click', navegarAIntranet);
		afegirEfecteHover(btnIntranet);
	}
});
