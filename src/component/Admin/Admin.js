import React from 'react';
import { Link } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import AddProduct from './AddProduct';

const Admin = () => {
    return (
        <div>
            <NavBar/>
           <h1> Hello Admin</h1>
           <AddProduct/>
           
        </div>
    );
};

export default Admin;