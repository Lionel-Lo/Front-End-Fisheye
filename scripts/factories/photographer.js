
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

        //bind du this.
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

    //Recuperation des données via la Methodes fetch sur le JSON
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
        document.querySelector(".picturePhotographer").innerHTML = `<img role="image" src = ${this.photographerPicture} alt = "${photographe.name}" />`
        this.formHTML()
    }

    // HTML diplay media
    videosOrPicture = (item) => {
        if (item.video) {
            const divVideo = `
                    <video tabindex="0" controls aria-label="${item.title} video" data-controls="false" class="js-card js-video">
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

        //compteur total de like mise a zero
        this.totalLike = 0;

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
        this.lightbox(medias)
        //Appel de la fonction pour afficher le nombre total de like
        this.likePrice()
        this.keyEnter()
    }

    // like par medias
    like(item) {
        
        // selection DOM
        let heartPlus = document.getElementById(item.id + 1);
        let heartMoins = document.getElementById(item.id);
        let likeNumber = document.getElementById(item.id + 2);
        let heart = document.getElementById(item.id + 3);



        //Evenement pour les likes sur chaque photos
        heart.addEventListener("click", (e) => {
            if (e.target == heartPlus) {
                likeNumber.innerText++
                heartMoins.style.zIndex = "1"
                heartMoins.style.opacity = "1"
                heartPlus.style.zIndex = "0"
                this.totalLike += 1
            } else {
                likeNumber.innerText--
                heartMoins.style.zIndex = "0"
                heartMoins.style.opacity = "0"
                heartPlus.style.zIndex = "1"
                this.totalLike += -1
            }
            this.likePrice();
        })
    }

    // Ajout du nom du photographe dans le formulaire
    formHTML() {
        const namePhotographer = document.getElementById("namePhotographer");
        namePhotographer.textContent = `${this.curentPhotographer[0].name}`;
    }

    // Nombre total de like
    likePrice() {
        const sumLike = document.getElementById("totalLike");
        sumLike.innerHTML =
            `
        <div class="numberHeart">${this.totalLike}<i class="fas fa-heart full"></i></div>
        <div class ="priceForDay">${this.curentPhotographer[0].price}€/jour</div>`
    }

    /**
     * construction de la lightbox
     */

    // creation de la lightbox
    lightbox() {

        //DOM
        const lightbox__container = document.getElementById("lightbox__container");
        const images = document.querySelectorAll('img.js-card, video.js-card');
        const titles = document.querySelectorAll('.title');

        images.forEach((image, index) => {

            image.addEventListener('click', e => {
                e.preventDefault()
                let video_picture = images[index].outerHTML
                let title = titles[index].outerHTML
                this.index = index //recuperation de l'index
                lightbox.classList.add('active')
                lightbox__container.innerHTML = `${video_picture} ${title}`
            })
        })

        //Appel de fonction

        this.close()
        this.next()
        this.prev()
        this.keyEscape()
        this.keyArrowLeft()
        this.keyArrowRight()
    }

    //fonction de fermeture de la lightbox via la croix
    close() {
        const close = document.getElementById("lightbox__close")
        close.addEventListener("click", e => {
            e.preventDefault()
            lightbox.classList.remove("active")
        })
    }

    //fonction pour passer a l'image suivante 
    next() {
        //DOM
        const next = document.getElementById("lightbox__next")
        const images = document.querySelectorAll('img.js-card, video.js-card')
        const lightbox__container = document.getElementById("lightbox__container");
        const titles = document.querySelectorAll('.title');


        //Event au click next
        next.addEventListener('click', e => {
            e.preventDefault()
            if (this.index < (images.length - 1)) {
                this.index++
                let title = titles[this.index].outerHTML
                let video_picture = images[this.index].outerHTML
                lightbox__container.innerHTML = `${video_picture} ${title}`
            }

        })
    }

    //fonction pour passer a l'image precedente 
    prev() {

        //DOM
        const prev = document.getElementById("lightbox__prev")
        const images = document.querySelectorAll('img.js-card, video.js-card')
        const lightbox__container = document.getElementById("lightbox__container");
        const titles = document.querySelectorAll('.title');


        //Event au click previous
        prev.addEventListener('click', e => {
            let n = images.length
            if (this.index > (images.length - n)) {
                this.index--
                let title = titles[this.index].outerHTML
                let video_picture = images[this.index].outerHTML
                lightbox__container.innerHTML = `${video_picture} ${title}`
            }

        })

    }

    //fermeture de la lightbon via la touche escape
    keyEscape(e) {

        //DOM
        const lightbox = document.getElementById("lightbox")

        //event close keydown escape
        document.addEventListener("keydown", e => {
            if (e.key == "Escape") {
                e.preventDefault()
                lightbox.classList.remove("active")
            }
        });
    }

    //fonction pour passer a l'image suivante via la fleche droite
    keyArrowRight(e) {
        document.addEventListener("keydown", e => {

            //DOM
            const images = document.querySelectorAll('img.js-card, video.js-card')
            const titles = document.querySelectorAll('.title');

            //event keydown Arrow-right for next picture
            if (e.key == "ArrowRight") {
                e.preventDefault()
                if (this.index < (images.length - 2)){
                this.index++
                let title = titles[this.index].outerHTML
                let video_picture = images[this.index].outerHTML
                lightbox__container.innerHTML = `${video_picture} ${title}`
                }
            }
        });
    }

    //fonction pour passer a l'image precedente via la fleche gauche
    keyArrowLeft(e) {

        //DOM
        const images = document.querySelectorAll('img.js-card, video.js-card')
        const titles = document.querySelectorAll('.title');

        //event keydown arrow-left for previous picture
        document.addEventListener("keydown", e => {
            if (e.key == "ArrowLeft") {
                e.preventDefault()
                let n = images.length
                if (this.index > (images.length - n)){
                this.index--
                let title = titles[this.index].outerHTML
                let video_picture = images[this.index].outerHTML
                lightbox__container.innerHTML = `${video_picture} ${title}`
                }
            }
        });
    }

    //ouverture de la lightbox via la touche enter
    keyEnter(e){

        //DOM
        const lightbox__container = document.getElementById("lightbox__container");
        const images = document.querySelectorAll('img.js-card, video.js-card');
        const titles = document.querySelectorAll('.title');

        //Create litghbox on event keydown enter
        images.forEach((image, index) => {
            image.addEventListener("keydown", e => {
                if (e.key == "Enter") {
                    e.preventDefault()
                let video_picture = images[index].outerHTML
                let title = titles[index].outerHTML
                this.index = index
                lightbox.classList.add('active')
                lightbox__container.innerHTML = `${video_picture} ${title}`
                }
            });
        })
    }

}
