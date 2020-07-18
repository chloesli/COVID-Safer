import React from 'react';
import './App.css';
import Navbar from './components/Navbar'
import Home from './pages/Home'
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
