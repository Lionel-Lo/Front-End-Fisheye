export default class AllPhotographers{
    constructor(){
        this.DataPhotographers = [];
        this.getData();
        //this.displayData();
    }
    getData(){
        fetch("/data/photographers.json")
            .then(res => {
                if(res.ok){
                    return res.json();
                }
            })
            .then(data =>{
                for (let i = 0; i < data["photographers"].length; i++) {
                    this.DataPhotographers  = (data.photographers[i])
                        console.log(data.photographers[i])
                }  
            })
            .catch(function(err){
                console.error("bad")
            })
        //fetch = recup data allphotographers => stock dans tableau.
        //fonction assynchrone
        //verifi donées
    }
    displayData() {
       

        const photographersSection = document.querySelector(".photographer_section");
        console.log(photographersSection)


        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographers);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });

        async function init() {
            // Récupère les datas des photographes
            const { photographers } = await getData();
            displayData();
        };
    
    init();  

    }
}