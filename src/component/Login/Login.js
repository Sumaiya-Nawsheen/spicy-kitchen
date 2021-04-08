import React, { useContext } from 'react';
import { UserContext } from '../../App';
import firebaseConfig from './firebase.config';
import firebase from "firebase/app";
import "firebase/auth";
import { useHistory, useLocation } from 'react-router';
import NavBar from '../NavBar/NavBar';
import Google from '../../images/Group 573.png'

if (firebase.apps.length === 0) { firebase.initializeApp(firebaseConfig); }
const Login = () => {
    const { value1 } = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = value1;
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };


    const handleGoogleSignIn = () => {
        const googleProvider = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
            .signInWithPopup(googleProvider)
            .then((result) => {
                const { displayName, photoURL, email } = result.user;
                const signedUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL
                };
                setLoggedInUser(signedUser)
                history.replace(from);
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                var email = error.email;
                var credential = error.credential;
            });
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className="mt-5" style={{ textAlign: "center" }}>
                <h2> Login With </h2>
                <button onClick={handleGoogleSignIn} style={{ borderRadius: "15px" }}><img src={Google} alt="" style={{ width: '15%', height: '25%' }} />  Continue with Google </button>

            </div>
        </div>
    );
};

export default Login;