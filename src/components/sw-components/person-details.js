import React from 'react'
import ItemDetail, {Record} from '../item-detail'
import { withSwapiService } from "../hoc-helpers";


const PersonDetails = (props) => {
    return (
        <ItemDetail { ...props }>
            <Record field="gender" label="Gender"/>
            <Record field="eyeColor" label="Eye Color"/>
        </ItemDetail>
    )
};

const mapMethodsToProps = (swapiService) =>{
  return{
      getData : swapiService.getPerson,
      getImageUrl : swapiService.getPersonImage
  }
};

export default withSwapiService(PersonDetails, mapMethodsToProps)