export default class Photographer{
    constructor(){
        //init tableau fetch
        this.arrayMedia = [];
        this.arrayPhotographers = [];
        const urlParams = new URLSearchParams(window.location.search);
        this.idPhotographerUrl = urlParams.get("id");
        this.curentPhotographer = [];
        this.curentMedias = [];

        console.log(this.idPhotographerUrl)

        //feinte
        this.getPhotographer = (e) => this._getPhotographer(e);

        //appel des methodes
        this.getPhotographer();


    }
        //Methodes
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
            this.photographerFactory();
        }

    }

    filterPhotographers(id){
        // trier tableau this.arrayPhotographers avec this.idPhotographerURL
        // remplire les infos dans this.curentPhotographer.
         this.curentPhotographer = this.arrayPhotographers.filter(x => x.id == this.idPhotographerUrl)
         //console.log(this.curentPhotographer)
    }

    filterMedias(id){
        // trier tableau this.arrayMedia avec this.idPhotographerURL
        // remplire les infos dans this.curentMedias.
        this.curentMedias = this.arrayMedia.filter(x => x.photographerId == this.idPhotographerUrl)
        //console.log(this.curentMedias)
    }
    //home page diplaydata
    photographerFactory() {
        const photographe = this.curentPhotographer[0];
        const medias = this.curentMedias;
        const photos = document.getElementsByClassName("contennerImage")
        this.photographerPicture = `assets/photographers/Photographers_ID_Photos/${photographe.portrait}`;
        this.mediasPicture = `assets/photographers/${photographe.id}/${medias.image}`;
        this.mediasVideo = `assets/photographers/${photographe.id}/${medias.video}`;
        const main = document.getElementById("main");
        
        main.innerHTML =`
            <div class="photograph-header">
                <div class = "identity">
                    <div class = "name">${photographe.name}</div>
                        <div class = "contry">${photographe.city}, ${photographe.country} </div>
                        <div class = "tagline"> ${photographe.tagline}</div>
                </div>
                <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
                <img src = ${this.photographerPicture} alt = "${photographe.name}" />
            </div>
            <div class = "contennerImage"></div>`

                photos.innerHTML="";
                for (var i = 0; i < medias.length; i++) {
                    //console.log(medias[i]);
                    const article = document.createElement("article")
                    this.mediasPicture = `assets/photographers/${photographe.id}/${medias[i].image}`
                    
                    //console.log(photos)

                    article.innerHTML =
                    `<div class = "image">
                    <img src = ${this.mediasPicture} alt = "${medias[i].title}" />
                        <div class = "titleLike">
                            <div class = "title">
                                ${medias[i].title}
                            </div>
                            <div class = "like">
                                <div class="likeNumber">
                                    ${medias[i].likes}
                                </div>
                                <div class = "heart">
                                    <i class="far fa-heart"></i>
                                    <i class="fas fa-heart full"></i>
                                </div>
                            </div>
                        </div>
                    </div>`;  
                console.log(this.mediasPicture)
                console.log(this.mediasVideo)
                photos[0].appendChild(article)
                }
    }
}

