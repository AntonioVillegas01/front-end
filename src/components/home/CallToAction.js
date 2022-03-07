import React from 'react';
import {Grid, makeStyles, Typography, useMediaQuery} from "@material-ui/core";
import {Link} from "gatsby";

import cta from '../../images/cta.svg'
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    account: {
        color: 'white',
        marginLeft: '2rem'
    }, body: {
        maxWidth: '45rem',
        [theme.breakpoints.down('md')]:{
            padding: '0 1rem'
        },

        [theme.breakpoints.down('xs')]:{
            padding: '0'
        }
    }, buttonContainer:{
        marginTop:'3rem'
    },container: {
        marginBottom: '15rem'
    },
    headingContainer:{
        [theme.breakpoints.down('md')]:{
            margin: '0 1rem'
        }
    },
    icon:{
        [theme.breakpoints.down('xs')]:{
            height: '18rem',
            width: '14rem',
        }
    }
}))

const CallToAction = () => {

    const classes = useStyles()
    const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))

    return (
        <Grid container
              justifyContent={'space-around'}
              alignItems={'center'}
              classes={{root: classes.container}}
              direction={matchesMD ? 'column' : 'row'}
        >
            <Grid item>
                <img className={classes.icon} src={cta} alt="quality committed"/>
            </Grid>
            <Grid item>
                <Grid container direction={'column'}>
                    <Grid item classes={{root: classes.headingContainer}}>
                        <Typography align={matchesMD ? 'center' : undefined} variant={'h1'}>
                            Commited to Quality
                        </Typography>
                    </Grid>
                    <Grid item classes={{root: classes.body}}>
                        <Typography align={matchesMD ? 'center' : undefined} variant={'body1'}>
                            At VAR X our mission is to provide comfortable, durable, premium, designer clothing
                            accesories to developers and technology enthusiasts
                        </Typography>
                    </Grid>
                    <Grid item container
                          justifyContent={matchesMD ? 'center' : undefined}
                          classes={{root: classes.buttonContainer}}>
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
