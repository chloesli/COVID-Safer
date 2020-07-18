import React, { Component } from 'react'
import {AppContext} from '../context'
import CreatePlace from './CreatePlace'
import {Link} from 'react-router-dom';
export default class CustomerCheckIns extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            currentPlace: {},
            loading: true,
            place: [],
        }
    }
    static contextType = AppContext;
    componentDidMount() {
        const getBusiness= this.context.getBusinessPlace();
        getBusiness.then((res) => {
            console.log(res.data.place);
            this.setState({
                currentPlace: res.data.place
            })
            return true;
        }, (res) => {
            console.log("rejected");
            const message = res.response.data.message;
            if(message.toLowerCase() === "no place") {
                this.setState({
                    loading: false,
                })
            }
            return false;
        }).then((res) => {
            if(res) {
                
            }
        })
    }
    render() {
        let hasPlace = this.context.hasPlace
        return (
            <section className="section-wrap">
                {!hasPlace ? <CreatePlace/> : 
                    <>
                    
                    Your Recent Customer Check ins
                    <Link to={`/PlaceProfile/${this.state.currentPlace.id}`}>View Your Businesses Page</Link>
                    </>
                }
                
            </section>
        )
    }
}
