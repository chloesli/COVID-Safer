import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export class Navbar extends Component {
    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <Link to="/find-a-business">Find Business</Link>
                <Link to="/Login">Login</Link>
                <Link to="/UserSignUp">Sign Up</Link>
                <Link to="/UserProfile">Profile</Link>
                <Link to="/BusinessProfile">Business Profile</Link>
                <Link to="/BusinessSignUp">Business Sign Up</Link>
            </div>
        )
    }
}

export default Navbar
