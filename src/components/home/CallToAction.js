import React from 'react';
import {Grid, makeStyles, Typography} from "@material-ui/core";
import {Link} from "gatsby";

import cta from '../../images/cta.svg'
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    account: {
        color: 'white',
        marginLeft: '2rem'
    }, body: {
        maxWidth: '45rem'
    }, buttonContainer:{
        marginTop:'3rem'
    },container: {
        marginBottom: '15rem'
    }
}))

const CallToAction = () => {

    const classes = useStyles()

    return (
        <Grid container
              justifyContent={'space-around'}
              alignItems={'center'}
              classes={{root: classes.container}}>
            <Grid item>
                <img src={cta} alt="quality committed"/>
            </Grid>
            <Grid item>
                <Grid container direction={'column'}>
                    <Grid item>
                        <Typography variant={'h1'}>
                            Commited to Quality
                        </Typography>
                    </Grid>
                    <Grid item classes={{root: classes.body}}>
                        <Typography variant={'body1'}>
                            At VAR X our mission is to provide comfortable, durable, premium, designer clothing
                            accesories to developers and technology enthusiasts
                        </Typography>
                    </Grid>
                    <Grid item container classes={{root: classes.buttonContainer}}>
                        <Grid item>
                            <Button variant="outlined"
                                    color={'primary'}
                                    to={'/contact'}
                                    component={Link}
                            >
                                Contact Us
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant="contained"
                                    classes={{root: classes.account}}
                                    color={'primary'}
                                    to={'/account'}
                                    component={Link}
                            >
                                Create account
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default CallToAction;
