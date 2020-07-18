import React, { Component } from 'react'
import {AppContext} from '../context'
import { Redirect } from "react-router-dom";
export class BusinessLogin extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email: "",
             password: "",
             redirect: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    static contextType = AppContext;
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }
    
    handleSubmit(event) {
        const {businessLogin} = this.context;
        console.log("hi")
        let loginStatus = businessLogin();
        if (loginStatus) {
            this.setState({redirect: "/"})
        }
        event.preventDefault();
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <section className="section-wrap">
            <h1>Business Login</h1>    
                <label>
                    Email Address:
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" onClick={this.handleSubmit}/>
            </section>
        )
    }
}

export default BusinessLogin
