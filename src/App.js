import React, { createContext, useState } from "react";
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import PrivateRoute from "./Components/LoginModel/PrivateRoute/PrivateRoute.js"
import Navber from "./Components/HomePage/Navber/Navber";
import Home from "./Components/HomePage/Home/Home";
import LogIn from "./Components/LoginModel/Login/LogIn";
import Destination from "./Components/Destination/Destination/Destination";
export const UserContext = createContext();


function App() {

  const [loggedInUser, setLoggedInUser]= useState({})
  const [ticket, setTicket] = useState(100);
  const [search, setSearch] = useState({});
  return (
    <UserContext.Provider value={{loggedInUser, setLoggedInUser ,  ticket, setTicket,search, setSearch }}>
        <Router>
        <Navber />
           <Switch>

          <Route exact path="/">
           <Home></Home>
          </Route>

          <Route path="/login">
          <LogIn></LogIn>
          </Route> 

          <PrivateRoute path="/destination">
          <Destination></Destination>
          </PrivateRoute> 

          </Switch>
    
    </Router>
    </UserContext.Provider>
  );
}

export default App;
