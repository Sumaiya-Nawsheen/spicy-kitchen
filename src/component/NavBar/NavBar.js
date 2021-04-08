import React, { useContext } from 'react';
import { Container, Navbar, Nav, Form, Button } from 'react-bootstrap';
import {
  Link, useHistory
} from "react-router-dom";
import { UserContext } from '../../App';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../Login/firebase.config';
// import { makeStyles } from '@material-ui/core/styles';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { ClickAwayListener, Grow, IconButton, MenuItem, MenuList, Paper, Popper } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';



if (firebase.apps.length === 0) { firebase.initializeApp(firebaseConfig); }

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1100,
    textAlign: 'center',
    margin: '1em',
    boxSizing: 'border-box'
  },


}));



const NavBar = () => {

  const { value1 } = useContext(UserContext);
  const [loggedInUser, setLoggedInUser] = value1;
  const classes = useStyles();
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
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.up('sm'));

  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (

    <Container className={classes.root} >
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" style={{ width: '100%' }}>
        <Navbar.Brand as={Link} to="home">Spicy Kitchen</Navbar.Brand>

        {isMatch ?
          <> <Nav className="mr-auto ms-auto">

          </Nav>
            <Nav>
              <Nav.Link as={Link} to="home">Home</Nav.Link>
              <Nav.Link as={Link} to="orders" >Orders</Nav.Link>
              <Nav.Link as={Link} to="admin">Admin</Nav.Link>
              <Nav.Link as={Link} to="deals">Deals</Nav.Link>
            </Nav>
            <Form inline>
              {
                loggedInUser.isSignedIn ? <Button onClick={handleSignOut} variant="outline-info">  {loggedInUser.name} </Button> : <Button onClick={handleLogin} variant="outline-info">  Login </Button>

              }

            </Form></> :
          <>
            <IconButton>

              <div>
                <Button
                  ref={anchorRef}
                  aria-controls={open ? 'menu-list-grow' : undefined}
                  aria-haspopup="true"
                  onClick={handleToggle}
                >
                  <MenuIcon />
                </Button>
                <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                    >
                      <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                            <MenuItem onClick={handleClose}><Link to="/home">Home</Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link to="/orders">Orders</Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link to="/admin">Admin</Link></MenuItem>
                            <MenuItem onClick={handleClose}><Link to="/deals">Deals</Link></MenuItem>
                            <MenuItem onClick={handleClose}> <Form inline>
                              {
                                loggedInUser.isSignedIn ? <Button onClick={handleSignOut} variant="outline-info">  {loggedInUser.name} </Button> : <Button onClick={handleLogin} variant="outline-info">  Login </Button>

                              }

                            </Form></MenuItem>
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </div>
            </IconButton>
          </>
        }

      </Navbar>
    </Container>

  );
};

export default NavBar;