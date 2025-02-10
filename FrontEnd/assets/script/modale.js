//fonction pour ouvrir modale
const openModal = function(modal) {
    
    modal.style.display = "flex";
    modal.removeAttribute("aria-hidden");
    modal.setAttribute("aria-modal", "true");
}

// evenement pour appeler la fonction qui va ouvrir la modale 
const modaleModifier = document.querySelector(".js-modal");
modaleModifier.addEventListener("click", function(event) {
    event.preventDefault();
    const target = document.querySelector(event.target.getAttribute("href"));
    openModal(target);
});

//fonction pour fermer la modale 

const closeModal = function(event) {
    const modal = event.target.closest(".modal");
    if (modal) {
        if (!event.target.closest(".modal-wrapper") || event.target.classList.contains("close-modal"))  {
        modal.style.display = "none";
        modal.setAttribute("aria-hidden", "true");
        modal.removeAttribute("aria-modal");
    }
};
}
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
addPhotoBtn.addEventListener("click", function() {
    // Fermer la première modale
    closeModal({ target: document.querySelector("#modal1") });

    // Ouvrir la seconde modale
    const modal2 = document.querySelector("#modal2");
    openModal(modal2);
});


// fonction retour modal 2

const returnModal = document.querySelector("#returnModal");
returnModal.addEventListener("click", function() {
    
    closeModal({target: document.querySelector("#modal2")});

    const modal1 = document.querySelector("#modal1");
    openModal(modal1);
});