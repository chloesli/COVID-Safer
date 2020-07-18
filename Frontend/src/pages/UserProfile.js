import React, { Component } from 'react'
import {AppContext} from '../context'
import DefaultIcon from '../components/DefaultIcon';
export class UserProfile extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    static contextType = AppContext;

    render() {
        const {
            fname,
            lname,
            mobile,
            age,
            address,
            email,
        } = this.context.user;
        console.log(this.context);
        return (
            <section className="section-wrap">
                Your Covid Safer Profile
                <DefaultIcon letters={fname[0]}></DefaultIcon>
                <ul>
                    <li>Name: {`${fname} ${lname}`}</li>
                    <li>Mobile: {mobile}</li>
                    <li>Age: {age}</li>
                    <li>Address: {address}</li>
                    <li>Email: {email}</li>
                
                </ul>
            </section>
        )
    }
}

export default UserProfile
