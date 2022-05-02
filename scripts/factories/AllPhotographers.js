export default class AllPhotographers{
    constructor(){
        this.DataPhotographers = [];
        this.getData();
        this.displayData();
    }
    getData(){
            fetch("/data/photographers.json")
                .then(res => {
                    if(res.ok){
                        return res.json();
                    }
                })
                .then(data =>{
                    let tempArray = []
                    for (let i = 0; i < data["photographers"].length; i++) {
                        tempArray  = (data.photographers[i])
                            console.log(data.photographers[i])
                    }  
                    return this.DataPhotographers = tempArray;
                })
                .then(test =>{
                    console.log(this.DataPhotographers)
                })
                .catch(function(err){
                    console.error("bad")
                })
            //fetch = recup data allphotographers => stock dans tableau.
            //fonction assynchrone
            //verifi donées
    }
    displayData() {
           
            const photographers = this.DataPhotographers
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