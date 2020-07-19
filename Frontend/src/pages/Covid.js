import React, { Component } from 'react'
import {AppContext} from '../context'
import {Link} from 'react-router-dom';
export default class Covid extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            reported: false,
        }
    }
    static contextType = AppContext;
    
    reportCovid = () => {
        const {reportCovid} =  this.context;
        reportCovid().then((res) => {
            this.setState({reported: true})
        })
    }
    render() {
        if (this.state.reported) {
            return (
                <section className="section-wrap">
                    Stay Strong! Thank you for helping out the community!
                    <Link to="/">Back to Home</Link> 
                </section>
            )
        }
        return (
            <section className="section-wrap">
                <h1>Have you had a successful test result?</h1>
                <div className="button" onClick={this.reportCovid}>Yes, Alert All Businesses Visited in past 14 days</div>
            </section>
        )
    }
}
