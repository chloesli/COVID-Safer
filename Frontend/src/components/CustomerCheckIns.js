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
            visitors:[],
        }
    }
    static contextType = AppContext;
    componentDidMount() {
        const {getBusinessPlace, getAllVisitors}= this.context;
        getBusinessPlace().then((res) => {
            console.log(res.data.place);
            this.setState({
                currentPlace: res.data.place
            })
            return res.data.place.id;
        }, (res) => {
            console.log("rejected");
            const message = res.response.data.message;
            if(message.toLowerCase() === "no place") {
                this.setState({
                    loading: false,
                })
            }
            return null;
        }).then((res) => {
            if(res) {
                getAllVisitors(res)
                    .then((res) => {
                        console.dir(res.data);
                        this.setState({
                            visitors: res.data
                        })
                    })
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
