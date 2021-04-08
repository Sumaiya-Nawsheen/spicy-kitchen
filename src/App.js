
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

  const [orderedItem, setOrderedItem] = useState([]);

  return (
    <div>
      <UserContext.Provider value={{ value1: [loggedInUser, setLoggedInUser], value2: [orderedItem, setOrderedItem] }}>
        <Router>

          <Switch>

            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/login">
              <Login />
            </Route>
            <PrivateRoute path="/orders">
              <Orders />
            </PrivateRoute>
            <PrivateRoute path="/admin">
              <Admin />
            </PrivateRoute>
            <PrivateRoute path="/deals">
              <Deals />
            </PrivateRoute>
            <PrivateRoute path="/checkout/:_id">
              <CheckOut />
            </PrivateRoute>
          </Switch>

        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
