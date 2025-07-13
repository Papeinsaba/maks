let panier = [];
let total = 0;

// ✅ Ajouter un article au panier
function ajouterAuPanier(nom, prix, imageUrl) {
  panier.push({ nom, prix, image: imageUrl });
  total += prix; // Ajoute le prix au total
  mettreAJourQuantite();
  afficherPanier();
  showToast(`${nom} ajouté au panier !`);
}

// ✅ Afficher le panier (et le toggle s'il est déjà affiché)
function afficherPanier() {
  const panierBox = document.getElementById("panier");

  // Si déjà visible, on le masque
  if (panierBox.style.display === "block") {
    panierBox.style.display = "none";
    return;
  }

  let liste = document.getElementById("liste-panier");
  liste.innerHTML = "";

  panier.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.nom}</strong> - ${item.prix} FCFA
      <button onclick="supprimerDuPanier(${index})">❌</button>
    `;
    liste.appendChild(li);
  });

  document.getElementById("total").innerText = total;
  panierBox.style.display = "block";
}

// ✅ Supprimer un article du panier
function supprimerDuPanier(index) {
  total -= panier[index].prix;
  panier.splice(index, 1);
  mettreAJourQuantite();
  afficherPanier();
}

// ✅ Vider le panier
function viderPanier() {
  panier = [];
  total = 0;
  mettreAJourQuantite();
  afficherPanier();
}

// ✅ Valider la commande sur WhatsApp
function validerCommande() {
  if (panier.length === 0) {
    showToast("Votre panier est vide.");
    return;
  }

  let message = "Bonjour, je souhaite commander :%0A%0A";

  panier.forEach(item => {
    let fullImageUrl = "";
    if (item.image) {
      fullImageUrl = window.location.origin + "/" + encodeURIComponent(item.image);
      message += `🛍️ ${item.nom} - ${item.prix.toLocaleString()} FCFA%0A🖼️ Image : ${fullImageUrl}%0A%0A`;
    } else {
      message += `🛍️ ${item.nom} - ${item.prix.toLocaleString()} FCFA%0A%0A`;
    }
  });

  message += `💰 Total : ${total.toLocaleString()} FCFA%0A📍 Livraison à discuter.`;
  // Ouvre WhatsApp avec le message pré-rempli
  window.open("https://wa.me/221777324694?text=" + encodeURIComponent(message));
}

// ✅ Toast (petit message flottant)
function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ✅ Fermer le panier
function fermerPanier() {
  document.getElementById("panier").style.display = "none";
}

// ✅ Mise à jour du badge panier
function mettreAJourQuantite() {
  const quantiteSpan = document.getElementById("quantite");
  quantiteSpan.innerText = panier.length;

  if (panier.length > 0) {
    quantiteSpan.classList.add("badge");
  } else {
    quantiteSpan.classList.remove("badge");
  }
}
