import React, { Component } from 'react'
import {AppContext} from '../context'
import {TiLocation} from "react-icons/ti"

export class SearchPlaces extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            search: "",
            allPlaces: [],
            filteredPlaces: []
        }
        
    } 
    static contextType = AppContext;
    getData = () => {
        const getAllPlaces = this.context.getAllPlaces();
        getAllPlaces.then((res) => {
            this.setState({
                allPlaces: res.data.places,
                filteredPlaces: res.data.places
            })
        })
    }
    componentDidMount() {
        this.getData();
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    filterPlaces = () => {
        let temp = this.state.allPlaces.filter((place) => {
            return place.contains(this.state.search);
        })
        this.setState({
            filteredPlaces: temp
        })
    }
    mapPlaces = (places) => {
        return places.map((place,i) => {
            return <div key={i} className="place-wrap"> 
                    <div className="place-title">{place.name}</div>
                    <div className="place-sub">{place.address}</div>
                    <div className="checkIn-icon"><TiLocation/></div>
                </div>
        })
    }
    render() {
        return (
            <section className="section-wrap">
                <h1>Checking In?</h1>
                <input type="text"name="search" value={this.state.search} onChange={this.handleChange}/>
                {this.mapPlaces(this.state.allPlaces)}
            </section>
        )
    }
}

export default SearchPlaces
