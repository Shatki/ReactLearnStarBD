import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import './style.css'
import ErrorIndicator from "../error-indicator";
import ErrorBoundry from "../error-boundry"
import Row from "../row";
import {SwapiServiceProvider} from "../sw-service-context";
import SwapiService from "../../services/swapi-service";

import {
    PersonDetails,
    PlanetDetails,
    StarshipDetails,
    PersonList,
    PlanetList,
    StarshipList
} from '../sw-components'

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

        return (
            <ErrorBoundry>
                <SwapiServiceProvider value={this.swapiService}>
                    <div className="stardb-app">
                        <Header/>
                        {randomPlanet}
                    </div>

                    <PersonDetails itemId={11}/>

                    <PlanetDetails itemId={8}/>

                    <StarshipDetails itemId={5}/>

                    <PersonList/>
                    <StarshipList/>
                    <PlanetList/>
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
