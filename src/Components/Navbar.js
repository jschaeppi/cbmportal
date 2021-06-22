import React, { Fragment, useContext, useState } from 'react';
import '../css/NavBar.css';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Link from '@material-ui/core/Link';
import ToolBar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import CbmContext from '../context/cbm/cbmContext';
import { routes } from '../routing/routes';


const drawerWidth = '300';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    drawer: {
        width: drawerWidth,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
  }));

const NavBar = () => {
    const cbmContext = useContext(CbmContext);
    const { isAuthenticated, user, loading } = cbmContext;
    const classes = useStyles()
    const [drawerState, setdrawerState] = useState(false);
    const [accountToggle, setAccountToggle] = useState(false);

    const toggleDrawer = () => {
        setdrawerState(!drawerState);
    }

    const toggleAccount = () => {
        setAccountToggle(!accountToggle);
    }

    const authLinks = (
                <List >
                {routes.map(({path, heading}, key)=> {
                    return <ListItem button component={RouterLink} to={path} key={key}><ListItemText primary={heading}></ListItemText></ListItem>
                })}
                </List>
            );

    return (
        <nav>
            <AppBar>
                <ToolBar className={classes.toolbar} >
                    {isAuthenticated ? <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton> : ''}
                    <Typography variant="h6" className={classes.title}>
                        Forms
                    </Typography>
                    { isAuthenticated ?
                    <Fragment >
                        <IconButton edge="end" className={classes.menuButton} color="inherit" aria-label="login controls" onClick={toggleAccount}>
                            <AccountCircle />
                        </IconButton>
                        <Menu open={accountToggle} 
                                onClose={toggleAccount} 
                                anchorOrigin={{vertical: 'top', horizontal: 'right'}}
                                >
                            <MenuItem 
                                onClick={toggleAccount} 
                            > 
                                <Link to="/logout">  
                                <i className="fas fa-sign-out-alt">
                                    Logout
                                </i>
                                </Link> 
                            </MenuItem>
                            { cbmContext.user.permission > '1' ? 
                            <MenuItem 
                            onClick={toggleAccount} 
                            > 
                            <a 
                            href="http://localhost:5000/admin/dashboard">
                                <i className="fas fa-user-shield">
                                    Admin
                                </i>
                            </a> 
                            </MenuItem> : '' }
                        </Menu> 
                    </Fragment>: null
                    }
                </ToolBar>
            </AppBar>
            <div className={classes.toolbar} />
            <Drawer className={classes.drawer} anchor="left" open={drawerState} onClose={toggleDrawer}>
                {authLinks}
            </Drawer>
        </nav>
    );
}

export default NavBar;