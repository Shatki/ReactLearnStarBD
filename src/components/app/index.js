import React, {Component} from 'react';
import Header from '../header';
import RandomPlanet from '../random-planet';
import './style.css'
import ErrorIndicator from "../error-indicator";
import ErrorBoundry from "../error-boundry"
import {SwapiServiceProvider} from "../sw-service-context";
import SwapiService from "../../services/swapi-service";
import DummySwapiService from "../../services/dummy-swapi-service"
import { PeoplePage, PlanetPage, StarshipPage } from  '../pages'

export default class App extends Component {
    state = {
        showRandomPlanet: true,
        hasError: false,
        swapiService: new SwapiService()
    };

    onChangeService = ({swapiService}) => {
        this.setState(({swapiService}) => {
            const Service = swapiService instanceof SwapiService ? DummySwapiService : SwapiService;

            console.log(Service.name);

            return {
                swapiService: new Service()
            };
        });
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
                <SwapiServiceProvider value={this.state.swapiService}>
                    <Header />
                    <RandomPlanet />
                    <PeoplePage />
                    <PlanetPage />
                    <StarshipPage />
                </SwapiServiceProvider>
            </ErrorBoundry>
        );
    }
}
