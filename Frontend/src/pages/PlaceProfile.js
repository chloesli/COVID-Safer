import React, { Component } from 'react'
import {AppContext} from '../context'
export class PlaceProfile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            bid: parseInt(this.props.match.params.bid),
            currentPlace: {},
            loading: true,
            checkedIn: false,
        }
    }
    static contextType = AppContext;
    componentDidMount() {
        const getAllPlaces = this.context.getAllPlaces();
        getAllPlaces.then((res) => {
            console.log(res, this.state.bid)
            let target = res.data.find((place) => place.id === this.state.bid)
            console.log(target);
            return target;
        })
        .then((res) => {
            this.setState({
                currentPlace: res,
                loading: false,
            })
        })
    }
    checkIn = () => {
        const {checkInUser} = this.context;
        checkInUser(this.state.currentPlace.id).then((res) => {
            this.setState({
                checkedIn: true,
            })
        }, (res) => {
            console.log(res);
        })
    }
    createMarkup = () => {
        if (!this.state.currentPlace) return;
        const {
            covidInstances, 
            locationName,
            address,
            suburb,
            postcode,
        } = this.state.currentPlace;
        return             <>
        <h2>{locationName}</h2>
        <h3>{`${address}, ${suburb} ${postcode}`}</h3>
        {this.state.checkedIn ? <div className="checkIn-but disabled">Thanks for Checking in!</div>
        : <div className="checkIn-but" onClick={this.checkIn}>Check In</div>
        }
        
        <h3>COVID 19 Reports</h3>
 
        {covidInstances ? ((covidInstances.length == 0) ? "COVID Free!" : covidInstances.length)
    
        : null}
        </>
    }
    render() {

        return (
            <section>
                {!this.state.loading ? this.createMarkup() : null}
            </section>
    
        )
    }
}

export default PlaceProfile
