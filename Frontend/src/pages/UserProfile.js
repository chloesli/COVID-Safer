import React, { Component } from 'react'
import {AppContext} from '../context'
import UserIcon from '../components/UserIcon';
export class UserProfile extends Component {
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
        console.log(this.context);
        if (!firstName) {
            return <section className="section-wrap">Please Login to View your Profile</section>
        }
        return (
            <section className="section-wrap profile">
                <h1>Your Covid Safer Profile</h1>
                <UserIcon letters={firstName[0]}></UserIcon>
                <ul>
                    <li>Name: {`${firstName} ${lastName}`}</li>
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
