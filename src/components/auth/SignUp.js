import React, {useState} from 'react';
import {Grid, IconButton, InputAdornment, makeStyles, TextField, Typography, Button} from "@material-ui/core";


import addUserIcon from "../../images/add-user.svg"
import nameAdornment from "../../images/name-adornment.svg"
import forward from "../../images/forward-outline.svg"
import backward from "../../images/backwards-outline.svg"
import EmailAdornment from "../../images/EmailAdornment";
import {getEmailAndPassword} from "../formFields";
import Fields from "./Fields";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    addUserIcon: {
        height: "10rem",
        width: "11rem",
        marginTop: "5rem",
    },
    facebookSignUp: {
        width: "20rem",
        borderRadius: 50,
        marginTop: "-3rem",
        [theme.breakpoints.down("xs")]: {
            width: "15rem",
        },
    },
    facebookText: {
        textTransform: "none",
        fontSize: "1.5rem",
        [theme.breakpoints.down("xs")]: {
            fontSize: "1.25rem",
        },
    },
    navigation: {
        height: "4rem",
        width: "4rem",
    },
    visibleIcon: {
        padding: 0,
    },
    emailAdornment: {
        height: 17,
        width: 22,
        marginBottom: 10,
    },
    removeButtonMargin: {
        marginTop: 0,
    },
    textField: {
        width: 'rem'
    },
    input: {
        color: theme.palette.secondary.main
    }
}))

const SignUp = ({steps, setSelectedStep}) => {

    const classes = useStyles()
    const [values, setValues] = useState({
        email: '',
        password: '',
        name: ''
    });

    const [errors, setErrors] = useState({});
    const [visible, setVisible] = useState(false);
    const [info, setInfo] = useState(false);

    const handleNavigate = (direction) => {
        if (direction === 'forward') {
            setInfo(true)
        } else {
            if (info) {
                setInfo(false)
            } else {
                const login = steps.find(step => step.label === 'Login')
                setSelectedStep(steps.indexOf(login))
            }

        }
    }

    const nameField = {
        name: {
            helperText: 'You must enter name',
            placeholder: 'Name',
            visible: 'text',
            startAdornment: (
                <img src={nameAdornment} alt="name"/>
            ),
        }
    }
    const fields = info
        ? getEmailAndPassword(classes, false, false, visible, setVisible)
        : nameField


    const handleComplete = ()=> {
        const complete = steps.find(step => step.label === 'Complete')

        setSelectedStep(steps.indexOf(complete))
    }

    return (
        <>
            <Grid item>
                <img src={addUserIcon} alt="new user" className={classes.addUserIcon}/>
            </Grid>
            <Grid item>
                <Fields fields={fields}
                        errors={errors}
                        setErrors={setErrors}
                        values={values}
                        setValues={setValues}
                />
            </Grid>
            <Grid item>
                <Button onClick={()=>  info ? handleComplete(): null}
                        variant={'contained'}
                        color={'secondary'}
                        classes={{
                            root: clsx(classes.facebookSignUp, {
                                [classes.removeButtonMargin]: info
                            })
                        }}>
                    <Typography variant={'h5'} classes={{root: classes.facebookText}}>
                        Sign up {info ? '' : 'with Facebook'}
                    </Typography>
                </Button>
            </Grid>
            <Grid item container justifyContent={'space-between'}>
                <Grid item>
                    <IconButton onClick={() => handleNavigate('backward')}>
                        <img src={backward} alt="back to login" className={classes.navigation}/>
                    </IconButton>
                </Grid>
                {
                    !info && (
                        <Grid item>
                            <IconButton onClick={() => handleNavigate('forward')}>
                                <img src={forward} alt="continue registration" className={classes.navigation}/>
                            </IconButton>
                        </Grid>
                    )
                }

            </Grid>
        </>
    );
};

export default SignUp;
