const reponse = await fetch (`http://localhost:5678/api/works`);
const works = await reponse.json();

function genererWorks(works) {
    for(let i = 0; i < works.length; i++) {
        const projet = works[i];
        const sectionProjet = document.querySelector(".gallery");
        const articleProjet = document.createElement("figure");
        
    
        
        const imageElement = document.createElement("img");
        imageElement.src = projet.imageUrl;
        const nomElement = document.createElement("figcaption");
        nomElement.textContent = projet.title;

        sectionProjet.appendChild(articleProjet);
        articleProjet.appendChild(imageElement);
        articleProjet.appendChild(nomElement);
    }
}

genererWorks(works);