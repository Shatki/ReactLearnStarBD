import React, {Component} from 'react';
import Spinner from '../spinner'

import './style.css';

export default class ItemList extends Component {
    state = {
        itemList: null
    };

    componentDidMount() {
        const {getData} = this.props;

        getData()
            .then((itemList) => {
                this.setState({itemList})
            })
    }

    renderItems = (arr) => {
        return arr.map((item) => {
            const { id } = item;
            //console.log('---------->', this.props.children);
            const label = this.props.children(item);
            return (
                <li key={id}
                    onClick={() => this.props.onItemSelected(id)}
                    className="list-group-item">
                    { label }
                </li>
            );

        });
    };

    render() {
        const { itemList } = this.state;

        if ( !itemList ) {
            return <Spinner/>;
        }
        const items = this.renderItems(itemList);

        return (
            <ul className="item-list list-group">
                { items }
            </ul>
        );
    }
}
