import React, {useState} from 'react';
import {Grid, makeStyles, Paper} from "@material-ui/core";
import Login from "./Login";
import SignUp from "./SignUp";
import {Complete} from "./Complete";



const useStyles = makeStyles(theme => ({
    paper: {
        border: `2rem solid ${theme.palette.secondary.main}`,
        width: "50rem",
        height: "40rem",
        borderRadius: 0,
        [theme.breakpoints.down("md")]: {
            width: "30rem",
        },
        [theme.breakpoints.down("xs")]: {
            width: "calc(100vw - 2rem)",
            borderWidth: "1rem",
        },
    },
    inner: {
        height: "40rem",
        width: "100%",
        border: `2rem solid ${theme.palette.primary.main}`,
        [theme.breakpoints.down("xs")]: {
            borderWidth: "1rem",
        },
    },
    container: {
        marginBottom: "8rem",
        [theme.breakpoints.down("md")]: {
            marginTop: "5rem",
        },
    },
    "@global": {
        ".MuiInput-underline:before, .MuiInput-underline:hover:not(.Mui-disabled):before": {
            borderBottom: `2px solid ${theme.palette.secondary.main}`,
        },
        ".MuiInput-underline:after": {
            borderBottom: `2px solid ${theme.palette.primary.main}`,
        },
    },
}))

const AuthPortal = () => {

    const classes = useStyles()

    const [selectedStep, setSelectedStep] = useState(0);

    const steps = [
        {component: Login, label: 'Login'},
        {component: SignUp, label: 'Sign Up'},
        {component: Complete, label: 'Complete'},
    ]

    return (
        <Grid container
              justifyContent={"center"}
              classes={{root: classes.container}}>
            <Grid item>
                <Paper elevation={6}
                       classes={{root: classes.paper}}>
                    <Grid container
                          direction={"column"}
                          alignItems={'center'}
                          justifyContent={'space-between'}
                          classes={{root: classes.inner}}
                    >
                        {
                            steps.map((Step, i) => (
                                selectedStep === i
                                    ? <Step.component key={Step.label}
                                                      steps={steps}
                                                      setSelectedStep={setSelectedStep}
                                    />
                                    : null
                            ))
                        }
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default AuthPortal;
