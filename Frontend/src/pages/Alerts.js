import React, { Component } from 'react'

export class Alerts extends Component {
    render() {
        return (
            <section className="section-wrap">
            <h1>You have 1 COVID alert</h1>
            <div className="alert-container">
                <div className="place-title">McDonalds Newtown</div>
                <div className="subtitle">Infected Arrived: 26th June 2020, 1:30pm</div>
            </div>
            </section>
        )
    }
}

export default Alerts
