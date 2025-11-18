// ============================================
// SISTEMA DE NAVEGACIÓ ENTRE VISTES
// Gestiona el canvi entre les 3 pàgines: login, registre i main
// ============================================

// Objecte que conté les referències a les 3 vistes
const vistes = {
    login: document.getElementById('vistaLogin'),
    registre: document.getElementById('vistaRegistre'),
    main: document.getElementById('vistaMain')
};

// Botó del header que canvia segons la vista activa
const btnHeader = document.getElementById('btnHeader');

/**
 * Funció per mostrar una vista específica i ocultar les altres
 * @param {string} nomVista - Nom de la vista a mostrar ('login', 'registre' o 'main')
 */
function mostrarVista(nomVista) {
    // Oculta totes les vistes eliminant la classe 'activa'
    Object.values(vistes).forEach(vista => vista.classList.remove('activa'));

    // Mostra la vista seleccionada afegint la classe 'activa'
    vistes[nomVista].classList.add('activa');

    // Actualitza el text i la funcionalitat del botó del header
    if (nomVista === 'main') {
        // Si estem a la pàgina principal, el botó tanca la sessió
        btnHeader.textContent = 'Tanca Sessió';
        btnHeader.onclick = () => mostrarVista('login');
    } else {
        // Si estem al login o registre, el botó torna a la pàgina d'inici
        btnHeader.textContent = 'MONTSIÀ30';
        btnHeader.onclick = () => window.location.href = '../pagina_inici/OPT.html';
    }
}

// ============================================
// LÒGICA DEL LOGIN
// Gestiona l'accés a la intranet
// ============================================

// Event listener per al formulari de login
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que el formulari s'enviï de forma tradicional

    // Obté els valors dels camps
    const usuari = document.getElementById('usuariLogin').value;
    const contrasenya = document.getElementById('contrasenyaLogin').value;

    // Validació simple: comprova que els camps no estiguin buits
    if (usuari && contrasenya) {
        // NOTA: En una aplicació real, aquí es validarien les credencials amb el servidor
        // Per ara, simplement accedim sense validació real
        console.log("✅ Accés sense validació de credencials (segons especificació)");

        // Canvia directament a la vista principal de la intranet
        mostrarVista('main');
    } else {
        alert("❌ Si us plau, omple tots els camps.");
    }
});

// Event listener per l'enllaç "Registra't aquí"
document.getElementById('linkRegistre').addEventListener('click', (e) => {
    e.preventDefault(); // Evita que l'enllaç recarregui la pàgina
    mostrarVista('registre');
});

// ============================================
// FUNCIONS DE VALIDACIÓ PER AL REGISTRE
// ============================================

/**
 * Valida que la contrasenya compleixi els requisits de seguretat
 * @param {string} contrasenya - Contrasenya a validar
 * @returns {string} Missatge d'error o string buit si és vàlida
 */
function validarContrasenya(contrasenya) {
    // Ha de tenir almenys 8 caràcters
    if (contrasenya.length < 8) {
        return "Ha de tenir almenys 8 caràcters.";
    }
    // Ha de contenir almenys una majúscula
    if (!/[A-Z]/.test(contrasenya)) {
        return "Ha de contenir almenys una majúscula.";
    }
    // Ha de contenir almenys una minúscula
    if (!/[a-z]/.test(contrasenya)) {
        return "Ha de contenir almenys una minúscula.";
    }
    // Ha de contenir almenys un caràcter especial (no alfanumèric)
    if (!/[^a-zA-Z0-9]/.test(contrasenya)) {
        return "Ha de contenir almenys un caràcter especial o número.";
    }
    return ""; // Contrasenya vàlida
}

/**
 * Valida que el correu electrònic sigui del domini correcte
 * @param {string} email - Correu electrònic a validar
 * @returns {string} Missatge d'error o string buit si és vàlid
 */
function validarUsuari(email) {
    // Expressió regular per validar el format correu@montsia30.net
    const regex = /^[a-zA-Z0-9._%+-]+@montsia30\.net$/;

    // Comprova que el camp no estigui buit
    if (email === "") {
        return "El camp de correu no pot estar buit.";
    }
    // Comprova que el correu sigui del domini @montsia30.net
    if (!regex.test(email)) {
        return "El correu ha de ser del domini @montsia30.net.";
    }
    return ""; // Correu vàlid
}

// ============================================
// LÒGICA DEL REGISTRE
// Gestiona la creació de nous comptes d'usuari
// ============================================

