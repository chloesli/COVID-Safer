import React, { Component } from 'react'
import {Link} from 'react-router-dom'
export class Navbar extends Component {
    render() {
        return (
            <div>
                <Link to="/">Home</Link>
                <Link to="/page">Page1</Link>

            </div>
        )
    }
}

export default Navbar
