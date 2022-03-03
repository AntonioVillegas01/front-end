import React from 'react';
import {Grid, makeStyles, Typography} from "@material-ui/core";
import {Link} from "gatsby";

import marketingAdornment from '../../images/marketing-adornment.svg'
import moreByUs from '../../images/more-by-us.svg'
import store from '../../images/store.svg'

const useStyles = makeStyles(theme => ( {
    button:{
        backgroundImage: `url(${marketingAdornment})`,        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '50rem',
        height: '50rem',
        transition: 'transform 0.5s ease',
        "&:hover":{
            transform: 'scale(1.1)'
        }
    },
    mainContainer:{
        margin: '15rem 0'
    }
}))

const MarketingButtons = () => {

    const classes = useStyles()

    const buttons = [
        {label: 'Store', icon: store, link: '/hoodies'},
        {label: 'More By Us', icon: moreByUs, href: 'https://www.google.com'},
    ]

    return (
        <Grid container justifyContent={'space-around'} classes={{root:classes.mainContainer}}>
            {buttons.map(button => (
                <Grid item >
                    <Grid container
                          alignItems={'center'}
                          justifyContent={'center'}
                          classes={{root: classes.button}}
                          direction={'column'}
                          to={button.link && button.link}
                          href={button.href && button.href}
                          component={button.link ? Link: 'a'}
                    >
                        <Grid item>
                            <img src={button.icon} alt={button.label}/>
                        </Grid>
                        <Grid item>
                            <Typography variant={'h1'}>
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
