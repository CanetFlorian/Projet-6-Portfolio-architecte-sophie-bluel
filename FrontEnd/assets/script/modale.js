//fonction pour ouvrir modale
const openModal = function(event) {
    event.preventDefault();

    const target = document.querySelector(event.target.getAttribute("href"));
    target.style.display = "flex";
    target.removeAttribute("aria-hidden");
    target.setAttribute("aria-modal", "true");
}

// evenement pour appeler la fonction qui va ouvrir la modale 
const modaleModifier = document.querySelector(".js-modal");
modaleModifier.addEventListener("click", openModal);

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

const modaleCloseCroix = document.querySelector(".close-modal");
modaleCloseCroix.addEventListener("click", closeModal);

// evenement pour appeler la fonction qui va fermer la modale au clic en dehors

const modaleCloseOut = document.querySelector(".modal");
modaleCloseOut.addEventListener("click", closeModal);