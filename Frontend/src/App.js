import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Home from './pages/Home'
import FindBusiness from './pages/FindBusiness'
import Login from './pages/Login'
import UserSignUp from './pages/UserSignUp'
import UserProfile from './pages/UserProfile'
import BusinessProfile from './pages/BusinessProfile'
import BusinessSignUp from './pages/BusinessSignUp'
import Logout from './pages/Logout'
import BusinessLogin from './pages/BusinessLogin'
import PlaceProfile from './pages/PlaceProfile'
import RegisterPlace from './pages/RegisterPlace'
import NewBusinessConfirmation from './pages/NewBusinessConfirmation'
import Export from './pages/Export';
import Covid from './pages/Covid';
import Alerts from './pages/Alerts';
import {
  Switch,
  Route,
} from "react-router-dom";
function App() {
  return (
    <>
    <Navbar/>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route exact path="/find-a-business" component={FindBusiness}/>
      <Route exact path="/Login" component={Login}/>
      <Route exact path="/BusinessLogin" component={BusinessLogin}/>
      <Route exact path="/UserSignUp" component={UserSignUp}/>
      <Route exact path="/UserProfile" component={UserProfile}/>
      <Route exact path="/BusinessProfile" component={BusinessProfile}/>
      <Route exact path="/BusinessSignUp" component={BusinessSignUp}/>
      <Route exact path="/Logout" component={Logout}/>
      <Route exact path="/PlaceProfile/:bid" component={PlaceProfile}/>
      <Route exact path="/RegisterPlace" component={RegisterPlace}/>
      <Route exact path="/NewBusinessConfirmation" component={NewBusinessConfirmation}/>
      <Route exact path="/Export" component={Export}/>
      <Route exact path="/Covid" component={Covid}/>
      <Route exact path="/Alerts" component={Alerts}/>
      {
        
        // <Route exact path="/businesses/" component={Rooms}/>
        // {/* Slug is a parameter */}
        // <Route exact path="/businesses/:slug" component={SingleRoom}/>
        // {/* Error if no paths patch */}
        // <Route component={Error}/>
      }
    
    </Switch>
    </>
  );
}

export default App;
