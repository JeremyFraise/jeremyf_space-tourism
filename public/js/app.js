const app = {

    body: document.querySelector("body"),
    arrSections: document.querySelectorAll(".section"),
    arrDestinations: new Array(),

    init: function() {
        this.arrSections.forEach(section => {
            if(section.id != "home"){
                section.classList.add("cacher");
            }
        });
        // Entete
        document.querySelectorAll(".btnEntete").forEach(element => {
            element.addEventListener("click",() => this.changerEtat(element.id.replace("entete__", "")));
        }); 
        // Home
        document.getElementById("btnHome").addEventListener("click",() => this.changerEtat("destination"));
        // Destination
        document.querySelectorAll(".btnDestination").forEach(element => {
            this.arrDestinations.push(element.id);
            element.addEventListener("click",() => this.changeDestination(element.id));
        });
        // Crew
        document.querySelectorAll(".btnCrew").forEach(element => {
            element.addEventListener("click",() => this.changeCrew(parseInt(element.id.replace("btnCrew__", ""))));
        });
        // Technology
        document.querySelectorAll(".btnTechnology").forEach(element => {
            element.addEventListener("click",() => this.changeTechnology(parseInt(element.id.replace("btnTechnology__", ""))));
        });
    },

    changerEtat: function(etat) {
        this.arrSections.forEach(section => {
            if(section.id != etat){
                section.classList.add("cacher");
            } else {
                section.classList.remove("cacher");
            }
        });
        console.log(this.body.className);
    },

    changeDestination: async function(strId) {
        try {
            // Récupération des données avec fetch et await
            const response = await fetch("json/data.json");
            
            // Vérification de la réponse
            if (!response.ok) {
                throw new Error(`Erreur réseau : ${response.status}`);
            }
            
            // Conversion de la réponse en JSON
            const data = await response.json();
            
            // Parcourir les utilisateurs pour afficher leurs noms
            data.destinations.forEach(destination => {
                if(destination.name === strId) {
                    document.getElementById("destination__img").src = destination.images.png;
                    document.getElementById("destination__name").innerText = destination.name;
                    document.getElementById("destination__desc").innerText = destination.description;
                    document.getElementById("destination__distance").innerText = destination.distance;
                    document.getElementById("destination__travel").innerText = destination.travel;
                }
            });


        } catch (error) {
            // Gestion des erreurs avec un bloc try/catch
            console.error('Erreur :', error.message);
        }

    },

    changeCrew: async function(intMember) {
        console.log(intMember)
        try {
            const response = await fetch("json/data.json");

            if(!response.ok) {
                throw new Error(`Erreur réseau : ${response.status}`);
            }

            const data = await response.json();

            document.getElementById("crew__role").innerText = data.crew[intMember].role;
            document.getElementById("crew__name").innerText = data.crew[intMember].name;
            document.getElementById("crew__bio").innerText = data.crew[intMember].bio;
            document.getElementById("crew__img").src = data.crew[intMember].images.png;


        } catch (error) {
            // Gestion des erreurs avec un bloc try/catch
            console.error('Erreur :', error.message);
        }
    },

    changeTechnology: async function(intMember) {
        try {
            // Récupération des données avec fetch et await
            const response = await fetch("json/data.json");
            
            // Vérification de la réponse
            if (!response.ok) {
                throw new Error(`Erreur réseau : ${response.status}`);
            }
            
            // Conversion de la réponse en JSON
            const data = await response.json();
            
            document.getElementById("technology__name").innerText = data.technology[intMember].name;
            document.getElementById("technology__desc").innerText = data.technology[intMember].description;
            if(window.innerWidth < 768) {
                document.getElementById("technology__img").src = data.technology[intMember].images.portrait;
            } else {
                document.getElementById("technology__img").src = data.technology[intMember].images.landscape;
            }


        } catch (error) {
            // Gestion des erreurs avec un bloc try/catch
            console.error('Erreur :', error.message);
        }

    },

}
window.addEventListener("load", app.init());