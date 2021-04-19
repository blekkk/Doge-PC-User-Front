import React from 'react';
import style from '../styles/Users.module.css'

class Users extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.data.name,
            age: this.props.data.age,
            address: {
                city: this.props.data.address ? this.props.data.address.city : null,
                region: this.props.data.address ? this.props.data.address.region : null,
                country: this.props.data.address ? this.props.data.address.country : null
            },
            isMarried: this.props.data.isMarried
        }
    }

    render() {
        let addressEle;
        if (this.state.address.country) {
            addressEle = (
                <>
                    <p>City:{this.state.address.city}</p>
                    <p>Region:{this.state.address.region}</p>
                    <p>Country:{this.state.address.country}</p>
                </>
            )
        }
        return (

            <div className={style.container}>
                <p>Name: {this.state.name}</p>
                <p>Age: {this.state.age}</p>
                {addressEle}
                <p>{this.state.isMarried}</p>
            </div>

        )
    }
}

export default Users;