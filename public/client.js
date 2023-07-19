// --------------------CUSTOM CURSOR----------------------

const cursor = document.getElementById('cursor');
const cursorStyle = cursor.style;

document.addEventListener('mousemove', e => {
  window.requestAnimationFrame(() => {
    cursorStyle.top = `${ e.clientY - cursor.offsetHeight/2 }px`;
    cursorStyle.left = `${ e.clientX - cursor.offsetWidth/2 }px`;
  });
});


// --------------------MENU BURGER----------------------









// --------------SYSTEME DE TABS DYNAMIQUES---------------------

// Sélectionne les onglets et la section "carte"
const tabs = document.querySelectorAll('.tab');
const carteSection = document.getElementById('carte');
const contents = document.querySelectorAll('.content');

// Variable pour stocker l'onglet actif
let activeTab = document.querySelector('.tab.active');

// Itere sur chaque onglet et ajoutez un gestionnaire d'événements
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.target;

    if (tab !== activeTab) {

      // Réinitialise les styles de couleur pour tous les onglets
      tabs.forEach(tab => {
        tab.style.color = '';
      });

      // Met à jour le style de couleur selon l'onglet
      if (target === 'plats') {
        tabs.forEach(tab => {
          tab.style.color = 'brown';
        });
        carteSection.style.backgroundColor = "#e2ded3";
        document.querySelector('.pizzaLeft').style.display = 'none';
        document.querySelector('.pizzaRight').style.display = 'none';
      } else if (target === 'boissons') {
        tabs.forEach(tab => {
          tab.style.color = '#186D67';
        });
        carteSection.style.backgroundColor = "#9DDBD6";
        document.querySelector('.pizzaLeft').style.display = 'none';
        document.querySelector('.pizzaRight').style.display = 'none';
      } else {
        carteSection.style.backgroundColor = '';
        document.querySelector('.pizzaLeft').style.display = 'flex';
        document.querySelector('.pizzaRight').style.display = 'flex';
      }

      

      // Met à jour l'onglet actif après un court délai
      setTimeout(() => {
        contents.forEach(content => {
          content.classList.remove('active');
        });

        const newActiveContent = document.querySelector(`.${target}`);
        newActiveContent.classList.add('active');

        // Applique une opacité de 0 pour le contenu actif
        const activeContent = document.querySelector('.content.active');
        activeContent.style.opacity = 0;

        // Déclenche la transition en passant à une opacité de 1 après un court délai
        setTimeout(() => {
          newActiveContent.style.opacity = 1;
        }, 10);
      }, 300); // Attend la fin de la transition de l'onglet précédent (300 ms)

      // Met à jour l'onglet actif
      activeTab.classList.remove('active');
      tab.classList.add('active');
      activeTab = tab;
    }
  });
});





// ---------------RECUPERATION ET AFFICHAGE DES DONNEES------------------

// Sélectionne la section qui contiendra les infos pizzas
const pizzaSectionLeft = document.querySelector(".pizzaLeft");

// Récupère le template de pizza
const pizzaInfoTemplate = document.querySelector("#pizza-info-template");

// Récupère la section qui contiendra les images des pizzas
const pizzaSectionRight = document.querySelector(".pizzaRight");

// Récupère le template de l'image de pizza
const pizzaImgTemplate = document.querySelector("#pizza-img-template");

// Variable pour stocker la référence de l'image active
let activePizzaImage = null;
let activePizzaPrice = null;

// Requête AJAX pour récupérer les données de pizzas depuis le serveur backend
fetch("http://localhost:8888/projet_fil_rouge/api/get_pizzas.php")
  .then(response => response.json())
  .then(pizzas => {
    // Pour chaque pizza, cloner le template et mettre à jour les informations
    pizzas.forEach(pizza => {
      // Clone le template d'info de pizza
      const pizzaInfoElement = pizzaInfoTemplate.content.cloneNode(true);

      // Met à jour les informations de la pizza
      pizzaInfoElement.querySelector(".pizza-name").textContent = pizza.name;
      pizzaInfoElement.querySelector(".ingredients").textContent = pizza.ingredients;

      // Ajoute le gestionnaire d'événement de survol
      pizzaInfoElement.querySelector(".pizza-info").addEventListener('mouseover', () => {
        // Affiche l'image de la pizza survolée
        showPizzaImage(pizza.image);
        // Affiche le prix de la pizza survolée
        showPizzaPrice(pizza.price);
      });

      pizzaInfoElement.querySelector(".pizza-info").addEventListener('mouseout', () => {
        // Masque l'image et le prix de la pizza survolée
        hidePizzaInfo();
      });

      // Ajoute la pizza à la section de pizzas
      pizzaSectionLeft.appendChild(pizzaInfoElement);
    });
  })
  .catch(error => {
    console.error("Erreur lors de la récupération des pizzas :", error);
  });




// ---------------FONCTIONS D'AFFICHAGE / MASQUAGE------------------


// Fonction pour afficher l'image de la pizza survolée
function showPizzaImage(image) {
  // Crée un élément d'image pour la pizza survolée
  const pizzaImgElement = pizzaImgTemplate.content.cloneNode(true);
  pizzaImgElement.querySelector("img").src = "data:image/png;base64," + image;

  // Affiche l'image de la pizza dans la section de droite
  pizzaSectionRight.innerHTML = "";
  pizzaSectionRight.appendChild(pizzaImgElement);

  // Stocke la référence de l'image active
  activePizzaImage = pizzaImgElement;
}

// Fonction pour afficher le prix de la pizza survolée
function showPizzaPrice(price) {
  // Crée un élément de div pour le prix de la pizza
  const pizzaPriceElement = document.createElement("div");
  pizzaPriceElement.classList.add("pizzaPrice");
  pizzaPriceElement.innerHTML = price + "&euro;";

  // Affiche le prix de la pizza dans la section de droite
  pizzaSectionRight.appendChild(pizzaPriceElement);

  // Stocke la référence du prix actif
  activePizzaPrice = pizzaPriceElement;
}

// Fonction pour masquer l'image et le prix de la pizza survolée
function hidePizzaInfo() {
  if (activePizzaImage) {
    pizzaSectionRight.innerHTML = "";
    activePizzaImage = null;
  }

  if (activePizzaPrice) {
    pizzaSectionRight.removeChild(activePizzaPrice);
    activePizzaPrice = null;
  }
}







// document.getElementById("orderForm").addEventListener("submit", function(event) {
//   event.preventDefault();

//   let pizzaType = document.getElementById("pizzaType").value;
//   let quantity = document.getElementById("quantity").value;

//   let formData = new FormData();
//   formData.append("pizzaType", pizzaType);
//   formData.append("quantity", quantity);

//   axios.post('http://localhost:8888/projet_fil_rouge/api/add_orders.php', formData)
//       .then(function(response) {
//           console.log(response.data);
//           // Afficher un message de confirmation ou rediriger l'utilisateur vers une autre page
//       })
//       .catch(function(error) {
//           console.error(error);
//       });

//   document.getElementById("pizzaType").value = "";
//   document.getElementById("quantity").value = "";
// });
