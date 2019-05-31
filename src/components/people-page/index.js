import React, {Component} from 'react';
import ItemList from '../item-list';
import ItemDetail from '../item-detail';
import SwapiService from "../../services/swapi-service";
import Row from '../row'
import ErrorBoundry from '../error-boundry';

import './style.css';

export default class PeoplePage extends Component {

    swapiService = new SwapiService();

    state = {
        selectedPerson: 3
    };

    onPersonSelected = (selectedPerson) => {
        this.setState({selectedPerson});
    };

    render() {

        const itemList = (
            <ItemList
                onItemSelected={this.onPersonSelected}
                getData={this.swapiService.getAllPeople}>
                {(item) => (`${item.name} (${item.birthYear})`)}
            </ItemList>
        );

        const itemDetail = (
            <ErrorBoundry>
                <ItemDetail itemId={this.state.selectedPerson}/>
            </ErrorBoundry>
        );

        return (
            <Row left={itemList} right={itemDetail}/>
        );
    }
}
