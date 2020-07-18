import React, { Component } from 'react'
import {AppContext} from '../context'
import { Redirect } from "react-router-dom";
export class RegisterPlace extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            name: "",
            address: "",
            suburb: "",
            postcode: "",
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
        const {registerNewPlace} = this.context;
        console.log("hi")
        const place = {
            name: this.state.name,
            address: this.state.address,
            suburb: this.state.suburb,
            postcode: this.state.postcode
        }
        
        registerNewPlace(place)
            .then((res) => {
                this.setState({redirect: "/"})
            }, (res) => {
                console.log(res);
                this.setState({errors: res});
            });
            event.preventDefault();
    }
    render() {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        return (
            <section className="section-wrap" id="business-signup">
            <h1>Register your Business</h1>   
                <label>
                    Name of Business: <p></p>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                </label>
                <label>
                    Street Address: <p></p>
                    <input type="text" name="address" value={this.state.address} onChange={this.handleChange}/>
                </label> 
                <label>
                    Suburb: <p></p>
                    <input type="text" name="suburb" value={this.state.suburb} onChange={this.handleChange}/>
                </label>
                <label>
                    Postcode: <p></p>
                    <input type="text" name="postcode" value={this.state.postcode} onChange={this.handleChange}/>
                </label>
                <input type="submit" value="Submit" onClick={this.handleSubmit}/>
            </section>
        )
    }
}

export default RegisterPlace
