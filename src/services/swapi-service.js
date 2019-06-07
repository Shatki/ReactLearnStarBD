export default class SwapiService {
    _apiBase = 'https://swapi.co/api';
    _apiContentBase = 'https://starwars-visualguide.com/assets/img';

    async getResource(url, base=this._apiBase) {
        const res = await fetch(`${base}/${url}`);
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

    getPersonImage = (id) =>{
        return `${this._apiContentBase}/characters/${id}.jpg`;
    };

    getAllPlanets = async () => {
        const res = await this.getResource('planets/');
        return res.results.map(this._transformPlanet)
    };

    getPlanet = async(id) => {
        const planet = await this.getResource(`planets/${id}/`);
        return this._transformPlanet(planet)
    };

    getPlanetImage = (id) =>{
        return `${this._apiContentBase}/planets/${id}.jpg`;
    };

    getAllStarships = async() => {
        const res = await this.getResource('starships/');
        return res.results.map(this._transformSpaceship)
    };

    getStarship = async(id) => {
        const spaceship = await this.getResource(`starships/${id}/`);
        return this._transformSpaceship(spaceship)
    };

    getStarshipImage = (id) =>{
        return `${this._apiContentBase}/starships/${id}.jpg`;
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
            diameter: planet.diameter,
            climate: planet.climate
          }
    };

    _transformSpaceship = (spaceship) =>{
        return {
            id: SwapiService._extractId(spaceship),
            name: spaceship.name,
            model: spaceship.model,
            manufacturer: spaceship.manufacturer,
            costInCredits: spaceship.cost_in_credits,
            length: spaceship.length,
            crew: spaceship.crew,
            passengers: spaceship.passengers,
            cargoCapacity: spaceship.cargo_capacity
          }
    };

    _transformPerson = (person) =>{
        return {
            id: SwapiService._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.birth_year,
            eyeColor: person.eye_color,
            mass: person.mass,
            height: person.height
        }
    };
}


const swapi = new SwapiService();

swapi.getPerson(3)
    .then((person)=>{
    console.log(person.name)
});