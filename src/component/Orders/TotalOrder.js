import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';

const TotalOrder = () => {
    const [totalOrders, setTotalOrders] = useState([]);
    const { value1 } = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = value1;
    console.log(loggedInUser.email)
    useEffect(() => {
        fetch('http://localhost:5055/totalOrders?email=' + loggedInUser.email)
            .then(res => res.json())
            .then(data => setTotalOrders(data));
    }, [])
    return (
        <div>
            <h3>You have {totalOrders.length} orders</h3>
            {
                totalOrders.map(food => <li>{food.title}</li>)
            }
        </div>
    );
};

export default TotalOrder;