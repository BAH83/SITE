// Exemple de données ebooks
const ebooks = [
    {
        id: 1,
        nom: "Ebook 1",
        auteur: "Auteur 1",
        genre: "Fiction",
        date: "2026-01-01",
        prix: "5€",
        note: 4,
        couverture: "images/ebook1.jpg",
        resume: "Résumé du Ebook 1...",
        pages: 120,
        heures: 6,
        mots: 35000
    },
    {
        id: 2,
        nom: "Ebook 2",
        auteur: "Auteur 2",
        genre: "Business",
        date: "2025-12-10",
        prix: "7€",
        note: 5,
        couverture: "images/ebook2.jpg",
        resume: "Résumé du Ebook 2...",
        pages: 200,
        heures: 10,
        mots: 60000
    }
];

// Afficher ebooks sur la page d'accueil
function displayEbooks(list) {
    const container = document.getElementById("ebooksContainer");
    container.innerHTML = "";
    list.forEach(e => {
        const card = document.createElement("div");
        card.className = "ebook-card";
        card.innerHTML = `
            <img src="${e.couverture}" alt="${e.nom}">
            <h3>${e.nom}</h3>
            <p>${e.auteur}</p>
            <p>${"★".repeat(e.note)}${"☆".repeat(5-e.note)}</p>
            <p>${e.prix}</p>
            <button onclick="goToEbook(${e.id})">Voir détails</button>
        `;
        container.appendChild(card);
    });
}

// Aller à la page ebook
function goToEbook(id) {
    localStorage.setItem("currentEbookId", id);
    window.location.href = "ebook.html";
}

// Filtrer par genre
function filterGenre(genre) {
    const filtered = ebooks.filter(e => e.genre === genre);
    displayEbooks(filtered);
}

// Recherche en direct
document.getElementById("searchBar").addEventListener("input", function() {
    const query = this.value.toLowerCase();
    const filtered = ebooks.filter(e => e.nom.toLowerCase().includes(query));
    displayEbooks(filtered);
});

// Page ebook détail
function displayEbookDetail() {
    const id = localStorage.getItem("currentEbookId");
    const ebook = ebooks.find(e => e.id == id);
    if (!ebook) return;
    const container = document.getElementById("ebookDetail");
    container.innerHTML = `
        <div class="ebook-top">
            <div class="left">
                <img src="${ebook.couverture}" alt="${ebook.nom}">
                <p>${"★".repeat(ebook.note)}${"☆".repeat(5-ebook.note)}</p>
            </div>
            <div class="right">
                <p>${ebook.genre} / ${ebook.date}</p>
                <h2>${ebook.nom}</h2>
                <p>Auteur: ${ebook.auteur}</p>
                <p>Prix: ${ebook.prix}</p>
                <button onclick="acheter()">Acheter</button>
            </div>
        </div>
        <h3>Résumé</h3>
        <p>${ebook.resume}</p>
        <h3>À propos du livre</h3>
        <p>Pages: ${ebook.pages} | Heures: ${ebook.heures} | Mots: ${ebook.mots}</p>
        <h3>Avis et critiques</h3>
        <div id="reviews"></div>
        <h4>Rédiger un avis</h4>
        <input type="text" id="reviewName" placeholder="Votre nom">
        <textarea id="reviewText" placeholder="Votre avis"></textarea>
        <input type="number" id="reviewNote" min="1" max="5" placeholder="Note /5">
        <button onclick="addReview()">Envoyer avis</button>
    `;
    loadReviews();
}

// Acheter (simuler)
function acheter() {
    alert("Formulaire d'achat à intégrer avec Wave / Orange Money");
}

// Avis en localStorage
function addReview() {
    const id = localStorage.getItem("currentEbookId");
    const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    const name = document.getElementById("reviewName").value;
    const text = document.getElementById("reviewText").value;
    const note = document.getElementById("reviewNote").value;
    reviews.push({id, name, text, note});
    localStorage.setItem("reviews", JSON.stringify(reviews));
    loadReviews();
}

function loadReviews() {
    const id = localStorage.getItem("currentEbookId");
    const reviews = JSON.parse(localStorage.getItem("reviews") || "[]");
    const container = document.getElementById("reviews");
    container.innerHTML = "";
    reviews.filter(r => r.id == id).forEach(r => {
        const div = document.createElement("div");
        div.innerHTML = `<strong>${r.name}</strong> (${r.note}★) <p>${r.text}</p>`;
        container.appendChild(div);
    });
}

// Initialisation
if (document.getElementById("ebooksContainer")) displayEbooks(ebooks);
if (document.getElementById("ebookDetail")) displayEbookDetail();