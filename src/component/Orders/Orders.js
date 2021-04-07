import React, { useContext } from 'react';
import { UserContext } from '../../App';
import NavBar from '../NavBar/NavBar';

const Orders = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <NavBar/>
            <h1>Hello {loggedInUser.name} Confirm your orders</h1>
        </div>
    );
};

export default Orders;