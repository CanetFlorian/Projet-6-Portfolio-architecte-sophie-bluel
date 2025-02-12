

window.addEventListener("DOMContentLoaded", async () => {

    const reponse = await fetch(`http://localhost:5678/api/works`);
    const works = await reponse.json();

    window.works = works;

    // récupération des catégories

    const reponseCategories = await fetch(`http://localhost:5678/api/categories`);
    const categories = await reponseCategories.json();

    const categorieSelect = document.getElementById("categorie-select");

    categories.forEach(category => {
        const option = document.createElement("option")
        option.value = category.id
        option.textContent = category.name
        
        categorieSelect.appendChild(option);
    });

    window.categorieSelect = categorieSelect



    const loginLogout = document.querySelector("#loginLogoutLien");
    const modifierBtn = document.querySelector("#modifierBtn");
    const filtres = document.querySelector(".filtres");

    // vérif tokken dans localstorage

    const token = localStorage.getItem("cléToken");



    if (token) {
        loginLogout.textContent = "Logout";
        filtres.style.display = "none";
        modifierBtn.style.display = "flex";

        loginLogout.addEventListener("click", () => {
            localStorage.removeItem("cléToken");

        });
    } else {

        loginLogout.textContent = "Login";
        filtres.style.display = "flex";
        modifierBtn.style.display = "none";
    };


    //Génération des projets via API

    function genererWorks(works) {
        const sectionProjet = document.querySelector(".gallery");
        sectionProjet.innerHTML = "";

        for (let i = 0; i < works.length; i++) {
            const projet = works[i];
            const articleProjet = document.createElement("figure");



            const imageElement = document.createElement("img");
            imageElement.src = projet.imageUrl;
            const nomElement = document.createElement("figcaption");
            nomElement.textContent = projet.title;



            sectionProjet.appendChild(articleProjet);
            articleProjet.appendChild(imageElement);
            articleProjet.appendChild(nomElement);

        }
    window.genererWorks = genererWorks;
    }

    genererWorks(works);

    // génération galerie modale

    function genererWorksGalerie(works) {
        const sectionProjetGalerie = document.querySelector(".gallery2");

        for (let i = 0; i < works.length; i++) {
            const projetGalerie = works[i];
            const articleProjetGalerie = document.createElement("figure")
            articleProjetGalerie.setAttribute("data-id", projetGalerie.id);
           
            const imageElementGalerie = document.createElement("img");
            imageElementGalerie.src = projetGalerie.imageUrl;
            // Créer l'icône de la corbeille
            const deleteIcon = document.createElement('i');
            deleteIcon.classList.add('fa-solid', 'fa-trash-can', 'fa-sm');
            deleteIcon.classList.add('delete-photo');
            deleteIcon.classList.add('deleteIcon');


            articleProjetGalerie.appendChild(imageElementGalerie);
            articleProjetGalerie.appendChild(deleteIcon);

            sectionProjetGalerie.appendChild(articleProjetGalerie);
        }
    }
    genererWorksGalerie(works);
    // création des boutons de filtres

    const conteneurFiltres = document.querySelector(".filtres");
    conteneurFiltres.classList.add("filtres")

    const buttonTous = document.createElement("button");
    buttonTous.textContent = "Tous";
    buttonTous.classList.add("filtresButton");


    const buttonObjets = document.createElement("button");
    buttonObjets.textContent = "Objets"
    buttonObjets.classList.add("filtresButton");

    const buttonAppartements = document.createElement("button");
    buttonAppartements.textContent = "Appartements";
    buttonAppartements.classList.add("filtresButton");

    const buttonHotel = document.createElement("button");
    buttonHotel.textContent = "Hotels & restaurants";
    buttonHotel.classList.add("filtresButton");



    conteneurFiltres.appendChild(buttonTous);
    conteneurFiltres.appendChild(buttonObjets);
    conteneurFiltres.appendChild(buttonAppartements);
    conteneurFiltres.appendChild(buttonHotel);

    // création fonction pour filtrer

    function filtrerParCategorie(categorieId) {
        let projetsFiltres
        if (categorieId === "all") {
            projetsFiltres = works;
        } else {
            projetsFiltres = works.filter(projet => projet.categoryId === categorieId);
        }
        genererWorks(projetsFiltres);
    }

    // mise en place des eventlistener sur les bouttons filtres

    buttonTous.addEventListener("click", function () {
        filtrerParCategorie("all");
    })

    buttonObjets.addEventListener("click", function () {
        filtrerParCategorie(1);
    })

    buttonAppartements.addEventListener("click", function () {
        filtrerParCategorie(2);
    })

    buttonHotel.addEventListener("click", function () {
        filtrerParCategorie(3);
    })


    

});



