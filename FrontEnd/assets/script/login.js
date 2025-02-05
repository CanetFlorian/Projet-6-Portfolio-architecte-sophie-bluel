async function connexionUser() {
    const formulaireLogin = document.querySelector(".formulaire-login");
    const messageErreur = document.querySelector("#message-erreur");


    formulaireLogin.addEventListener("submit", async function (event) {

        event.preventDefault();

        const logUser = {
            email: event.target.querySelector("[name=email]").value,
            password: event.target.querySelector("[name=motDePasse]").value
        };
        const chargeUtile = JSON.stringify(logUser);

        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: chargeUtile
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log("Connexion réussie");
                console.log("User ID", data.userId);
                console.log("Token", data.token);
                messageErreur.textContent = "";
                

                // enregistrement du token dans le localstorage
                localStorage.setItem("cléToken", data.token);

                // redirection vers la page d'accueil
                window.location.href ="index.html";
                
            }

            else if (response.status === 404) {
                const errorData = await response.json();
                messageErreur.textContent = "Utilisateur introuvable"
            }

            else if (response.status === 401) {
                messageErreur.textContent = "Utilisateur non autorisé"
            }


        } catch (error) {
            console.error("Erreur lors de la requête: ", error);
            messageErreur.textContent = "Erreur réseau. Veuillez réessayer."
        }

    });
}

connexionUser();


 