import React, { Component } from 'react'
import {AppContext} from '../context'
export class Logout extends Component {
    static contextType = AppContext;
    componentDidMount() {
        const signOutUser = this.context.signOut; 
        signOutUser();
    }
    render() {
        return (
            <section className="section-wrap">
                You have been signed out! 
            </section>
        )
    }
}

export default Logout
