export default class AllPhotographers{
    constructor(){
        //init tableau fetch
        this.arrayPhotographers = [];

        //feinte
        this.getPhotographers = (e) => this._getPhotographers(e);

        //appel des methodes
        this.getPhotographers();
    }

    //Methodes
    async _getPhotographers() {
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
            this.displayData(this.arrayPhotographers);
        }
        console.log(this.arrayPhotographers)
    }
    //home page diplaydata
    displayData(photographers) {
        const photographersSection = document.getElementsByClassName("photographer_section")[0];
        photographersSection.innerHTML = "";
        photographers.forEach((photographer) => {
            const article = document.createElement("article")
            this._picture = `assets/samplePhotos/Photographers_ID_Photos/${photographer.portrait}`;

            article.innerHTML = `
            <a href ="./photographer.html?id=${photographer.id}" arial-label="${photographer.name}">
                <img src = ${this._picture} alt = "${photographer.name}" />
                <h2 class="name">${photographer.name}</h2>
            </a>
            <p class="location">${photographer.city}, ${photographer.country}</p>
            <p class="tagline">${photographer.tagline}</p>
            <small class="price">${photographer.price}€/jour</small> `;
        
        photographersSection.appendChild(article)
        });
    }
}