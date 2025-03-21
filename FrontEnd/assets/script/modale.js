
//fonction pour ouvrir modale
const openModal = function (modal) {

    modal.style.display = "flex";
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
}

// evenement pour appeler la fonction qui va ouvrir la modale 

const modifierBtn = document.querySelector("#modifierBtn");


modifierBtn.addEventListener("click", function () {
    const targetModal = document.querySelector("#modal1");
    openModal(targetModal);
});

//fonction pour fermer la modale 

const closeModal = function (event) {
    const modal = event.target.closest(".modal");
    if (modal) {
        if (!event.target.closest(".modal-wrapper") || event.target.classList.contains("close-modal") ) {
            modal.style.display = "none";
            modal.setAttribute("aria-hidden", "true");
            modal.removeAttribute("aria-modal");
        }
    };
}
//



//evenement pour appeler la fonction qui va fermer la modale au clic sur la X 

const modaleCloseCroix = document.querySelectorAll(".close-modal");
modaleCloseCroix.forEach(button => {
    button.addEventListener("click", closeModal);
});


// evenement pour appeler la fonction qui va fermer la modale au clic en dehors

const modaleCloseOut = document.querySelectorAll(".modal");
modaleCloseOut.forEach(modal => {
    modal.addEventListener("click", closeModal);
});


// fonction pour ouvrir la 2nd modale

const addPhotoBtn = document.querySelector("#addPhotoBtn");
addPhotoBtn.addEventListener("click", function () {
    // Fermer la première modale
    closeModal({ target: document.querySelector("#modal1") });

    // Ouvrir la seconde modale
    const modal2 = document.querySelector("#modal2");
    openModal(modal2);
    const addPhotoBtnModal2 = document.getElementById("addPhotoBtnModal2");
    const inputPhoto = document.getElementById("inputPhoto");
    const previewImage = document.getElementById("previewImage");
    const iconePhoto = document.getElementById("iconePhoto");
    const taillePhoto = document.querySelector(".taillePhoto");



    previewImage.style.display = "none";
    iconePhoto.style.display = "block";
    addPhotoBtnModal2.style.display = "block";
    taillePhoto.style.display = "block";

    verifierChamps();
});


// fonction retour modal 2

const returnModal = document.querySelector("#returnModal");
returnModal.addEventListener("click", function () {

    closeModal({ target: document.querySelector("#modal2") });

    const modal1 = document.querySelector("#modal1");
    openModal(modal1);
});

// Ajout photo modale 2 

const addPhotoBtnModal2 = document.getElementById("addPhotoBtnModal2");
const inputPhoto = document.getElementById("inputPhoto");
const previewImage = document.getElementById("previewImage");
const iconePhoto = document.getElementById("iconePhoto");
const taillePhoto = document.querySelector(".taillePhoto");
const inputTitrePhoto = document.getElementById("inputTitrePhoto");
const validerAjoutPhotoBtn = document.getElementById("validerAjoutPhotoBtn");




previewImage.style.display = "none";
iconePhoto.style.display = "block";
addPhotoBtnModal2.style.display = "block";
taillePhoto.style.display = "block";


addPhotoBtnModal2.addEventListener("click", () => {
    inputPhoto.click();
verifierChamps();
});

inputPhoto.addEventListener("change", (event) => {
    //création d'une variable pour récupéré le fichier séléctionné 
    const file = event.target.files[0];

    if (file) {
        // Si il y a un fichier de sélect alors on crée une variable pour lire le fichier
        const reader = new FileReader();

        // onload nous permet de continué une fois que l'image a été lu
        reader.onload = (event) => {
            previewImage.src = event.target.result;
            previewImage.style.display = "block";

            iconePhoto.style.display = "none";
            addPhotoBtnModal2.style.display = "none";
            taillePhoto.style.display = "none";
            verifierChamps();
        };
        // puis on se sert de readAsDataUrl afin de convertir le fichier en une chaine de caractère  qui sera utilisé pour afficher l'image
        reader.readAsDataURL(file);

    }
})


// Envoi données projet vers api 

