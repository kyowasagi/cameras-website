// Tableau 
let panier = JSON.parse(localStorage.getItem('panier')) || [];

function ajouterAuPanier(idProduit) {
    const produits = [
        { id: 1, nom: "Canon EOS 4000D Camera with 18-55mm Lens", prix: 85000, image: "image/Canon EOS 4000D Camera with 18-55mm Lens.jpg" },
        { id: 2, nom: "Canon EOS M50 Mark II Mirrorless Camera with ( 15-45mm IS STM )", prix: 135000, image: "image/Canon EOS M50 Mark II Mirrorless Camera with ( 15-45mm IS STM ).jpg" },
        { id: 3, nom: "Canon EOS M200 Compact Mirrorless Camera with ( 15-45mm IS STM )", prix: 92000, image: "image/Canon EOS M200 Compact Mirrorless Camera with ( 15-45mm IS STM ).jpg" },
        { id: 4, nom: "Nikon D7500 DSLR Camera with 18-140mm Lens", prix: 249000, image: "image/Nikon D7500 DSLR Camera with 18-140mm Lens.jpg" },
        { id: 5, nom: "Sony FE 24-240mm f3.5-6.3 OSS Lens", prix: 435000, image: "image/Sony FE 24-240mm f3.5-6.3 OSS Lens.jpg" },
        { id: 6, nom: "Sony FE 200-600mm f5.6-6.3 G OSS Lens", prix: 145000, image: "image/Sony FE 200-600mm f5.6-6.3 G OSS Lens.jpg" },
        { id: 7, nom: "Zhiyun CRANE 2S PRO", prix: 124000, image: "image/Zhiyun CRANE 2S PRO.jpg" },
        { id: 8, nom: "Zhiyun CRANE 2S", prix: 87000, image: "image/Zhiyun CRANE 2S.jpg" }
    ];
    
    const produit = produits.find(p => p.id === idProduit);
    if (produit) {
        const produitExistant = panier.find(p => p.id === idProduit);  
        if (!produitExistant) {
            panier.push(produit);

            localStorage.setItem('panier', JSON.stringify(panier));
            alert(`${produit.nom} a été ajouté à votre panier`);
            mettreAJourPanier();
        } else {
            alert('Ce produit est déjà dans votre panier');
        }
    }
}
// mise a jour panier
function mettreAJourPanier() {
    const contenuPanier = document.getElementById('articles-panier');
    const totalElement = document.getElementById('total');
    
    if (!contenuPanier) return;
    
    if (panier.length === 0) {
        contenuPanier.innerHTML = '<p>Votre panier est vide</p>';
        if (totalElement) totalElement.textContent = '0,00';
        return;
    }
    
    let html = '<table class="tableau-panier"><tr><th>Image</th><th>Produit</th><th>Prix</th><th>Action</th></tr>';
    let total = 0;
    
    panier.forEach((produit, index) => {
        total += produit.prix;
        
        html += `
            <tr>
                <td><img src="${produit.image}" alt="${produit.nom}" class="image-panier"></td>
                <td>${produit.nom}</td>
                <td>${produit.prix.toFixed(2)}DZD</td>
                <td><button onclick="supprimerProduit(${index})">Supprimer</button></td>
            </tr>
        `;
    });
    
    html += '</table>';
    contenuPanier.innerHTML = html;
    if (totalElement) totalElement.textContent = total.toFixed(2);
}


function supprimerProduit(index) {
    panier.splice(index, 1);
    localStorage.setItem('panier', JSON.stringify(panier));
    mettreAJourPanier();
}

function validerCommande() {
    if (panier.length === 0) {
        alert('Votre panier est vide');
        return;
    }
    
    window.location.href = 'login.html';
}

function validerConnexion() {
    alert('Connexion réussie');
    return false;
}

function validerInscription() {
    const motDePasse = document.getElementById('mp').value;
    const confirmation = document.getElementById('cmp').value;
    
    if (motDePasse !== confirmation) {
        alert('Les mots de passe ne correspondent pas');
        return false;
    }
    
    alert('Inscription réussie');
    window.location.href = 'login.html';
    
}
//chargement de contenu
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('panier.html')) {
        mettreAJourPanier();
    }
});