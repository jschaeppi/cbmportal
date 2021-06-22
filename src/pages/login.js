import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import CbmContext from '../context/cbm/cbmContext';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Spinner from '../Components/SpinnerImage';
import '../css/login.css';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    loginForm: {
        margin: theme.spacing(3),
        width: '100'
    }
}))

const Login = (props) => {
    const classes = useStyles();
    const cbmContext = useContext(CbmContext);
    const history = useHistory();

    const { loginUser, isAuthenticated, loginStatus, clearErrors, user} = cbmContext;
    let { errorMessage, loading } = cbmContext;

    const onSubmit = (e) => {
        e.preventDefault();
        const user = document.getElementById('user').value.toLowerCase();
        const pass = document.getElementById('pass').value;
        loginUser(user, pass)
            if (!loading) {
            history.push('/')
            }
            
}

        useEffect(() => {
            
            if (isAuthenticated) {
                history.push('/');
            } else if (!isAuthenticated && user && !loading) {
                    loginStatus();
                }
            // eslint-disable-next-line
            }, [isAuthenticated]);
            if (loading) {
                return <Spinner />
            } else {

        return (
            <Container fixed maxWidth="md">
                <div id="loginError">
                    {errorMessage ? clearErrors() : errorMessage=''}<p>{errorMessage}</p>
                </div>
                <form onSubmit={e => onSubmit(e)}>
                    <Grid container justify="center" spacing={3} alignItems="center" direction="column" className={classes.loginForm}>
                        <Grid item xs={12}>
                            <TextField id="user" 
                                        label="Username" 
                                        type="text" 
                                        required 
                                        inputProps={{
                                            maxLength: 20,
                                            minLength: 3
                                        }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField id="pass" label="Password" type="password" required />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" color="primary" type="submit">
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        )
    }
}
export default Login