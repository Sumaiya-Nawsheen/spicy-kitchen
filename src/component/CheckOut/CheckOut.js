import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router';
import NavBar from '../NavBar/NavBar';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';



const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);



const useStyles = makeStyles({
    table: {
        minWidth: 500,
        maxWidth: 600,
        marginLeft: 300,
        marginTop: 30
    },
});



const CheckOut = () => {

    const { value2 } = useContext(UserContext);
    const [orderedItem, setOrderedItem] = value2;
    const classes = useStyles();
    const { _id } = useParams();

    console.log(_id)
    useEffect(() => {
        fetch(`http://localhost:5055/checkout/${_id}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setOrderedItem(data)
            })
    }, [_id])



    return (
        <div>
            <div>
                <NavBar />
            </div>

            <div style={{ marginTop: '20px' }}>
                <h1 style={{ color: 'rgb(230, 115, 0)', marginLeft: '30px' }}> YOUR CHECKOUT DETAILS</h1>

                <div>
                    <TableContainer component={Paper} >
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Food Item </StyledTableCell>
                                    <StyledTableCell align="right">Calories</StyledTableCell>
                                    <StyledTableCell align="right">Price</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <StyledTableRow key={orderedItem.title}>
                                    <StyledTableCell component="th" scope="row">
                                        {orderedItem.title}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">50</StyledTableCell>
                                    <StyledTableCell align="right">{orderedItem.price}</StyledTableCell>

                                </StyledTableRow>

                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>

            </div>
            <div style={{ marginLeft: "800px" }}>
                <Link to="/orders"><Button>Checkout</Button>
                </Link>
            </div>
        </div>
    );
};

export default CheckOut;