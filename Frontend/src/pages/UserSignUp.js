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
            <section className="section-body">
            {/* <svg id='vec1' width="375" height="72" viewBox="0 0 375 72" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M1.98626 45.7979C-41.5366 50.7416 -63.7219 -4.94921 -28.7214 -31.2864L6.04626 -57.4484C11.0196 -61.1906 16.7459 -63.8087 22.8298 -65.1217L305.067 -126.031C320.288 -129.316 336.096 -124.115 346.393 -112.435L428.442 -19.367C440.817 -5.33005 442.693 15.0986 433.081 31.1547L426.123 42.7777C416.696 58.5257 398.313 66.5542 380.354 62.7662L320.202 50.0784C314.641 48.9055 308.902 48.8466 303.319 49.905L191.297 71.1401C180.789 73.132 169.916 71.1366 160.801 65.5434L121.463 41.4067C113.282 36.3874 103.658 34.2491 94.1213 35.3323L1.98626 45.7979Z" fill="white" fill-opacity="0.33"/>
</svg>
<svg id='vec2' width="375" height="127" viewBox="0 0 375 127" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M-15.0137 100.798C-58.5366 105.742 -80.7219 50.0508 -45.7214 23.7136L-10.9537 -2.44836C-5.98046 -6.19061 -0.254135 -8.80866 5.82977 -10.1216L288.067 -71.0313C303.288 -74.3162 319.096 -69.1155 329.393 -57.435L411.442 35.633C423.817 49.67 425.693 70.0986 416.081 86.1547L409.123 97.7778C399.696 113.526 381.313 121.555 363.354 117.766L303.202 105.079C297.641 103.906 291.902 103.847 286.319 104.905L174.297 126.14C163.789 128.132 152.916 126.137 143.801 120.544L104.463 96.4068C96.2823 91.3874 86.658 89.2492 77.1218 90.3324L-15.0137 100.798Z" fill="white" fill-opacity="0.33"/>
</svg>
<svg id='vec3' width="375" height="157" viewBox="0 0 375 157" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M-29.0139 172.798C-72.5368 177.742 -94.7221 122.051 -59.7216 95.7139L-24.9539 69.5519C-19.9806 65.8099 -14.2543 63.1919 -8.17034 61.8789L274.067 0.968793C289.288 -2.31611 305.096 2.88459 315.393 14.5651L397.442 107.633C409.817 121.67 411.693 142.099 402.081 158.155L395.123 169.778C385.696 185.526 367.313 193.555 349.354 189.766L289.202 177.079C283.641 175.906 277.902 175.847 272.319 176.905L160.297 198.14C149.789 200.132 138.916 198.137 129.801 192.544L90.4627 168.407C82.2823 163.388 72.6578 161.249 63.1216 162.333L-29.0139 172.798Z" fill="white" fill-opacity="0.33"/>
</svg>
<svg id='vec4' width="375" height="102" viewBox="0 0 375 102" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M-46.0138 172.798C-89.5367 177.742 -111.722 122.051 -76.7215 95.7139L-41.9538 69.5519C-36.9805 65.8099 -31.2542 63.1919 -25.1703 61.8789L257.067 0.968938C272.288 -2.31606 288.096 2.88493 298.393 14.5649L380.442 107.633C392.817 121.67 394.693 142.099 385.081 158.155L378.123 169.778C368.696 185.526 350.313 193.555 332.354 189.766L272.202 177.079C266.641 175.906 260.902 175.847 255.319 176.905L143.297 198.14C132.789 200.132 121.916 198.137 112.801 192.544L73.4628 168.407C65.2824 163.388 55.6579 161.249 46.1217 162.333L-46.0138 172.798Z" fill="white" fill-opacity="0.33"/>
</svg> */}


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
            </section>
        )
    }
}

export default UserSignUp
