import React, { useContext, useEffect, useState } from 'react';
import { Col, Container, Form, Jumbotron, Row } from 'react-bootstrap';
import { UserContext } from '../../App';
import NavBar from '../NavBar/NavBar';
import TotalOrder from './TotalOrder';

const Orders = () => {
    const { value1, value2 } = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = value1;
    const [orderedItem, setOrderedItem] = value2;
    // const {title, price} = orderedItem;
    const orderDate = new Date();
    console.log(loggedInUser.email, orderedItem)

    const orderDetail = { ...loggedInUser, ...orderedItem, orderDate };

    fetch("http://localhost:5055/addOrders", {
        method: 'POST',
        headers: { "Content-Type": 'application/json' },
        body: JSON.stringify(orderDetail)
    })
        .then(res => res.json())
        .then(data => console.log(data))



    return (
        <div>
            <div>
                <NavBar />
            </div>

            <div style={{ backgroundColor: 'pink', textAlign: 'center', marginTop: '40px' }}>
                <h3> Your orders</h3>
                <Jumbotron>
                    <h1>Hello, world!</h1>
                    <Container>
                        <Row>

                            <Col lg={6} sm={3}><Form.Control type="text" defaultValue={orderDetail.name} readOnly /></Col>
                            <Col lg={6} sm={3}> <Form.Control type="text" defaultValue={orderDetail.email} readOnly /></Col>
                            <TotalOrder></TotalOrder>

                            {/* {
    
        totalOrders.map(food =><div>
            <Col >1 to 2
            <Form.Control type="text" defaultValue={food.title} readOnly />
          <Form.Control type="text" defaultValue={food.price} readOnly />
         <Form.Control type="text" defaultValue={food.orderDate} readOnly />
            </Col>
 </div>
           )   }  */}

                        </Row>
                    </Container>

                </Jumbotron>
            </div>

        </div>
    );
};

export default Orders;