// Event listener per al formulari de registre
document.getElementById('registreForm').addEventListener('submit', (e) => {
    e.preventDefault(); // Evita que el formulari s'enviï de forma tradicional

    // Obté referències als camps del formulari
    const usuariInput = document.getElementById('usuariRegistre');
    const contrasenyaInput = document.getElementById('contrasenyaRegistre');
    const usuariError = document.getElementById('usuariError');
    const passError = document.getElementById('passError');

    // Neteja els missatges d'error anteriors
    usuariError.textContent = '';
    passError.textContent = '';

    // Valida el correu i la contrasenya
    const errorUsuari = validarUsuari(usuariInput.value.trim());
    const errorPass = validarContrasenya(contrasenyaInput.value.trim());

    // Mostra els errors si n'hi ha
    if (errorUsuari) {
        usuariError.textContent = '❌ ' + errorUsuari;
        usuariInput.focus(); // Posa el focus al camp amb error
    }

    if (errorPass) {
        passError.textContent = '❌ ' + errorPass;
        if (!errorUsuari) { // Només enfoca si l'usuari no té errors
            contrasenyaInput.focus();
        }
    }

    // Si no hi ha errors, procedeix amb el registre
    if (!errorUsuari && !errorPass) {
        // NOTA: En una aplicació real, aquí s'enviarien les dades al servidor
        console.log("✅ Registre completat:", usuariInput.value);

        // Neteja els camps del formulari
        usuariInput.value = '';
        contrasenyaInput.value = '';

        // Mostra missatge d'èxit
        alert("✅ Registre completat amb èxit!\n\nJa pots accedir amb el teu nou compte.");

        // Canvia a la vista de login
        mostrarVista('login');
    }
});

// Event listener per l'enllaç "Accedeix aquí"
document.getElementById('linkLogin').addEventListener('click', (e) => {
    e.preventDefault(); // Evita que l'enllaç recarregui la pàgina
    mostrarVista('login');
});

// ============================================
// LÒGICA DE LA INTRANET (Selecció d'Empresa i Diagnosi)
// Gestiona la selecció d'empresa i el llançament de l'autodiagnosi
// ============================================

// Referències als elements de la pàgina principal
const empresaSelector = document.getElementById('empresa');
const diagnosiSelector = document.getElementById('diagnosi');
const botoDiagnosi = document.getElementById('iniciaDiagnosi');
const missatgeError = document.getElementById('missatgeError');

// URL de l'enquesta d'autodiagnosi
const URL_ENQUESTA = "https://ccam.gencat.cat/ca/serveis/autodiagnosi/";

/**
 * Comprova les seleccions dels dropdowns i activa/desactiva el botó segons correspongui
 */
function comprovarSeleccions() {
    // Obté els valors seleccionats
    const empresaSeleccionada = empresaSelector.value;
    const diagnosiSeleccionada = diagnosiSelector.value;

    // Neteja els missatges d'error
    missatgeError.textContent = '';

    // Per defecte, el botó està desactivat
    botoDiagnosi.disabled = true;
    botoDiagnosi.style.cursor = 'not-allowed';
    botoDiagnosi.style.backgroundColor = '#555';

    // Comprova si s'han seleccionat ambdues opcions
    if (empresaSeleccionada && diagnosiSeleccionada) {
        // Només la diagnosi 'comercial' està disponible
        if (diagnosiSeleccionada === 'comercial') {
            // Activa el botó
            botoDiagnosi.disabled = false;
            botoDiagnosi.style.cursor = 'pointer';
            botoDiagnosi.style.backgroundColor = '#1f85de';
        } else {
            // Mostra missatge per a diagnosis no disponibles
            missatgeError.textContent = 'Aquesta diagnosi no està disponible en la versió actual.';
        }
    } else if (empresaSeleccionada || diagnosiSeleccionada) {
        // Mostra missatge si només s'ha seleccionat una opció
        missatgeError.textContent = 'Cal seleccionar tant una empresa com el tipus de diagnosi.';
    }
}

// Event listeners per als canvis als selectors
empresaSelector.addEventListener('change', comprovarSeleccions);
diagnosiSelector.addEventListener('change', comprovarSeleccions);

// Event listener per al botó d'iniciar diagnosi
botoDiagnosi.addEventListener('click', () => {
    if (!botoDiagnosi.disabled) {
        // Obre l'enllaç de l'enquesta en una nova pestanya
        window.open(URL_ENQUESTA, '_blank');
    }
});

// Comprova les seleccions inicial al carregar la pàgina
comprovarSeleccions();

// ============================================
// INICIALITZACIÓ
// Configura el botó del header segons la vista inicial
// ============================================

// Configuració inicial del botó del header (quan es carrega la pàgina, estem al login)
btnHeader.textContent = 'MONTSIÀ30';
btnHeader.onclick = () => window.location.href = '../pagina_inici/OPT.html';
