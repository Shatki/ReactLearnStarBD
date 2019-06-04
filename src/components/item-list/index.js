import React, {Component} from 'react';
import Spinner from '../spinner'

import './style.css';

class ItemList extends Component {
    render() {
        //const items = this.renderItems(this.props.data);
        
        return (
            <ul className="item-list list-group">
                { this.props.items }
            </ul>
        );
    }
}

const withData = (View) => {
    return class extends Component {
        state = {
            data: null
        };

        componentDidMount() {
            const { getData } = this.props;

            getData()
                .then((data) => {
                    this.setState({ data })
                })
        }

        renderItems = (arr) => {
            return arr.map((item) => {
                const {id} = item;
                //console.log('---------->', this.props.children);
                const label = this.props.children(item);
                return (
                    <li key={id}
                        onClick={() => this.props.onItemSelected(id)}
                        className="list-group-item">
                        {label}
                    </li>
                );

            });
        };

        render() {
            const { data } = this.state;

            if (!data) {
                return <Spinner/>;
            }
            return <View {...this.props} data={ data } />
        }
    }
};

export default withData(ItemList);
