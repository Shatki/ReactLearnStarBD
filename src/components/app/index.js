import React, { Component } from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import './style.css'
import ErrorButton from "../error-button";
import ErrorIndicator from "../error-indicator";
import PeoplePage from "../people-page";
import SwapiService from "../../services/swapi-service";
import ErrorBoundry from "../error-boundry"

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
                <div className="stardb-app">
                    <Header/>
                    {randomPlanet}

                    <div className="row mb2 button-row">
                        <button
                            className="toggle-planet btn btn-warning btn-lg"
                            onClick={this.toggleRandomPlanet}>
                            Toggle Random Planet
                        </button>
                        <ErrorButton/>
                    </div>
                    <PeoplePage/>
                </div>
            </ErrorBoundry>
        );
    }
}
