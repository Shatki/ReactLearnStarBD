import React from 'react'
import ItemDetail, {Record} from '../item-detail'
import {withSwapiService} from "../hoc-helpers";


const StarshipDetails = (props) => {
    return (
        <ItemDetail { ...props }>
            <Record field="model" label="Model"/>
            <Record field="length" label="Length"/>
            <Record field="costInCredits" label="Cost"/>
        </ItemDetail>
    )
};

const mapMethodsToProps = (swapiService) =>{
    return{
        getData : swapiService.getStarship,
        getImageUrl : swapiService.getStarshipImage
    }
};

export default  withSwapiService(StarshipDetails, mapMethodsToProps)