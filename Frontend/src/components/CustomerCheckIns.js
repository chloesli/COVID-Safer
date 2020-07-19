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
        })
        .then((res) => {
            console.log(res);
            if(res) {
                getAllVisitors(res)
                    .then((res) => {
                        console.dir(res.data.visitorsWithUsers);
                        this.setState({
                            visitors: res.data.visitorsWithUsers.visitor
                        })
                    })
            }
        })
    }
    parseISOString = (s) => {
        var b = s.split(/\D+/);
        return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
    }
    showVisitors = () => {
        return this.state.visitors.map((visitor, i) => {
            console.dir(visitor)
            return <div key={i} className="place-wrap">
                <div className="place-title">{visitor.owningUser.firstName}</div>
                <div className="place-sub">{this.parseISOString(visitor.arrivalDateTime).toDateString()}</div>
            </div>
        })
    }
    render() {
        let hasPlace = this.context.hasPlace
        return (
            <section className="section-wrap">
            <div className="section-body">
                {!hasPlace ? <CreatePlace/> : 
                    <>
                    <div className="button">
                    <Link to={`/PlaceProfile/${this.state.currentPlace.id}`}>My Store</Link>
                    </div>
                    
                  
                    
                    <p></p>
                    Your Recent Customer Check ins
                    {this.showVisitors()}
                    </>
                    
                }
                </div>
            </section>
        )
    }
}
