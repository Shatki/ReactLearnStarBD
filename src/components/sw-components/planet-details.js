import React from 'react'
import ItemDetail, { Record } from '../item-detail'
import { withSwapiService } from "../hoc-helpers";


const PlanetDetails = (props) => {
    return (
        <ItemDetail { ...props }>
            <Record field="population" label="Population"/>
            <Record field="rotation_period" label="Rotation period"/>
            <Record field="diameter" label="Diameter"/>
        </ItemDetail>
    );
};

const mapMethodsToProps = (swapiService) =>{
    return{
        getData : swapiService.getPlanet,
        getImageUrl : swapiService.getPlanetImage
    }
};

export default withSwapiService(PlanetDetails, mapMethodsToProps)
