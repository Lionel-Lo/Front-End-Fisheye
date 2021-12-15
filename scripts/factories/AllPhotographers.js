export default class AllPhotographers{
    constructor(){
        this.DataPhotographers = [];
        this.getData();
    }

    getData(){
        fetch("/data/photographers.json")
            .then(res => {
                if(res.ok){
                    res.json().then((response)=>
                    console.log(response.photographers),
                    )
                    this.DataPhotographers.push(response.photographers)
                }
                console.log(this.DataPhotographers)
            })
            // .catch(function(err){
            //     console.error("bad")
            // })
        //fetch = recup data allphotographers => stock dans tableau.
        //fonction assynchrone
        //verifi donées
        console.log('toto');
    }

    displayData() {
        // afficher data     
    }
}