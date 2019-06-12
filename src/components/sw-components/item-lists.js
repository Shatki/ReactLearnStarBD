import React from 'react'
import ItemList from '../item-list'
import { withData, withSwapiService } from "../hoc-helpers";

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


const renderName = ({name}) =><span>{name}</span>;
const renderModelAndName = ({name, model}) =><span>{name} ({model})</span>;
const mapPersonMethodsToProps = (swapiService)=>{
    return{
        getData : swapiService.getAllPeople
    }
};

const mapPlanetMethodsToProps = (swapiService)=>{
    return{
        getData : swapiService.getAllPlanets
    }
};

const mapStarshipMethodsToProps = (swapiService)=>{
    return{
        getData : swapiService.getAllStarships
    }
};


const PersonList = withSwapiService(
    withData(withChildFunction(ListWithChildren, renderName)),
    mapPersonMethodsToProps);

const StarshipList = withSwapiService(
    withData(withChildFunction(ListWithChildren, renderModelAndName)),
    mapStarshipMethodsToProps);

const PlanetList = withSwapiService(
    withData(withChildFunction(ListWithChildren, renderName)),
    mapPlanetMethodsToProps);

export {
    PersonList,
    StarshipList,
    PlanetList
}

