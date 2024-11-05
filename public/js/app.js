/*
* Source du code de préchargement
https://webdesign.tutsplus.com/best-ways-to-preload-images-using-javascript-css-and-html--cms-41329t
*/

/**
 * Code de l'application
 */
const app = {

    body: document.querySelector("body"),
    arrSections: document.querySelectorAll(".section"),
    arrDestinations: new Array(),
    idCourant: "home",

    init: function() {

        this.commencerPreload();

        this.body.classList.add("body-home");

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
        this.changeDestination("Moon");
        // Crew
        document.querySelectorAll(".btnCrew").forEach(element => {
            element.addEventListener("click",() => this.changeCrew(parseInt(element.id.replace("btnCrew__", ""))));
        });
        this.changeCrew(0);
        // Technology
        document.querySelectorAll(".btnTechnology").forEach(element => {
            element.addEventListener("click",() => this.changeTechnology(parseInt(element.id.replace("btnTechnology__", ""))));
        });
        this.changeTechnology(0);
    },

    changerEtat: function(etat) {
        this.arrSections.forEach(section => {
            if(section.id != etat){
                section.classList.add("cacher");
                if(this.body.className == ("body-"+section.id)) {
                    this.body.classList.remove("body-"+section.id);
                }
                document.querySelector("#entete__"+section.id).classList.remove("actif");
            } else {
                section.classList.remove("cacher");
                document.querySelector("#entete__"+section.id).classList.add("actif");
            }
        });
        this.body.classList.add("body-"+etat);
    },

    changeDestination: async function(strId) {
        document.querySelectorAll(".btnDestination").forEach(element => {
            if(strId == element.id.replace("btnDestination__", "")) {
                element.classList.add("actif");
            } else {
                if(element.classList.contains("actif")) {
                    element.classList.remove("actif");
                }
            }
        });
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
        console.log(intMember);
        document.querySelectorAll(".btnCrew").forEach(element => {
            if(intMember == parseInt(element.id.replace("btnCrew__", ""))) {
                element.classList.add("actif");
            } else {
                if(element.classList.contains("actif")) {
                    element.classList.remove("actif");
                }
            }
        });
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
        document.querySelectorAll(".btnTechnology").forEach(element => {
            if(intMember == parseInt(element.id.replace("btnTechnology__", ""))) {
                element.classList.add("actif");
            } else {
                if(element.classList.contains("actif")) {
                    element.classList.remove("actif");
                }
            }
        });
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

    commencerPreload: async function() {
        // try {
        //     // Récupération des données avec fetch et await
        //     const response = await fetch("json/data.json");
            
        //     // Vérification de la réponse
        //     if (!response.ok) {
        //         throw new Error(`Erreur réseau : ${response.status}`);
        //     }
            
        //     let arrDatas = ["home","destinations","crew","technology"];
        //     // Conversion de la réponse en JSON
        //     const datas = await response.json();
            
        //     // arrDatas.forEach(data => {
        //     //     console.log(datas.data);
        //     //     for(let element of datas[data]) {
        //     //         console.log(element);
        //     //         this.preloadImages(element.images.png);
        //     //         this.preloadImages(element.images.webp);
        //     //     }
        //     // });



        // } catch (error) {
        //     // Gestion des erreurs avec un bloc try/catch
        //     console.error('Erreur :', error.message);
        // }
        const arrChemins = new Array("home", "destination", "crew", "technology");

        arrChemins.forEach(chemin => {
            this.preloadImages("assets/"+chemin+"/background-"+chemin+"-desktop.jpg");
            this.preloadImages("assets/"+chemin+"/background-"+chemin+"-tablet.jpg");
            this.preloadImages("assets/"+chemin+"/background-"+chemin+"-mobile.jpg");
        });
    },

    preloadImages: function(url) {
        let img = new Image();
        img.src = url;
    }

}
window.addEventListener("load", app.init());