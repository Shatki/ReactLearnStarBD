import React, {Component} from 'react';
import SwapiService from '../../services/swapi-service'
import Spinner from '../spinner'
import ErrorIndicator from "../random-planet";
import ErrorButton from '../error-button'
import './style.css';


export default class ItemDetail extends Component {
    swapiService = new SwapiService();

    state = {
        item: null,
        loading: true,
        error: null
    };

    componentDidMount() {
        this.updateItem();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.itemId !== prevProps.itemId) {
            this.updateItem()
        }
    }

    onItemLoaded = (item) => {
        this.setState({
            item,
            loading: false
        })
    };

    updateItem = () => {
        this.setState({
            loading: true
        });
        const {itemId} = this.props;
        if (!itemId) return;
        this.swapiService
            .getPerson(itemId)
            .then(this.onItemLoaded)
            .catch(this.onError)
    };

    onError = (err) => {
        this.setState({
            loading: false,
            error: true
        })
    };

    render() {
        const {item, loading, error} = this.state;
        const hasData = !(loading || error);

        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? <ItemView item={item}/> : null;
        const errorMessage = error ? <ErrorIndicator/> : null;


        if (!this.state.item) {
            return <span>Select a item from the list</span>
        }

        return (
            <div className="item-detail card">
                {spinner}
                {content}
                {errorMessage}
            </div>
        )
    }
}

const ItemView = ({item}) => {
    const {id, name, gender, birthYear, eyeColor} = item;
    return (
        <React.Fragment>
            <img className="item-image"
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
                <ErrorButton/>
            </div>
        </React.Fragment>
    )
};

