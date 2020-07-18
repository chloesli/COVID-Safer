import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {AppContext} from '../context'
import {IoMdMenu} from "react-icons/io";
const allLinks = [
    <Link to="/">Home</Link>,
    <Link to="/find-a-business">Find Business</Link>,
    <Link to="/Login">Login</Link>,
    <Link to="/BusinessLogin">Business Login</Link>,
    <Link to="/UserSignUp">Sign Up</Link>,
    <Link to="/UserProfile">My Profile</Link>,
    <Link to="/BusinessProfile">Business Profile</Link>,
    <Link to="/BusinessSignUp">Business Sign Up</Link>
]
const nonAuthLinks = [
    <Link to="/Login">Login</Link>,
    <Link to="/BusinessLogin">Business Login</Link>,
    <Link to="/UserSignUp">Sign Up</Link>,
    <Link to="/BusinessSignUp">Business Sign Up</Link>
]
const businessLinks = [
    <Link to="/">Home</Link>,
    <Link to="/BusinessProfile">Business Profile</Link>,
]

const userLinks = [
    <Link to="/">Home</Link>,
    <Link to="/UserProfile">Profile</Link>,
]

export class Navbar extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            showNav: false,
            redirect: null,
        }
    }
    static contextType = AppContext;
    linksMapped = (links) => {
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
        let {isBusiness, loggedIn} = this.context;
        return (
            <>
                <nav className="navbar">
                    <Link to="/"> <h1>Logo</h1></Link>
                    
                    <div className="links align-left">
                        {this.linksMapped(businessLinks)}
                    </div>
                    <div onClick={this.toggleSideNav} className={this.state.showNav ? "side-nav align-left show" : "side-nav align-left"}>
                        <div  className={this.state.showNav ? "nav-icon show" : "nav-icon"}>
                            <IoMdMenu/>
                        </div>
                        <div className={this.state.showNav ? `nav-drawer show` : `nav-drawer`}>
                        {
                            loggedIn === "false" ? this.linksMapped(nonAuthLinks): 
                            (isBusiness === "true" ? this.linksMapped(businessLinks) : this.linksMapped(userLinks))
                        
                        }
                        {
                            loggedIn ==="true" ? <Link to="/Logout" className="logout-but"> Sign out</Link> : null
                        }
                        </div>
                    </div>
                </nav>
                
            </>
        )
    }
}

export default Navbar
