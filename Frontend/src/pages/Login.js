import React, { Component } from 'react'
import {AppContext} from '../context'
import { Redirect } from "react-router-dom";
export class Login extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             email: "",
             password: "",
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
        const {userLogin} = this.context;
        const user = {
            email: this.state.email,
            password: this.state.password
        }
        userLogin(user)
            .then((res) => {
                this.setState({errors: "", redirect: "/"})
            }, (res) => {
                console.dir(res);
                this.setState({errors:"Wrong User Credentials, Please try again."})
            })
       
        event.preventDefault();
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        
        return (
            <section className="section-wrap" id="login">
            <h1>Login</h1>    
                <label class='inputfield'>
                    Email Address: <p></p>
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange}/>
                </label>
                <label class='inputfield'>
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

export default Login
