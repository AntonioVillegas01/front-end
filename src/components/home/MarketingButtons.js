import React from 'react';
import {Grid, makeStyles, Typography} from "@material-ui/core";
import {Link} from "gatsby";

import marketingAdornment from '../../images/marketing-adornment.svg'
import moreByUs from '../../images/more-by-us.svg'
import store from '../../images/store.svg'

const useStyles = makeStyles(theme => ({
    button: {
        backgroundImage: `url(${marketingAdornment})`, backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '50rem',
        height: '50rem',
        transition: 'transform 0.5s ease',
        "&:hover": {
            transform: 'scale(1.1)'
        },
        [theme.breakpoints.down('lg')]: {
            height: '40rem',
            width: '40rem',
            margin: '3rem'
        },
        [theme.breakpoints.down('sm')]: {
            height: '30rem',
            width: '30rem',
        },
        [theme.breakpoints.down('xs')]: {
            height: '18rem',
            width: '18rem',
            margin: '3rem'
        }
    },
    mainContainer: {
        margin: '15rem 0'
    }, icon: {
        [theme.breakpoints.down('sm')]: {
            height: '8rem',
            width: '8rem',
        },
        [theme.breakpoints.down('xs')]: {
            height: '4rem',
            width: '4rem',
        }
    }, label: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '2.75rem'
        },
        [theme.breakpoints.down('xs')]: {
            fontSize: '1.75rem'
        }

    }
}))

const MarketingButtons = () => {

    const classes = useStyles()

    const buttons = [
        {label: 'Store', icon: store, link: '/hoodies'},
        {label: 'More By Us', icon: moreByUs, href: 'https://www.google.com'},
    ]

    return (
        <Grid container justifyContent={'space-around'} classes={{root: classes.mainContainer}}>
            {buttons.map((button, i) => (
                <Grid item key={`${button}-${i}`}>
                    <Grid container
                          alignItems={'center'}
                          justifyContent={'center'}
                          classes={{root: classes.button}}
                          direction={'column'}
                          to={button.link && button.link}
                          href={button.href && button.href}
                          component={button.link ? Link : 'a'}
                    >
                        <Grid item>
                            <img className={classes.icon} src={button.icon} alt={button.label}/>
                        </Grid>
                        <Grid item>
                            <Typography variant={'h1'} classes={{root: classes.label}}>
                                {button.label}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            ))}
        </Grid>
    );
};

export default MarketingButtons;
