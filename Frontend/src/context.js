import React, { Component } from 'react'
export const AppContext = React.createContext();
// <RoomContext.Provider value ={}

export class AppProvider extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user: {},
            businesses: [],
            loggedIn: false, 
            isBusiness: false,
            AuthToken: ""
        }
    }
    userLogin = () => {
        // Make request

        this.setState({
            loggedIn: true,
        })
        return true;
    }
    businessLogin = () => {
        this.setState({
            loggedIn: true,
            isBusiness: true,
        })
        return true;
    }

    signOut = () => {
        this.setState({
            user: {},
            loggedIn: false, 
            isBusiness: false,
        })
    }
    registerNewUser = () => {
        console.log("New user registered")
        return true;
    }
    registerNewBusiness = () => {
        console.log("New business registered")
        return true;
    }
    render() {
        return (
            <AppContext.Provider value={{...this.state, 
                userLogin: this.userLogin, 
                businessLogin: this.businessLogin,
                signOut: this.signOut,
                registerNewUser: this.registerNewBusiness,
                registerNewBusiness: this.registerNewUser,
            }}>
                {this.props.children}
            
            </AppContext.Provider>
        )
    }
}
export const AppConsumer = AppContext.Consumer;

export function withAppConsumer(Component) {
    return function ConsumerWrapper(props) {
        return <AppConsumer>
            {value => <Component {...props} context={value}/>}
        </AppConsumer>
    }
}

export default {AppConsumer, AppContext, AppProvider}
