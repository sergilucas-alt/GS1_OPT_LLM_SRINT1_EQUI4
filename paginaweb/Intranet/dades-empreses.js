// ============================================
// DADES DE LES EMPRESES
// Base de dades d'empreses en format JavaScript
// ============================================

const EMPRESES_DATA = [
    {
        id: 1,
        nom: "Forns de la Ràpita",
        municipi: "La Ràpita",
        sector: "Alimentació",
        email: "info@fornsrapita.cat",
        telefon: "977222333",
        web: "https://fornsrapita.cat",
        estat: "activa",
        digitalitzacio: {
            estat: "pendent",
            percentatge: 0
        },
        sostenibilitat: {
            estat: "finalitzada",
            resultat: "Regular - 72%"
        },
        imatge: "empresa1.jpg"
    },
    {
        id: 2,
        nom: "Empresa Comercial Montsià",
        municipi: "Amposta",
        sector: "Comerç",
        email: "info@comercialmontsia.cat",
        telefon: "977445566",
        web: "https://comercialmontsia.cat",
        estat: "activa",
        digitalitzacio: {
            estat: "en_progres",
            percentatge: 45
        },
        sostenibilitat: {
            estat: "pendent",
            resultat: ""
        },
        imatge: "empresa2.jpg"
    },
    {
        id: 3,
        nom: "Indústries Ebre SL",
        municipi: "Tortosa",
        sector: "Industrial",
        email: "contact@industriesebre.com",
        telefon: "977888999",
        web: "https://industriesebre.com",
        estat: "activa",
        digitalitzacio: {
            estat: "finalitzada",
            percentatge: 100
        },
        sostenibilitat: {
            estat: "finalitzada",
            resultat: "Excel·lent - 89%"
        },
        imatge: "empresa3.jpg"
    },
    {
        id: 4,
        nom: "Serveis Delta",
        municipi: "Deltebre",
        sector: "Serveis",
        email: "info@serveisdelta.cat",
        telefon: "977333444",
        web: "https://serveisdelta.cat",
        estat: "inactiva",
        digitalitzacio: {
            estat: "pendent",
            percentatge: 0
        },
        sostenibilitat: {
            estat: "pendent",
            resultat: ""
        },
        imatge: "empresa4.jpg"
    },
    {
        id: 5,
        nom: "Tecnologia Terres de l'Ebre",
        municipi: "Amposta",
        sector: "Tecnologia",
        email: "hola@tecte.cat",
        telefon: "977111222",
        web: "https://tecte.cat",
        estat: "activa",
        digitalitzacio: {
            estat: "finalitzada",
            percentatge: 100
        },
        sostenibilitat: {
            estat: "en_progres",
            resultat: ""
        },
        imatge: "empresa5.jpg"
    }
];

// Funció per obtenir totes les empreses
function obtenirEmpreses() {
    return EMPRESES_DATA;
}

// Funció per obtenir una empresa per ID
function obtenirEmpresaPerId(id) {
    return EMPRESES_DATA.find(empresa => empresa.id == id);
}
