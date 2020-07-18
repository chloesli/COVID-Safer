import React, { Component } from 'react'
import {AppContext} from '../context'
import DefaultIcon from '../components/DefaultIcon';
export class BusinessProfile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    static contextType = AppContext;    
    render() {
        const {
            firstName,
            lastName,
            mobile,
            age,
            address,
            email,
        } = this.context.user;
    
        if (!firstName) {
            return <section className="section-wrap">Please Login to View your Profile</section>
        }
        return (
            <section className="section-wrap profile">
                <h1>Manage your Account</h1>
                <h2>Business Account Details</h2>
                <DefaultIcon letters={firstName[0]}></DefaultIcon>
                <ul>
                    <li>Name: {`${firstName} ${lastName}`}</li>
                    <li>Mobile: {mobile}</li>
                    <li>Age: {age}</li>
                    <li>Address: {address}</li>
                    <li>Email: {email}</li>
                </ul>
                <h2>Places You Manage</h2>
                
            </section>
        )
    }
}

export default BusinessProfile
