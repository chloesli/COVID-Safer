import React, { Component } from 'react'
import {AppContext} from '../context'
import { Redirect } from "react-router-dom";
export class BusinessSignUp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email: "",
             password: "",
             bname: "",
             redirect: null,
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
        const {registerNewBusiness} = this.context;
        console.log("hi")
        const user = {
            fname: this.state.fname,
            lname: this.state.lname,
            address: this.state.address,
            email: this.state.email,
            password: this.state.password
        }
        
        registerNewBusiness(user)
            .then((res) => {
                this.setState({redirect: "/Login"})
            }, (res) => {
                console.log(res);
                this.setState({errors: res.response.data.message});
            });
            event.preventDefault();
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <section className="section-wrap">
            <h1>Business Sign Up</h1>   
                <label>
                    First Name:
                    <input type="text" name="fname" value={this.state.fname} onChange={this.handleChange}/>
                </label>
                <label>
                    Last Name:
                    <input type="text" name="lname" value={this.state.lname} onChange={this.handleChange}/>
                </label> 
                <label>
                    Business Address:
                    <input type="text" name="address" value={this.state.address} onChange={this.handleChange}/>
                </label>
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

export default BusinessSignUp
