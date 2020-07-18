import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {IoMdMenu} from "react-icons/io";
const links = [
    <Link to="/">Home</Link>,
    <Link to="/find-a-business">Find Business</Link>,
    <Link to="/Login">Login</Link>,
    <Link to="/UserSignUp">Sign Up</Link>,
    <Link to="/UserProfile">Profile</Link>,
    <Link to="/BusinessProfile">Business Profile</Link>,
    <Link to="/BusinessSignUp">Business Sign Up</Link>,
]


export class Navbar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            showNav: false
        }
    }
    
    linksMapped = () => {
        return (
            <ul>{
                links.map((link, index) => {
                    return <li className={"underline"} key={index}>{link}</li>
                })
                }
            </ul>
            
        )
    }

    toggleSideNav = () => {
        this.setState({
            showNav: !this.state.showNav, 
        })
    }

    render() {
        return (
            <>
                <nav className="navbar">
                    <Link to="/"> <h1>Logo</h1></Link>
                    
                    <div className="links align-left">
                        {this.linksMapped()}
                    </div>
                    <div onClick={this.toggleSideNav} className={this.state.showNav ? "side-nav align-left show" : "side-nav align-left"}>
                        <div  className={this.state.showNav ? "nav-icon show" : "nav-icon"}>
                            <IoMdMenu/>
                        </div>
                        <div className={this.state.showNav ? `nav-drawer show` : `nav-drawer`}>
                        {   this.linksMapped()}
                        </div>
                    </div>
                </nav>
                
            </>
        )
    }
}

export default Navbar
