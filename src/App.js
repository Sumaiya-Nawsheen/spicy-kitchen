
import { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Admin from "./component/Admin/Admin";
import CheckOut from "./component/CheckOut/CheckOut";
import Deals from "./component/Deals/Deals";
import Home from './component/Home/Home';
import Login from "./component/Login/Login";
import Orders from "./component/Orders/Orders";
import PrivateRoute from "./component/PrivateRoute/PrivateRoute";

export const UserContext = createContext();

function App() {

  const [loggedInUser, setLoggedInUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    photo: ''
  });

  return (
    <div>
      <UserContext.Provider value={ [loggedInUser, setLoggedInUser] }>
     <Router>
     
        <Switch>
         
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/home">
                <Home/>
           </Route>
           <Route path="/login">
                <Login/>
           </Route>
           <PrivateRoute path="/orders">
             <Orders/>
           </PrivateRoute>
           <PrivateRoute path="/admin">
             <Admin/>
           </PrivateRoute>
           <PrivateRoute path="/deals">
             <Deals/>
           </PrivateRoute>
           <PrivateRoute path="/checkout">
             <CheckOut/>
           </PrivateRoute>
        </Switch>
      
    </Router>
    </UserContext.Provider>
    </div>
  );
}

export default App;
