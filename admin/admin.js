const form = document.querySelector('#addPizzaForm');
const successToast = document.querySelector('#success-toast');
const pizzaTableBody = document.querySelector("#pizzaTableBody");
const pizzaRowTemplate = document.querySelector("#pizzaRowTemplate");

function refreshPizzaList() {
  // Efface la liste existante
  pizzaTableBody.innerHTML = '';

  // Requête AJAX pour récupérer les données de pizzas depuis le serveur backend
  fetch("http://localhost:8888/projet_fil_rouge/api/get_pizzas.php")
    .then(response => response.json())
    .then(pizzas => {
      // Pour chaque pizza, cloner le template et mettre à jour les informations
      pizzas.forEach(pizza => {
        
        // Clone le template
        const pizzaElement = pizzaRowTemplate.content.cloneNode(true);

        // Met à jour les informations de la pizza
        pizzaElement.querySelector(".pizza-name").textContent = pizza.name;
        pizzaElement.querySelector(".ingredients").textContent = pizza.ingredients;
        pizzaElement.querySelector(".price").textContent = pizza.price;
        pizzaElement.querySelector(".pizza-thumbnail").src = "data:image/png;base64," + pizza.image;

        // Ajoute la pizza à la section de pizzas
        pizzaTableBody.appendChild(pizzaElement);
      });
    })
    .catch(error => {
      console.error("Erreur lors de la récupération des pizzas :", error);
    });
}

// Appelle la fonction pour la première fois pour afficher la liste de pizzas existante
refreshPizzaList();

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formData = new FormData(form);

  if (!validateForm(formData)) {
    return;
  }

  axios.post('http://localhost:8888/projet_fil_rouge/api/add_pizzas.php', formData)
    .then((response) => {
      console.log(response.data);
      if (response.data.status === 'success') {
        const toast = new bootstrap.Toast(successToast);
        toast.show();
        form.reset();

        // Si l'ajout de pizza a réussi, rafraîchit la liste de pizzas
        refreshPizzaList();
      }
    })
    .catch((error) => {
      console.error(error);

      const errorToast = document.querySelector('#error-toast');
      errorToast.querySelector('.toast-body').textContent = 'Une erreur s\'est produite lors de l\'ajout de la pizza. Veuillez vérifier vos données.';
      const toast = new bootstrap.Toast(errorToast);
      toast.show();
    });
});

// Fonction pour le toast d'erreur
function validateForm(formData) {
  if (formData.get('name') === '' || formData.get('ingredients') === '' || formData.get('price') === '') {
    const errorToast = document.querySelector('#error-toast');
    errorToast.querySelector('.toast-body').textContent = 'Veuillez remplir tous les champs.';
    const toast = new bootstrap.Toast(errorToast);
    toast.show();
    return false;
  }
  return true;
}




// UPDATE / DELETE



// // Gestionnaire d'événement pour le bouton "Modifier"
// pizzaTableBody.addEventListener('click', (e) => {
//   if (e.target.classList.contains('btn-edit')) {
//     const pizzaRow = e.target.closest('tr');
//     const pizzaId = pizzaRow.dataset.id;
//     const pizzaName = pizzaRow.querySelector('.pizza-name').textContent;
//     const pizzaIngredients = pizzaRow.querySelector('.ingredients').textContent;
//     const pizzaPrice = pizzaRow.querySelector('.price').textContent;
//     const pizzaImage = pizzaRow.querySelector('.pizza-thumbnail').src;

//     // Pré-remplir le formulaire de modification
//     const editForm = document.querySelector('#editPizzaForm');
//     editForm.querySelector('#editPizzaId').value = pizzaId;
//     editForm.querySelector('#editPizzaName').value = pizzaName;
//     editForm.querySelector('#editPizzaIngredients').value = pizzaIngredients;
//     editForm.querySelector('#editPizzaPrice').value = pizzaPrice;
//     // Réglez l'aperçu de l'image (si nécessaire)
//     // editForm.querySelector('#editPizzaImagePreview').src = pizzaImage;

//     // Afficher la fenêtre modale de modification
//     const editModal = new bootstrap.Modal(document.querySelector('#editPizzaModal'));
//     editModal.show();
//   }
// });

// // Gestionnaire d'événement pour le formulaire de modification
// document.querySelector('#editPizzaForm').addEventListener('submit', (e) => {
//   e.preventDefault();

//   const editForm = e.target;
//   const formData = new FormData(editForm);

//   if (!validateEditForm(formData)) {
//     return;
//   }

//   axios.post('http://localhost:8888/projet_fil_rouge/api/update_pizzas.php', formData)
//     .then((response) => {
//       console.log(response.data);
//       if (response.data.status === 'success') {
//         const toast = new bootstrap.Toast(document.querySelector('#success-toast'));
//         toast.show();

//         // Fermer la fenêtre modale
//         const editModal = new bootstrap.Modal(document.querySelector('#editPizzaModal'));
//         editModal.hide();

//         // Rafraîchir la liste de pizzas
//         refreshPizzaList();
//       } else {
//         const errorToast = new bootstrap.Toast(document.querySelector('#error-toast'));
//         errorToast.show();
//       }
//     })
//     .catch((error) => {
//       console.error(error);

//       const errorToast = new bootstrap.Toast(document.querySelector('#error-toast'));
//       errorToast.show();
//     });
// });

// // Gestionnaire d'événement pour le bouton "Supprimer"
// pizzaTableBody.addEventListener('click', (e) => {
//   if (e.target.classList.contains('btn-delete')) {
//     const pizzaRow = e.target.closest('tr');
//     const pizzaId = pizzaRow.dataset.id;

//     if (confirm('Êtes-vous sûr de vouloir supprimer cette pizza ?')) {
//       axios.post('http://localhost:8888/projet_fil_rouge/api/delete_pizzas.php', { id: parseInt(pizzaId) })
//         .then((response) => {
//           console.log(response.data);
//           if (response.data.status === 'success') {
//             const toast = new bootstrap.Toast(document.querySelector('#success-toast'));
//             toast.show();

//             // Rafraîchir la liste de pizzas
//             refreshPizzaList();
//           } else {
//             const errorToast = new bootstrap.Toast(document.querySelector('#error-toast'));
//             errorToast.show();
//           }
//         })
//         .catch((error) => {
//           console.error(error);

//           const errorToast = new bootstrap.Toast(document.querySelector('#error-toast'));
//           errorToast.show();
//         });
//     }
//   }
// });

// // Fonction pour valider le formulaire de modification
// function validateEditForm(formData) {
//   // Ajoutez vos validations ici si nécessaire
//   return true;
// }




// function loadOrders() {
//   let orderTable = document.getElementById("orderTable");
//   orderTable.innerHTML = "";

//   axios.get('http://localhost:8888/projet_fil_rouge/api/get.php')
//       .then(function(response) {
//           let orders = response.data;

//           for (let i = 0; i < orders.length; i++) {
//               let order = orders[i];

//               let row = document.createElement("tr");
//               let dateCell = document.createElement("td");
//               dateCell.textContent = order.date;
//               let typeCell = document.createElement("td");
//               typeCell.textContent = order.type;
//               let quantityCell = document.createElement("td");
//               quantityCell.textContent = order.quantity;

//               row.appendChild(dateCell);
//               row.appendChild(typeCell);
//               row.appendChild(quantityCell);

//               orderTable.appendChild(row);
//           }
//       })
//       .catch(function(error) {
//           console.error(error);
//       });
// }

// loadOrders();