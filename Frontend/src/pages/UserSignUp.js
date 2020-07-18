import React, { Component } from 'react'
import {AppContext} from '../context'
import { Redirect } from "react-router-dom";
export class UserSignUp extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email: "",
             password: "",
             fname: "",
             lname: "",
             redirect: null,
             errors: "",
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
        const {registerNewUser} = this.context;
        console.log("hi")
        const user = {
            fname: this.state.fname,
            lname: this.state.lname,
            email: this.state.email,
            password: this.state.password
        }
        
        registerNewUser(user)
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
            <section className="section-wrap" id="signup">
            <h1>Be COVID Safer</h1>    
                <label>
                    First Name:<p></p>
                    <input type="text" name="fname" value={this.state.fname} onChange={this.handleChange}/>
                </label>
                <label>
                    Last Name:<p></p>
                    <input type="text" name="lname" value={this.state.lname} onChange={this.handleChange}/>
                </label>
                <label>
                    Email Address:<p></p>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                </label>
                <label>
                    Password:<p></p>
                    <input type="password" name="password" value={this.state.password} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" onClick={this.handleSubmit}/>
                {(this.state.errors !== "") ?
                    this.state.errors
                : null}
            </section>
        )
    }
}

export default UserSignUp
