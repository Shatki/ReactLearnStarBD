import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner'

import './style.css';

export default class RandomPlanet extends Component {
  swapiService = new SwapiService();

  state = {
    planet: {},
    loading: true
  };

  constructor(props){
    super(props);
    this.updatePlanet();
  }

  onPlanetLoaded = (planet)=>{
    this.setState({
      planet,
      loading: false
    })
  };

  updatePlanet(){
    const id = Math.floor(Math.random()*23) + 2;
    this.swapiService
        .getPlanet(id)
        .then(this.onPlanetLoaded)
  };



  render() {
    const { planet, loading } = this.state;

    if(loading){
      return <Spinner/>
    }

    return (
      <div className="random-planet jumbotron rounded">
        <PlanetView planet={planet}/>
      </div>

    );
  }
}


const PlanetView = ({planet}) => {
  const {id, name, population, rotationPeriod, diameter} = planet;

  return (
      <React.Fragment>
        <img className="planet-image"
             src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt='planet'/>
        <div>
          <h4>{name}</h4>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="term">Population</span>
              <span>{population}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Rotation Period</span>
              <span>{rotationPeriod}</span>
            </li>
            <li className="list-group-item">
              <span className="term">Diameter</span>
              <span>{diameter}</span>
            </li>
          </ul>
        </div>
      </React.Fragment>)
};