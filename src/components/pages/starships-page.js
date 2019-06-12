import React, {Component} from 'react';
import {StarshipDetails, StarshipList} from "../sw-components";
import Row from "../row";


export default class StarshipPage extends Component {
    state = {
        selectedItem: 11
    };

    onItemSelected = (selectedItem) => {
        this.setState({selectedItem});
        console.log(this.state.selectedItem)
    };

    render() {
        const {selectedItem} = this.state;

        return (
            <Row
                left={<StarshipList onItemSelected={this.onItemSelected}/>}
                right={<StarshipDetails itemId={selectedItem}/>}
            />
        )
    }

}