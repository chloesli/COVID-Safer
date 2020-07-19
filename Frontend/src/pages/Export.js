import React, { Component } from 'react'

export default class Export extends Component {
    render() {
        return (
            <section className="section-wrap">
            <div className="section-body">
            
                <h1>Export Customer (CSV)</h1>
                Date Range:
                <select name="cars" id="cars">
                    <option value="volvo">Today</option>
                    <option value="saab">Past 7 days</option>
                    <option value="saab">Past 14 days</option>
                    <option value="mercedes">Past 28 days</option>
       
              </select>  

              <div className="button">Email</div>
              <div className="button">Download</div>
              </div>
            </section>
        )
    }
}