validerAjoutPhotoBtn.addEventListener("click", async () => {
    const titreProjet = inputTitrePhoto.value;
    const categorieId = window.categorieSelect.value;
    const fichierImage = inputPhoto.files[0];
    console.log(window.categorieSelect)
    if ( (titreProjet === '' || categorieId === '' || !fichierImage) ) {

        
        alert("Veuillez renseigner tous les champs !");
       
        
        return;
        
    }

    else {

   

    const formDataProjet = new FormData();
    formDataProjet.append("title", titreProjet);
    formDataProjet.append("category", categorieId);
    formDataProjet.append("image", fichierImage);

    const token = localStorage.getItem("cléToken")

    try {
        const reponseProjet = await fetch(`http://localhost:5678/api/works`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`  // Ajout du token dans l'en-tête
            },
            body: formDataProjet,

        });

        if (reponseProjet.status === 201) {
            const nouveauProjet = await reponseProjet.json();
            console.log("Projet ajouté avec succées" , nouveauProjet);

            window.works.push(nouveauProjet);
            genererWorks(window.works);
            genererWorksGalerie(window.works);

            inputPhoto.value = '';
            inputTitrePhoto.value = '';
            window.categorieSelect.value = '';
        
            previewImage.style.display = "none" ; 
            previewImage.src = '';
            iconePhoto.style.display = "block"; 
            addPhotoBtnModal2.style.display = "block"; 
            taillePhoto.style.display = "block"; 

            verifierChamps()
        } else if (reponseProjet.status ===400) {
            alert("Mauvaise requête");
        } else if (reponseProjet.status === 401) {
            alert("Non autorisé");
        } else if (reponseProjet.status === 500) {
            alert("Erreur inattendue");
        }
    } catch (error) {
        console.error("Erreur lors de la requete", error)
        alert("Erreur résaux. Veuillez réessayer.")
    }
}

});



// supression projet 

const sectionProjetGalerie = document.querySelector(".gallery2");

sectionProjetGalerie.addEventListener("click", async function(event) {
    // on vérifie si l'élément cliqué est la corbeille
    if (event.target.classList.contains("deleteIcon")) {
        event.preventDefault();
        
        // puis on récup l'id du projet qu'on veut suppr via data-id
        const projetId = event.target.closest('figure').getAttribute('data-id');
        console.log("ID du projet à supprimer : ", projetId);

        const figureElement = event.target.closest('figure');
        figureElement.remove();

       

        const token = localStorage.getItem("cléToken");

        try {
            const reponseDelete = await fetch(`http://localhost:5678/api/works/${projetId}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            console.log('Réponse de la suppression', reponseDelete.status);

            if (reponseDelete.status === 204) {
                window.works = window.works.filter(projet => projet.id !== parseInt(projetId));
                genererWorks(window.works);
                genererWorksGalerie(window.works);
                alert("Projet supprimé avec succès");

                
            } else if (reponseDelete.status === 401) {
                alert("Non autorisé");
            } else if (reponseDelete.status === 500) {
                alert("Comportement inattendu")
            }
        } catch (error) {
            console.error("Erreur lors de la requête DELETE:", error);
            alert("Erreur résaux. Veuillez réessayer.");
        }
    }
});
window.categorieSelect = document.getElementById("categorie-select");
function verifierChamps() {
    const titreProjet = inputTitrePhoto.value;
    const categorieId = window.categorieSelect.value;
    const fichierImage = inputPhoto.files[0];
 


    if (titreProjet !== '' && categorieId !== '' && categorieId !== 'Sélectionner la catégorie' && fichierImage) {
        
        validerAjoutPhotoBtn.disabled = false;
        validerAjoutPhotoBtn.style.backgroundColor = "#1D6154"; 
    } else {
      
        validerAjoutPhotoBtn.disabled = true;
        validerAjoutPhotoBtn.style.backgroundColor = ""; 
    }
}

inputTitrePhoto.addEventListener("input", verifierChamps);
window.categorieSelect.addEventListener("change", verifierChamps);
inputPhoto.addEventListener("change", verifierChamps);


document.addEventListener("DOMContentLoaded", verifierChamps);