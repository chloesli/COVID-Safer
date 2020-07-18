import React, { Component } from 'react'
import {users} from './Data'
export const AppContext = React.createContext();
// <RoomContext.Provider value ={}
export class AppProvider extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            users: users,
            user: {
                fname: "Angela",
                lname: "Huang2",
                mobile:4123123212,
                age: 20,
                address: "1 Sydney Road, Sydney NSW",
                email: "angela.huang@gmail.com",
                password: "apurva"
            },
            businesses: [],
            loggedIn: false, 
            isBusiness: false,
            AuthToken: ""
        }
    }
    userLogin = (user) => {
        // Make request
        let currUser = users.find((u) => u.email === user.email);
        this.setState({
            loggedIn: true,
            user: currUser
        })
        console.log(currUser);
        return true;
    }
    businessLogin = (business) => {
        
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
    registerNewUser = (user) => {
        console.log(user)
        return true;
    }
    registerNewBusiness = (business) => {
        console.log(business)
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
