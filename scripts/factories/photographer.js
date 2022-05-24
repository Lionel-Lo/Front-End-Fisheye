
export default class Photographer {
    constructor() {
        //init tableau fetch
        this.arrayMedia = [];
        this.arrayPhotographers = [];
        const urlParams = new URLSearchParams(window.location.search);
        this.idPhotographerUrl = urlParams.get("id");
        this.curentPhotographer = [];
        this.curentMedias = [];
        this.filter = document.getElementById("filterType")
        this.totalLike = 0
        this.links = []

        //feinte
        this.getPhotographer = (e) => this._getPhotographer(e);

        //appel des methodes
        this.getPhotographer();
        this.bindEvents();

    }
    //Event filter
    bindEvents() {
        this.filter.addEventListener("change", (e) => {
            const type = e.target.value;
            this.photographerFactory(type)
        })
    }

    //Methodes fetch sur le JSON
    async _getPhotographer() {
        const reponse = await fetch("data/photographers.json", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "content-Type": "application/json"
            }
        });

        if (reponse.status === 200) {
            const res = await reponse.json();

            //enregistrement tableau
            this.arrayPhotographers = res.photographers;
            this.arrayMedia = res.media;
            this.filterPhotographers();
            this.filterMedias();
        }

    }

    // Filtre photographers par ID
    filterPhotographers(id) {
        // trier tableau this.arrayPhotographers avec this.idPhotographerURL
        // remplire les infos dans this.curentPhotographer.
        this.curentPhotographer = this.arrayPhotographers.filter(x => x.id == this.idPhotographerUrl);
        this.photographerInfos();
    }

    //Filtre media pour ID
    filterMedias(id) {
        // trier tableau this.arrayMedia avec this.idPhotographerURL
        // remplire les infos dans this.curentMedias.
        this.curentMedias = this.arrayMedia.filter(x => x.photographerId == this.idPhotographerUrl)
        this.photographerFactory();
    }

    //Affichage infos photographers
    photographerInfos() {
        const photographe = this.curentPhotographer[0];
        this.photographerPicture = `assets/photographers/Photographers_ID_Photos/${photographe.portrait}`;
        document.querySelector("div.name").textContent = `${photographe.name}`
        document.querySelector("div.contry").textContent = `${photographe.city}, ${photographe.country}`
        document.querySelector("div.tagline").textContent = `${photographe.tagline}`
        document.querySelector(".picturePhotographer").innerHTML = `<img src = ${this.photographerPicture} alt = "${photographe.name}" />`
        this.formHTML()
    }

    // HTML diplay media
    videosOrPicture = (item) => {
        if (item.video) {
            const divVideo = `
                    <video tabindex="0" aria-label="${item.title} video" data-controls="false" class="js-card js-video">
                    <source class="js-card"
                        src="assets/photographers/${item.photographerId}/${item.video}"
                        type="video/mp4">
                    </video>
            `;
            return divVideo;
        }
        else {
            return `
                <img tabindex="0" class="js-card" role="img" src="assets/photographers/${item.photographerId}/${item.image}" alt="${item.title}" />
            `;

        }
    }

    // trie par thematique
    filterMediaTry(type) {

        // creation d'un tableau vide pour stoquer le resultat du switch
        let newFilterMedias = [];

        //switch pour faire le trie selon le type demander
        switch (type) {
            case "titre":
                newFilterMedias = this.curentMedias.sort((a, b) => a.title.localeCompare(b.title));
                return newFilterMedias;
                break;

            case "date":
                newFilterMedias = this.curentMedias.sort((a, b) => a.date.localeCompare(b.date));
                return newFilterMedias;
                break;

            default:
                newFilterMedias = this.curentMedias.sort((a, b) => b.likes - a.likes);
                return newFilterMedias

        }

    }

    //photographer page diplaydata
    photographerFactory(type) {
        //constante medias stocke le resultat du trie de la fonction filterMediaTry
        const medias = this.filterMediaTry(type);

        //selection du DOM
        const photos = document.getElementsByClassName("contennerImage")[0]

        //boucle affichage Photos    
        photos.innerHTML = "";
        for (var i = 0; i < medias.length; i++) {
            const article = document.createElement("article")
            const videosOrPicture = this.videosOrPicture(medias[i]);

            article.innerHTML =
                `<div class = "image">
                    ${videosOrPicture}
                        <div class = "titleLike">
                            <div class = "title">${medias[i].title}</div>
                            <div class = "like ">
                                <div class="likeNumber" id = "${medias[i].id + 2}">${medias[i].likes}</div>
                                <div class = "heart" id = ${medias[i].id + 3}>
                                    <i class="far fa-heart" id = "${medias[i].id + 1}"></i>
                                    <i class="fas fa-heart full" id = "${medias[i].id}"></i>
                                </div>
                            </div>
                        </div>
                </div>`;
            photos.appendChild(article)

            this.like(medias[i])
            this.totalLike += medias[i].likes

        } 
        //Appel a la fonction lightbox après la fin de la boucle
        this.lightbox()
    }

    // like par medias
    like(item) {
        //compteur de like avec css sur addEvent

        // selection DOM
        let heartPlus = document.getElementById(item.id + 1);
        let heartMoins = document.getElementById(item.id);
        let likeNumber = document.getElementById(item.id + 2);
        let heart = document.getElementById(item.id + 3);

        //Appel de la fonction pour afficher le nombre total de like
        this.likePrice()

        //Evenement pour les likes sur chaque photos
        heart.addEventListener("click", function (e) {
            if (e.target == heartPlus) {
                likeNumber.innerText++
                heartMoins.style.zIndex = "1"
                heartMoins.style.opacity = "1"
                heartPlus.style.zIndex = "0"
            } else {
                likeNumber.innerText--
                heartMoins.style.zIndex = "0"
                heartMoins.style.opacity = "0"
                heartPlus.style.zIndex = "1"
            }
        })
    }

    // Ajout du nom du photographe dans le formulaire
    formHTML() {
        const namePhotographer = document.getElementById("namePhotographer");
        namePhotographer.textContent = `${this.curentPhotographer[0].name}`;
    }

    // Nombre total de like
    likePrice() {
        const sumLike = document.getElementById("totalLike")
        sumLike.innerHTML =
            `
        <div class="numberHeart">${this.totalLike}<i class="fas fa-heart full"></i></div>
        <div class ="priceForDay">${this.curentPhotographer[0].price}€/jour</div>`


    }

    /**
     * construction de la lightbox
     */

    //creation de la lightbox
    lightbox() {
        const lightbox = document.createElement('div')
        lightbox.id = 'lightbox'

        lightbox.innerHTML = `
                <button id="lightbox__close">close</button>
                <button id="lightbox__next">next</button>
                <button id="lightbox__prev">prev</button>
                <div id="lightbox__container"></div> `

        document.body.appendChild(lightbox)
        const lightbox__container = document.getElementById("lightbox__container")
        const images = document.querySelectorAll('img.js-card, video.js-card')


        images.forEach(image => {
            image.addEventListener('click', e => {
                e.preventDefault()
                lightbox.classList.add('active')
                const img = document.createElement('img')
                img.src = image.src
                while (lightbox__container.firstChild) {
                    lightbox__container.removeChild(lightbox__container.firstChild)
                }

                lightbox__container.appendChild(img)
            })
        })

        //Appel de fonction
        this.close()
        this.next()
        this.prev()
        this.keyEscape()
    }

    //fonction de fermeture de la lightbox via la croix
    close() {
        const close = document.getElementById("lightbox__close")
        close.addEventListener("click", e => {
            e.preventDefault()
            lightbox.classList.remove("active")
        })
    }

    //fonction pour passer a l'image suivante via la fleche
    next() {
        const next = document.getElementById("lightbox__next")
        const images = document.querySelectorAll('img.js-card, video.js-card')


        for (const image of images) {
            next.addEventListener('click', e => {
                e.preventDefault()
                lightbox.classList.add('active')
                const img = document.createElement('img')
                img.src = image.src
                while (lightbox__container.firstChild) {
                    lightbox__container.removeChild(lightbox__container.firstChild)
                }

                lightbox__container.appendChild(img)

            })
        }
    }

    //fonction pour passer a l'image precedente via la fleche
    prev() {
        const prev = document.getElementById("lightbox__prev")
        const images = document.querySelectorAll('img.js-card, video.js-card')
        images.forEach(image => {
            prev.addEventListener('click', e => {
                lightbox.classList.add('active')
                const img = document.createElement('img')
                img.src = image.src
                while (lightbox__container.firstChild) {
                    lightbox__container.removeChild(lightbox__container.firstChild)
                }

                lightbox__container.appendChild(img)
            })
        })
    }

    //fermeture de la lightbon via la touche escape
    keyEscape(e) {
        const lightbox = document.getElementById("lightbox")
        onkeydown = function (e) {
            if (e.key == "Escape") {
                e.preventDefault()
                lightbox.classList.remove("active")
                console.log("escape")
            }
        };
    }



}
