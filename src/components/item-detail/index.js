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
        itemImageUrl: `https://starwars-visualguide.com/assets/img/characters/11.jpg`,
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
        const { itemId, getData, getImageUrl } = this.props;
        if (!itemId) return;

        this.setState({
            loading: true,
            itemImageUrl: getImageUrl(itemId)
        });

        getData(itemId)
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
        const {item, itemImageUrl,
            loading, error} = this.state;
        const hasData = !(loading || error);

        const spinner = loading ? <Spinner/> : null;
        const content = hasData ? <ItemView item={item}
                                            image={itemImageUrl}
                                            children={this.props.children}/> : null;
        const errorMessage = error ? <ErrorIndicator/> : null;


        if (!this.state.item) {
            return <span>Select an item from the list</span>
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

const Record = ({item, field, label}) => {
    return (
        <li className="list-group-item">
            <span className="term">{label}</span>
            <span>{field}</span>
        </li>
    )
};

export {
    Record
}


const ItemView = ({item, image, children}) => {
    const { id, name, gender, birthYear, eyeColor } = item;
    return (
        <React.Fragment>
            <img className="item-image"
                 src={image} alt="avatar"/>

            <div className="card-body">
                <h4>{name}</h4>
                <ul className="list-group list-group-flush">
                    {children}
                </ul>
                <ErrorButton/>
            </div>
        </React.Fragment>
    )
};

