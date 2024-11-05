/**
 * @file Un menu simple, responsive bâti en amélioration progressive.
 * @version v3.1 Mise à jour le 7 février :: changement du préfixe tag pour ref ! 
 * @author TIMCSF et Adapté par Jeremy Fraser
 */

//*******************
// Déclaration d'objet(s)
//*******************

let menu = {
    javascriptEnabled: document.body.classList.add('js'),
    strImageNavClosed: 'assets/shared/icon-hamburger.svg',
    strImageNavOpen: 'assets/shared/icon-close.svg',
    refButton: null,
    refImg: null,
    refNav: document.querySelector('.nav'),
  
    configurerNav: function () {
      
      document.querySelector('.header').classList.remove('noJs');
      // Crédit pour le bout de code à la ligne 23  ->  https://stackoverflow.com/questions/16611497/how-can-i-get-the-name-of-an-html-page-in-javascript
      let arrNomFichier = location.pathname.split("/").slice(-1); // Retourne un object
      let strNomFichier = arrNomFichier[0]; // Retourne la string désirée

      //********** Création du bouton du menu mobile

      // On crée VIRTUELLEMENT un bouton et un span (pour le texte du bouton)
      this.refButton = document.createElement('button');
      this.refButton.classList.add("btnMenu")
      this.refImg = document.createElement('img');
      this.refImg.classList.add("btnMenu__image");
  
      // On ajoute le span dans le bouton
      this.refButton.appendChild(this.refImg);
  
      // On ajoute des classes au Button et au span
      this.refButton.classList.add('nav__control');
  
      // On place le texte du Button dans son conteneur span
      this.refImg.src = this.strImageNavClosed;
  
      // On ajoute le Button dans le html:
      // plus précisément comme premier enfant dans le nav  
      this.refNav.append(this.refButton);
  
      // Ajout de l'écouteur d'événement sur le bouton du menu
      this.refButton.addEventListener('click', function () {
        menu.ouvrirFermerNav();
      });
  
      // ajouter la classe d'état fermé au menu
      this.refNav.classList.add('nav--closed');
    },
  
    ouvrirFermerNav: function () {
      // On bascule (ajoute ou enlève) la classe de fermeture du menu
      this.refNav.classList.toggle('nav--closed');
  
      // On change le texte du bouton selon l'état du menu
      if (this.refNav.classList.contains('nav--closed')) {
        this.refImg.src = this.strImageNavClosed;
        document.querySelector('.header').classList.remove('enteteQuandMenuOuvert');
      } else {
        this.refImg.src = this.strImageNavOpen;
        document.querySelector('.header').classList.add('enteteQuandMenuOuvert');
      }
    },

    verifierLongueur: function() {
      if(window.innerWidth > 599) {
        document.querySelector('.header').classList.remove('enteteQuandMenuOuvert');
        this.refImg.src = this.strImageNavClosed;
        
      } 
      else {
        if(document.querySelector(".header").classList.contains("enteteQuandMenuOuvert") == false && this.refNav.classList.contains("nav--closed") == false) {
          this.refNav.classList.add("nav--closed")
        }
      }
    }
  };
  
  
  
  //*******************
  // Écouteurs d'événements
  //*******************
  window.addEventListener('load', function () {
    menu.configurerNav();
  });
  window.addEventListener('resize', function () {
    menu.verifierLongueur();
  });