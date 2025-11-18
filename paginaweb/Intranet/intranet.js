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
        btnHeader.removeEventListener('click', tornarAInici);
        btnHeader.addEventListener('click', tancarSessio);

        // Carrega les empreses si encara no s'han carregat
        if (totesLesEmpreses.length === 0) {
            carregarEmpreses();
        }
    } else {
        // Si estem al login o registre, el botó torna a la pàgina d'inici
        btnHeader.textContent = 'MONTSIÀ30';
        btnHeader.removeEventListener('click', tancarSessio);
        btnHeader.addEventListener('click', tornarAInici);
    }
}

// Funcions auxiliars per als event listeners
function tancarSessio() {
    mostrarVista('login');
}

function tornarAInici() {
    window.location.href = '../pagina_inici/OPT.html';
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
// LÒGICA DE LA INTRANET (Llistat d'Empreses amb Filtres)
// Gestiona la càrrega, filtració i visualització de les empreses
// ============================================

// Array per emmagatzemar totes les empreses carregades del XML
let totesLesEmpreses = [];

// URL de l'enquesta d'autodiagnosi
const URL_ENQUESTA = "https://ccam.gencat.cat/ca/serveis/autodiagnosi/";

/**
 * Carrega la llista d'empreses des del fitxer de dades JavaScript
 */
function carregarEmpreses() {
    try {
        // Obté les empreses del fitxer dades-empreses.js
        totesLesEmpreses = obtenirEmpreses();

        console.log('✅ Empreses carregades correctament:', totesLesEmpreses.length);

        // Mostra totes les empreses inicialment
        mostrarEmpreses(totesLesEmpreses);
    } catch (error) {
        console.error('❌ Error carregant empreses:', error);
        const contenidor = document.getElementById('contenidorEmpreses');
        contenidor.innerHTML = `
            <div class="missatge-error">
                <p class="error-titol">❌ Error carregant les empreses</p>
                <p class="error-missatge">${error.message}</p>
                <button class="btn-retry" id="btnRetry">
                    Tornar a intentar
                </button>
            </div>
        `;

        // Afegir event listener al botó de retry
        document.getElementById('btnRetry').addEventListener('click', carregarEmpreses);
    }
}

/**
 * Mostra les empreses com a fitxes
 * @param {Array} empreses - Array d'empreses a mostrar
 */
function mostrarEmpreses(empreses) {
    const contenidor = document.getElementById('contenidorEmpreses');

    if (empreses.length === 0) {
        contenidor.innerHTML = `
            <div class="missatge-no-empreses">
                <p>No s'han trobat empreses amb aquests filtres</p>
            </div>
        `;
        return;
    }

    contenidor.innerHTML = '';

    empreses.forEach(empresa => {
        const fitxa = crearFitxaEmpresa(empresa);
        contenidor.appendChild(fitxa);
    });
}

/**
 * Crea una fitxa HTML per a una empresa
 * @param {Object} empresa - Objecte amb les dades de l'empresa
 * @returns {HTMLElement} Element div amb la fitxa de l'empresa
 */
function crearFitxaEmpresa(empresa) {
    const fitxa = document.createElement('div');
    fitxa.className = 'fitxa-empresa';

    // Badge d'estat
    const estatClass = empresa.estat === 'activa' ? 'badge-activa' : 'badge-inactiva';
    const estatText = empresa.estat === 'activa' ? 'Activa' : 'Inactiva';

    // Badge de digitalització
    let digitalBadge = '';
    if (empresa.digitalitzacio.estat === 'finalitzada') {
        digitalBadge = '<span class="badge-digital-finalitzada">✓ Digital</span>';
    } else if (empresa.digitalitzacio.estat === 'en_progres') {
        digitalBadge = '<span class="badge-digital-progres">⏳ En progrés</span>';
    }

    fitxa.innerHTML = `
        <div class="fitxa-header">
            <h3 class="fitxa-nom">${empresa.nom}</h3>
            <span class="badge-estat-empresa ${estatClass}">${estatText}</span>
        </div>
        <p class="fitxa-info">
            <strong>Municipi:</strong> ${empresa.municipi}
        </p>
        <p class="fitxa-info">
            <strong>Sector:</strong> ${empresa.sector}
        </p>
        <div class="fitxa-badges">
            ${digitalBadge}
            ${empresa.sostenibilitat.estat === 'finalitzada' ?
                `<span class="badge-sostenible">✓ Sostenible</span>` : ''}
        </div>
        <hr class="fitxa-divider">
        <div class="fitxa-botons">
            <button class="btn-fitxa-enquesta" data-empresa-id="${empresa.id}">
                Fer enquesta
            </button>
            <button class="btn-fitxa-detalls" data-empresa-id="${empresa.id}">
                Veure respostes
            </button>
        </div>
    `;

    // Efecte hover
    fitxa.addEventListener('mouseenter', () => {
        fitxa.classList.add('fitxa-hover');
    });

    fitxa.addEventListener('mouseleave', () => {
        fitxa.classList.remove('fitxa-hover');
    });

    // Event listeners per als botons
    fitxa.querySelector('.btn-fitxa-enquesta').addEventListener('click', (e) => {
        e.stopPropagation();
        ferEnquesta(empresa);
    });

    fitxa.querySelector('.btn-fitxa-detalls').addEventListener('click', (e) => {
        e.stopPropagation();
        veureDetalls(empresa);
    });

    return fitxa;
}

/**
 * Obre l'enquesta per a una empresa
 */
function ferEnquesta(empresa) {
    console.log('Iniciant enquesta per:', empresa.nom);
    window.open(URL_ENQUESTA, '_blank');
}

/**
 * Mostra els detalls d'una empresa (redirigeix a la pàgina de detall)
 */
function veureDetalls(empresa) {
    window.location.href = `detall-empresa.html?id=${empresa.id}`;
}

/**
 * Aplica els filtres seleccionats
 */
function aplicarFiltres() {
    const cercaNom = document.getElementById('cercaNom').value.toLowerCase();
    const filtreSector = document.getElementById('filtreSector').value;
    const filtreEstat = document.getElementById('filtreEstat').value;
    const filtreDigital = document.getElementById('filtreDigital').value;
    const filtreSostenibilitat = document.getElementById('filtreSostenibilitat').value;
    const ordenarPer = document.getElementById('ordenarPer').value;

    // Filtra les empreses
    let empresesFiltrades = totesLesEmpreses.filter(empresa => {
        // Filtre de cerca
        if (cercaNom && !empresa.nom.toLowerCase().includes(cercaNom) && !empresa.municipi.toLowerCase().includes(cercaNom)) {
            return false;
        }

        // Filtre de sector
        if (filtreSector && empresa.sector !== filtreSector) {
            return false;
        }

        // Filtre d'estat
        if (filtreEstat && empresa.estat !== filtreEstat) {
            return false;
        }

        // Filtre de digitalització
        if (filtreDigital && empresa.digitalitzacio.estat !== filtreDigital) {
            return false;
        }

        // Filtre de sostenibilitat
        if (filtreSostenibilitat && empresa.sostenibilitat.estat !== filtreSostenibilitat) {
            return false;
        }

        return true;
    });

    // Ordena les empreses
    empresesFiltrades.sort((a, b) => {
        if (ordenarPer === 'nom') {
            return a.nom.localeCompare(b.nom);
        } else if (ordenarPer === 'municipi') {
            return a.municipi.localeCompare(b.municipi);
        } else if (ordenarPer === 'sector') {
            return a.sector.localeCompare(b.sector);
        }
        return 0;
    });

    mostrarEmpreses(empresesFiltrades);
}

// Event listeners per als filtres
document.getElementById('aplicarFiltres').addEventListener('click', aplicarFiltres);

// Aplicar filtres en temps real quan es canvia algun filtre
document.getElementById('cercaNom').addEventListener('input', aplicarFiltres);
document.getElementById('filtreSector').addEventListener('change', aplicarFiltres);
document.getElementById('filtreEstat').addEventListener('change', aplicarFiltres);
document.getElementById('filtreDigital').addEventListener('change', aplicarFiltres);
document.getElementById('filtreSostenibilitat').addEventListener('change', aplicarFiltres);
document.getElementById('ordenarPer').addEventListener('change', aplicarFiltres);

// ============================================
// INICIALITZACIÓ
// Configura el botó del header segons la vista inicial
// ============================================

// Configuració inicial del botó del header (quan es carrega la pàgina, estem al login)
btnHeader.textContent = 'MONTSIÀ30';
btnHeader.addEventListener('click', tornarAInici);

// Les empreses es carregaran automàticament quan l'usuari accedeixi a la vista Main
