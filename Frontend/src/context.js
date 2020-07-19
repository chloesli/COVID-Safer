import React, { Component } from 'react'
import axios from 'axios'
export const AppContext = React.createContext();
// <RoomContext.Provider value ={}
export class AppProvider extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            user: JSON.parse(localStorage.getItem('user')) || {},
            businesses: [],
            loggedIn: localStorage.getItem('loggedIn') || "false", 
            isBusiness: localStorage.getItem('isBusiness') || "false",
            authToken: localStorage.getItem('authToken') || "",
            hasPlace: false,
        }
    }
    userLogin = (user) => {
        // Make request
        console.log(user);
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:1337/api/auth/login?emailAddress=${user.email}&password=${user.password}`)
            .then((res) => {

                console.dir(res);
                this.setState({
                    loggedIn: "true",
                    user: res.data.user,
                    authToken: res.data.token,
                    isBusiness: res.data.user.isBusiness.toString(),
                })
                localStorage.setItem('user', JSON.stringify(res.data.user))
                localStorage.setItem('loggedIn', "true")
                localStorage.setItem('isBusiness', res.data.user.isBusiness.toString())
                localStorage.setItem('authToken', res.data.token);
                resolve("Login Success");
            })
            .catch((err) => {
                console.log(err);
                reject(err);
            })
        })

    }
    getBusinessPlace = () => {
        const config = {
            headers: { Authorization: `Bearer ${this.state.authToken}` }
        };
        return new Promise((resolve, reject) => {
            axios.get('http://localhost:1337/api/find-by-user', config)
            .then((res) => {
                console.dir(res);
                this.setState({
                    businesses: res.data.place,
                    hasPlace: true
                })
                resolve(res);
            }, (res) => {
                this.setState({
                    hasPlace: false
                })
                console.log(res);
                reject(res);
            })
        })
        
    }
    signOut = () => {
        localStorage.clear();

        this.setState({
            user: {},
            loggedIn: "false", 
            isBusiness: "false",
        })
    }
    registerNewUser = (user) => {
        console.log(user);
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:1337/api/auth/register?emailAddress=${user.email}&password=${user.password}&firstName=${user.fname}&lastName=${user.lname}`)
                .then((res) => {
                    console.log(res);
                    resolve("User Successfully Created")
                }, (res) => {
                    reject(res)
                })
        })
    }
    registerNewBusiness = (business) => {
        console.log(business)
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:1337/api/auth/register?emailAddress=${business.email}&password=${business.password}&firstName=${business.fname}&lastName=${business.lname}&isBusiness=true&address=${business.address}&ageRange=`)
                .then((res) => {
                    console.log(res);
                    resolve("Business Successfully Created")
                }, (res) => {
                    reject(res)
                })
        })
    }
    registerNewPlace = (place) => {
        console.log(place);
        const config = {
            headers: { Authorization: `Bearer ${this.state.authToken}` }
        };
        return new Promise((resolve, reject) => {
            axios.post(`http://localhost:1337/api/add-place?name=${place.name}&address=${place.address}&suburb=${place.suburb}&postcode=${place.postcode}`, null, config)
                .then((res) => {
                    console.log(res);
                    resolve("place Successfully Created")
                }, (res) => {
                    reject(res)
                })
        })
    }
    getAllVisitors = (id) => {
        const config = {
            headers: { Authorization: `Bearer ${this.state.authToken}` }
        };
        return new Promise((resolve, reject) => {
            axios.get(`http://localhost:1337/api/users-visited?placeId=${id}`, config)
                .then((res) => {
                    resolve(res);
                }, (res) => {
                    reject(res);
                })
        })
    }
    reportCovid = () => {
        console.log(this.state.authToken);
        const config = {
            headers: { Authorization: `Bearer ${this.state.authToken}` }
        };
        return new Promise((resolve, reject) => { 
            let ISODate = new Date().toISOString();
            axios.post(`http://localhost:1337/api/covid?dateAcquired=${ISODate}`, null, config)
                .then((res) => {
                    console.log(res);
                    resolve(res)
                }, (res) => {
                    reject(res)                
                })
        })
    }
    getAllPlaces = () => {
        console.log(this.state.authToken);
        const config = {
            headers: { Authorization: `Bearer ${this.state.authToken}` }
        };
        return new Promise((resolve, reject) => { 
            axios.get('http://localhost:1337/place', config)
                .then((res) => {
                    console.log(res);
                    resolve(res)
                }, (res) => {
                    reject(res)                
                })
        })
    }
    getUsersPlaces = () => {
        return new Promise((resolve, reject) => { 
            axios.get('http://localhost:1337/place')
                .then((res) => {
                    console.log(res);
                    resolve("Places Successful")
                }, (res) => {
                    reject(res)                
                })
        })
    }
    checkInUser = (placeId) => {
        const config = {
            headers: { Authorization: `Bearer ${this.state.authToken}` }
        };
        return new Promise((resolve, reject) => {
            let dateNow = new Date().toISOString();
            axios.post(`http://localhost:1337/api/check-in?enteredDatetime=${dateNow}&placeId=${placeId}`, null, config)
                .then((res) => {
                    console.log(res);
                    resolve("Check In Success")
                }, (res) => {
                    reject(res);
                })
        })
    }
    render() {
        return (
            <AppContext.Provider value={{...this.state, 
                userLogin: this.userLogin, 
                signOut: this.signOut,
                registerNewUser: this.registerNewUser,
                registerNewBusiness: this.registerNewBusiness,
                getAllPlaces: this.getAllPlaces,
                checkInUser: this.checkInUser,
                getBusinessPlace: this.getBusinessPlace,
                registerNewPlace: this.registerNewPlace,
                getAllVisitors: this.getAllVisitors,
                reportCovid: this.reportCovid,
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
