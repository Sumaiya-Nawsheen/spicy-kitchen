import React, { useContext } from 'react';
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';
import {
  Link, useHistory
} from "react-router-dom";
import { UserContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config';


if (firebase.apps.length === 0) { firebase.initializeApp(firebaseConfig); }
const NavBar = () => {
  
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
   
  const history = useHistory();
  const handleLogin = () => {
      history.push('/login')
  }

  const handleSignOut = () => {
    firebase.auth().signOut()
        .then(res => {
            const signedOutUser = {
                isSignedIn: false,
                name: '',
                email: '',
                password: '',
                password2: '',
                photo: '',
                error: '',
                success: false
            }
            setLoggedInUser(signedOutUser);
            history.push('/');
        }).catch(err => {
            // An error happened.
        });
}
  
  return (

<Container > 
<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{width:'100%'}}>
    <Navbar.Brand  as={Link} to="home">Spicy Kitchen</Navbar.Brand>
    <Nav className="mr-auto">

    </Nav>
   <Nav>
 <Nav.Link as={Link}  to="home">Home</Nav.Link>
      <Nav.Link as={Link}  to="orders" >Orders</Nav.Link>
      <Nav.Link as={Link}  to="admin">Admin</Nav.Link>
      <Nav.Link as={Link}  to="deals">Deals</Nav.Link>
    </Nav>
    <Form inline>
    {
                        loggedInUser.isSignedIn ? <Button onClick={handleSignOut} variant="outline-info">  {loggedInUser.name} </Button> : <Button onClick={handleLogin}  variant="outline-info">  Login </Button>
                      
    }
  
    </Form>
    
  </Navbar>
</Container>






       




    );
};

export default NavBar;