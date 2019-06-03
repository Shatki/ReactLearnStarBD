import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import './style.css'
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry"
import Row from "../row";
import ItemDetail, { Record } from "../item-detail";


export default class App extends Component {
    swapiService = new SwapiService();

    state = {
        showRandomPlanet: true,
        hasError: false
    };

    componentDidCatch(error, errorInfo) {
        this.setState({
            hasError: true
        });
    }

    render() {
        if (this.state.hasError) {
            return <ErrorIndicator/>
        }

        const randomPlanet = this.state.showRandomPlanet ? <RandomPlanet/> : null;

        const personDetail = (
            <ItemDetail>
                itemId={11}
                getData={this.swapiService.getPerson}
                getImageUrl={this.swapiService.getPersonImage}
                <Record field="gender" label="Gender"/>
                <Record field="eyeColor" label="Eye Color"/>
            </ItemDetail>
        );

        const starshipDetail = (
            <ItemDetail
                itemId={5}
                getData={this.swapiService.getStarship}
                getImageUrl={this.swapiService.getStarshipImage}/>
        );

        return (
            <ErrorBoundry>
                <div className="stardb-app">
                    <Header/>
                    {randomPlanet}

                    <Row
                        left={personDetail}
                        right={starshipDetail}/>
                </div>
            </ErrorBoundry>
        );
    }
}
