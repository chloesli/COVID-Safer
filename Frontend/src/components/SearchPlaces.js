import React, { Component } from 'react'
import {AppContext} from '../context'
import {TiLocation} from "react-icons/ti"
import { Redirect } from "react-router-dom";
export class SearchPlaces extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            search: "",
            allPlaces: [],
            filteredPlaces: [],
            loading: true,
        }
    } 
    static contextType = AppContext;
    getData = () => {
        const getAllPlaces = this.context.getAllPlaces();
        getAllPlaces.then((res) => {
            console.log(res)
            this.setState({
                allPlaces: res.data,
                filteredPlaces: res.data,
                loading: false,
            })
        })
    }
    componentDidMount() {
        this.getData();
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        }, () => {
            this.filterPlaces();
        })
    }
    filterPlaces = () => {
        console.log("f")
        let temp = this.state.allPlaces.filter((place) => {
            return place.locationName.toLowerCase().includes(this.state.search.toLowerCase());
        })
        this.setState({
            filteredPlaces: temp
        })
    }
    redirect = (bid) => {
        this.setState({redirect: `/PlaceProfile/${bid}`})

    }
    mapPlaces = () => {
        return this.state.filteredPlaces.map((place,i) => {
            return <div key={i} className="place-wrap" onClick={() => this.redirect(place.id)}> 
                    <div className="place-title">{place.locationName}</div>
                    <div className="place-sub">{`${place.address} ${place.suburb}`}</div>
                    <div className="checkIn-icon"><TiLocation/></div>
                </div>
        })
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <section className="section-wrap">
                <h1>Checking In?</h1>
                <input type="text"name="search" value={this.state.search} onChange={this.handleChange}/>
                {(!this.state.loading && this.state.allPlaces) ? this.mapPlaces() : null}
            </section>
        )
    }
}

export default SearchPlaces
