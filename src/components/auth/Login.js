import React, {useState} from 'react';
import {Grid, makeStyles, Button, IconButton,  Typography} from "@material-ui/core";
import clsx from "clsx";


import accountIcon from '../../images/account.svg'
import addUserIcon from '../../images/add-user.svg'
import forgotPasswordIcon from '../../images/forgot.svg'
import closeIcon from '../../images/close.svg'
import Fields from "./Fields";
import {getEmailAndPassword} from "../formFields";


const useStyles = makeStyles(theme => ({
    accountIcon: {
        marginTop: "2rem",
    },
    login: {
        width: "20rem",
        borderRadius: 50,
        textTransform: "none",
        [theme.breakpoints.down("xs")]: {
            width: "15rem",
        },
    },
    facebookText: {
        fontSize: "1.5rem",
        fontWeight: 600,
        textTransform: "none",
    },
    facebookButton: {
        marginTop: "-1rem",
    },
    passwordError: {
        marginTop: 0,
    },
    close: {
        paddingTop: 5,
    },
    reset: {
        marginTop: "-4rem",
    },
    buttonText: {
        [theme.breakpoints.down("xs")]: {
            fontSize: "1.5rem",
        },
    },
    textField: {
        width: '20rem'

    }, emailAdornment: {
        height: 17,
        width: 17
    }, passwordAdornment: {
        height: 17,
        width: 17
    },
    input: {
        color: theme.palette.secondary.main
    }
}))

const Login = ({steps, setSelectedStep}) => {
    const classes = useStyles()

    const [values, setValues] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});
    const [visible, setVisible] = useState(false);
    const [forgot, setForgot] = useState(false);

    const fields = getEmailAndPassword(classes,false,forgot,visible,setVisible)

    const navigateSignUp = ()=> {

        const signUp = steps.find(step => step.label === 'Sign Up')

        setSelectedStep(steps.indexOf(signUp))
    }

    return (
        <>
            <Grid item classes={{root: classes.accountIcon}}>
                <img src={accountIcon} alt="loginPage"/>
            </Grid>
            {/*Form*/}
            <Fields fields={fields}
                    errors={errors}
                    setErrors={setErrors}
                    values={values}
                    setValues={setValues}
            />
            {/*Form*/}

            {/*Login Buttons*/}
            <Grid item>
                <Button variant={'contained'} color={'secondary'} classes={{root: clsx(classes.login,{
                    [classes.reset] : forgot
                    })}}>
                    <Typography variant={'h5'}>
                        {forgot ? 'Reset password ' : 'Login'}
                    </Typography>
                </Button>
            </Grid>
            {
                !forgot && (
                    <Grid item>
                        <Button classes={{root: classes.facebookButton}}>
                            <Typography variant={'h3'} classes={{root: clsx(classes.facebookText,{
                                    [classes.passwordError]: errors.password
                                })}}>
                                Login with Facebook
                            </Typography>
                        </Button>
                    </Grid>
                )
            }

            {/*Login Buttons*/}


            <Grid item container justifyContent={"space-between"}>
                <Grid item>
                    <IconButton onClick={navigateSignUp} >
                        <img src={addUserIcon} alt="sign up"/>
                    </IconButton>
                </Grid>
                <Grid item classes={{root: clsx({
                        [classes.close]: forgot === true
                    })}}>
                    <IconButton onClick={()=> setForgot(!forgot)}>
                        <img src={forgot ? closeIcon :forgotPasswordIcon}
                             alt={forgot ? 'Login' : 'ForgotPassword'}
                        />
                    </IconButton>
                </Grid>
            </Grid>
        </>
    );
};

export default Login;
