import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../detail-person';
import './style.css'
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page";
import SwapiService from "../../services/swapi-service";

export default class App extends Component {
    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false
    };

    onPersonSelected = (id) =>{
        this.setState({
            selectedPerson: id
        })
    };

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true
        });
    }

    render() {
        if(this.state.hasError){
            return <ErrorIndicator/>
        }

        const randomPlanet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

        return (
            <div className='stardb-app'>
                <Header/>
                {randomPlanet}
                <ErrorButton/>

                <PeoplePage/>

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList
                            onItemSelected={this.onPersonSelected}
                            getData={this.swapiService.getAllPlanets}
                            renderItem={(item)=>item.name}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>

                <div className="row mb2">
                    <div className="col-md-6">
                        <ItemList
                            onItemSelected={this.onPersonSelected}
                            getData={this.swapiService.getAllStarships}
                            renderItem={(item)=>item.name}/>
                    </div>
                    <div className="col-md-6">
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>

            </div>
        );
    }
}
