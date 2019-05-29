import React, {Component} from 'react';
import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner'
import ErrorIndicator from "../random-planet";
import ErrorButton from '../error-button'
import './style.css';


export default class PersonDetails extends Component {
    swapiService = new SwapiService();

    state = {
        person: null,
        loading: true,
        error: null
    };

    componentDidMount() {
        this.updatePerson();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.personId !== prevProps.personId){
            this.updatePerson()
        }
    }

    onPersonLoaded = (person)=>{
        this.setState({
                person,
                loading: false
            })
    };

    updatePerson =() =>{
      this.setState({
          loading:true
      });
      const { personId } = this.props;
      if(!personId) return;
      this.swapiService
          .getPerson(personId)
          .then(this.onPersonLoaded)
          .catch(this.onError)
    };

    onError = (err) => {
        this.setState({
            loading: false,
            error: true
        })
    };

    render() {
        const {person, loading, error} = this.state;
        const hasData = !(loading || error);

        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? <PersonView person={person}/> : null;
        const errorMessage = error ? <ErrorIndicator/> : null;


        if (!this.state.person) {
            return <span>Select a person from the list</span>
            }

        return (
            <div className="person-details card">
                {spinner}
                {content}
                {errorMessage}
            </div>
        )
    }
}


const PersonView = ({person}) => {
    const {id, name, gender, birthYear, eyeColor} = person;
    return (
        <React.Fragment>
            <img className="person-image"
                 src={`https://starwars-visualguide.com/assets/img/characters/${id}.jpg`} alt="avatar"/>

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                        <span className="term">Gender</span>
                        <span>{gender}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">BirthYear</span>
                        <span>{birthYear}</span>
                    </li>
                    <li className="list-group-item">
                        <span className="term">Eye Color</span>
                        <span>{eyeColor}</span>
                    </li>
                </ul>
                <ErrorButton />
            </div>
        </React.Fragment>
    )
};

