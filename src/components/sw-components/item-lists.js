import React from 'react'
import ItemList from '../item-list'
import { withData } from "../hoc-helpers";
import SwapiService from '../../services/swapi-service'

const swapiService = new SwapiService();

const { getAllPeople, getAllPlanets, getAllStarships } = swapiService;

const withChildFunction = (Wrapped, fn) => {
    return (props) => {
        return (
            <Wrapped {...props}>
                { fn }
            </Wrapped>
        )
    }
};

const  ListWithChildren = withChildFunction(
    ItemList,
    ({ name }) => <span>{ name }</span>
);


const PersonList = withData(ListWithChildren, getAllPeople);

const StarshipList = withData(ListWithChildren, getAllStarships);

const PlanetList = withData(ListWithChildren, getAllPlanets);

export {
    PersonList,
    StarshipList,
    PlanetList
}

