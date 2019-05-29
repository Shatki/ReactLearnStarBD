import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ItemList from '../item-list';
import PersonDetails from '../detail-person';
import './style.css'
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page";

export default class App extends Component {
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
                <PeoplePage/>
                <PeoplePage/>
            </div>
        );
    }
}
