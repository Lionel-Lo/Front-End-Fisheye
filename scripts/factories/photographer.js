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
        }

        // console.log(this.arrayMedia)
        // console.log(this.arrayPhotographers)
    }

    filterPhotographers(id){
        // trier tableau this.arrayPhotographers avec this.idPhotographerURL
        // remplire les infos dans this.curentPhotographer.
        this.curentPhotographer = this.arrayPhotographers.filter(x => x.id.includes(this.idPhotographerUrl))
        console.log(this.curentPhotographer)
        console.log(this.arrayPhotographers)
    }

    filterMedias(){
        // trier tableau this.arrayMedia avec this.idPhotographerURL
        // remplire les infos dans this.curentMedias.
    }
        //home page diplaydata
    // photographerFactory(media) {
    //         const { name, portrait } = this.arrayPhotographers;
            
    //         const picture = `assets/samplePhotos/Photographers_ID_Photos/${this.arrayPhotographers.portrait}`;
    //         function getUserCardDOM() {

    //             const article = document.createElement( 'article' );
    //             const img = document.createElement( 'img' );
    //             img.setAttribute("src", picture)
    //             const h2 = document.createElement( 'h2' );
    //             h2.textContent = name;
    //             article.appendChild(img);
    //             article.appendChild(h2);
    //             return (article);
    //         }

    //     }
    //     }
}


// 2 autre fonctions : 1 display info photographer, 2 dispplay info medias. fontion lancer dans filter



// function photographerFactory(data) {
//     const { name, portrait } = data;

//     const picture = `assets/photographers/${portrait}`;

//     function getUserCardDOM() {
//         const article = document.createElement( 'article' );
//         const img = document.createElement( 'img' );
//         img.setAttribute("src", picture)
//         const h2 = document.createElement( 'h2' );
//         h2.textContent = name;
//         article.appendChild(img);
//         article.appendChild(h2);
//         return (article);
//     }
//     return { name, picture, getUserCardDOM }
// }
