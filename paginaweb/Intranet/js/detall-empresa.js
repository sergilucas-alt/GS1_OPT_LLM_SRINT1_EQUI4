// ============================================
// FUNCIONS PER A LA PÀGINA DE DETALL D'EMPRESA
// ============================================

// URL de l'enquesta d'autodiagnosi
const URL_ENQUESTA = "https://ccam.gencat.cat/ca/serveis/autodiagnosi/";

/**
 * Funció per obrir l'enquesta d'autodiagnosi en una nova pestanya
 */
function ferEnquesta() {
    window.open(URL_ENQUESTA, '_blank');
}

/**
 * Funció per tornar al llistat d'empreses
 */
function tornarAlLlistat() {
    window.location.href = 'intranet.html';
}

/**
 * Gestiona el menú hamburguesa en mòbil per la pàgina de detall
 */
function inicialitzarMenuDetall() {
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

/**
 * Inicialitza la pàgina de detall d'empresa
 */
function inicialitzarDetallEmpresa() {
    // Obté l'ID de l'empresa des de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const empresaId = urlParams.get('id');

    // Inicialitza el menú
    inicialitzarMenuDetall();

    // Botó tornar al llistat
    const btnTornar = document.getElementById('btnTornar');
    if (btnTornar) {
        btnTornar.addEventListener('click', tornarAlLlistat);
    }

    // Botó fer enquesta de digitalització
    const btnEnquestaDigital = document.getElementById('btnEnquestaDigital');
    if (btnEnquestaDigital) {
        btnEnquestaDigital.addEventListener('click', ferEnquesta);
    }

    // Botó fer enquesta de sostenibilitat
    const btnEnquestaSostenibilitat = document.getElementById('btnEnquestaSostenibilitat');
    if (btnEnquestaSostenibilitat) {
        btnEnquestaSostenibilitat.addEventListener('click', ferEnquesta);
    }

    // Carrega les dades de l'empresa
    if (empresaId) {
        const empresa = obtenirEmpresaPerId(empresaId);

        if (empresa) {
            // Omple les dades bàsiques
            document.getElementById('nomEmpresa').textContent = empresa.nom;

            // Actualitza el breadcrumb amb el nom de l'empresa
            const breadcrumbEmpresa = document.getElementById('breadcrumbEmpresa');
            if (breadcrumbEmpresa) {
                breadcrumbEmpresa.textContent = empresa.nom;
            }

            document.getElementById('municipi').textContent = empresa.municipi;
            document.getElementById('sector').textContent = empresa.sector;
            document.getElementById('email').textContent = empresa.email;
            document.getElementById('telefon').textContent = empresa.telefon;
            document.getElementById('web').textContent = empresa.web;
            document.getElementById('web').href = empresa.web;

            // Estat de l'empresa
            const estatBadge = document.getElementById('estatBadge');
            if (empresa.estat === 'activa') {
                estatBadge.textContent = 'Activa';
                estatBadge.className = 'estat-badge estat-activa';
            } else {
                estatBadge.textContent = 'Inactiva';
                estatBadge.className = 'estat-badge estat-inactiva';
            }

            // Digitalització
            const estatDigital = document.getElementById('estatDigital');
            const progressDigital = document.getElementById('progressDigital');

            let textEstatDigital = '';
            let colorEstatDigital = '';

            if (empresa.digitalitzacio.estat === 'pendent') {
                textEstatDigital = 'Pendent';
                colorEstatDigital = '#cbd5e0';
            } else if (empresa.digitalitzacio.estat === 'en_progres') {
                textEstatDigital = 'En progrés';
                colorEstatDigital = '#ed8936';
            } else if (empresa.digitalitzacio.estat === 'finalitzada') {
                textEstatDigital = 'Finalitzada';
                colorEstatDigital = '#48bb78';
            }

            estatDigital.textContent = textEstatDigital;
            estatDigital.style.backgroundColor = colorEstatDigital;
            estatDigital.style.color = 'white';

            // Animació del progrés
            setTimeout(() => {
                progressDigital.style.width = empresa.digitalitzacio.percentatge + '%';
                progressDigital.textContent = empresa.digitalitzacio.percentatge + '%';
            }, 100);

            // Sostenibilitat
            const estatSostenibilitat = document.getElementById('estatSostenibilitat');

            let textEstatSostenibilitat = '';
            let colorEstatSostenibilitat = '';

            if (empresa.sostenibilitat.estat === 'pendent') {
                textEstatSostenibilitat = 'Pendent';
                colorEstatSostenibilitat = '#cbd5e0';
            } else if (empresa.sostenibilitat.estat === 'en_progres') {
                textEstatSostenibilitat = 'En progrés';
                colorEstatSostenibilitat = '#ed8936';
            } else if (empresa.sostenibilitat.estat === 'finalitzada') {
                textEstatSostenibilitat = 'Finalitzada';
                colorEstatSostenibilitat = '#48bb78';
            }

            estatSostenibilitat.textContent = textEstatSostenibilitat;
            estatSostenibilitat.style.backgroundColor = colorEstatSostenibilitat;
            estatSostenibilitat.style.color = 'white';

            // Mostra el resultat si està finalitzada
            if (empresa.sostenibilitat.estat === 'finalitzada' && empresa.sostenibilitat.resultat) {
                const resultatRow = document.getElementById('resultatRow');
                resultatRow.style.display = 'flex';
                document.getElementById('resultatSostenibilitat').textContent = empresa.sostenibilitat.resultat;
            }

            // Gestió dels botons "Veure respostes"
            document.getElementById('btnVeureRespostesDigital').addEventListener('click', () => {
                if (empresa.digitalitzacio.estat === 'pendent') {
                    alert('Encara no s\'ha realitzat l\'enquesta de digitalització per aquesta empresa.');
                } else {
                    alert(`Respostes de Digitalització\n\nEmpresa: ${empresa.nom}\nEstat: ${textEstatDigital}\nProgrés: ${empresa.digitalitzacio.percentatge}%\n\n(Aquí es mostrarien les respostes detallades)`);
                }
            });

            document.getElementById('btnVeureRespostesSostenibilitat').addEventListener('click', () => {
                if (empresa.sostenibilitat.estat === 'pendent') {
                    alert('Encara no s\'ha realitzat l\'enquesta de sostenibilitat per aquesta empresa.');
                } else {
                    let missatge = `Respostes de Sostenibilitat\n\nEmpresa: ${empresa.nom}\nEstat: ${textEstatSostenibilitat}`;
                    if (empresa.sostenibilitat.resultat) {
                        missatge += `\nResultat: ${empresa.sostenibilitat.resultat}`;
                    }
                    missatge += '\n\n(Aquí es mostrarien les respostes detallades)';
                    alert(missatge);
                }
            });

        } else {
            document.getElementById('nomEmpresa').textContent = 'Empresa no trobada';
        }
    } else {
        document.getElementById('nomEmpresa').textContent = 'No s\'ha especificat cap empresa';
    }
}

// Inicialització quan el DOM estigui carregat
document.addEventListener('DOMContentLoaded', inicialitzarDetallEmpresa);
