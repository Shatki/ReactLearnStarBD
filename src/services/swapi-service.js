export default class SwapiService {
    _apiBase = 'https://swapi.co/api';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}/${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${this._apiBase}/${url}, received ${res.status}`)
        }
        return await res.json()
    }

    getAllPeople = async () => {
        const res = await this.getResource('people/');
        return res.results.map(this._transformPerson)
    };

    getPerson = async(id) => {
        const person = await this.getResource(`people/${id}/`);
        return this._transformPerson(person)
    };

    getAllPlanets = async () => {
        const res = await this.getResource('planets/');
        return res.results.map(this._transformPlanet)
    };

    getPlanet = async(id) => {
        const planet = await this.getResource(`planets/${id}/`);
        return this._transformPlanet(planet)
    };

    getAllStarships = async() => {
        const res = await this.getResource('starships/');
        return res.results.map(this._transformSpaceship)
    };

    getStarship = async(id) => {
        const spaceship = await this.getResource(`starships/${id}/`);
        return this._transformSpaceship(spaceship)
    };

    static _extractId(item){
        const idRegExp = /\/([0-9]*)\/$/;
        return item.url.match(idRegExp)[1];
    }

    _transformPlanet = (planet) =>{
        return {
            id: SwapiService._extractId(planet),
            name: planet.name,
            population: planet.population,
            rotationPeriod: planet.rotation_period,
            diameter: planet.diameter
          }
    };

    _transformSpaceship = (spaceship) =>{
        return {
            id: SwapiService._extractId(spaceship),
            name: spaceship.name,
            model: spaceship.model,
            manufacturer: spaceship.manufacturer,
            costInCredits: spaceship.costInCredits,
            length: spaceship.length,
            crew: spaceship.crew,
            passengers: spaceship.passengers,
            cargoCapacity: spaceship.cargoCapacity
          }
    };

    _transformPerson = (person) =>{
        return {
            id: SwapiService._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birthYear,
            eyeColor: person.eyeColor
        }
    }

}


const swapi = new SwapiService();

swapi.getPerson(3).then((person)=>{
    console.log(person.name)
});