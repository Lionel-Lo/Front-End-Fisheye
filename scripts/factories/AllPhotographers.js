export default class AllPhotographers{
    constructor(data){
        this._name = name
        this._id = id
        this._city = city 
        this._country = country
        this._tagline = tagline
        this._price = price
        this._portrait = portrait
    }
    
    get name(){
        return this._name
    }
    get id(){
        return this._id
    }
    get city(){
        return this._city
    }
    get tagline(){
        return this._tagline
    }
    get price (){
        return this._price
    }
    get portrait(){
        return `/assets/photographers/photographers_ID_Photos${this.portrait}`
    }
}