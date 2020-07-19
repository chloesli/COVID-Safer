import React, { Component } from 'react'
import SearchPlaces from '../components/SearchPlaces'
import {AppContext} from '../context'
import CustomerCheckIns from '../components/CustomerCheckIns'
export class Home extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    static contextType = AppContext;

    render() {
        let {isBusiness} = this.context;
        return (
            <>
                {isBusiness ==="true" ? <CustomerCheckIns/> : <SearchPlaces/>}
            </>
        )
    }
}

export default Home
