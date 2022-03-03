import React from 'react';
import {Grid, makeStyles, Typography,IconButton} from "@material-ui/core";
import {Link} from "gatsby";

import facebook from '../../images/facebook.svg'
import twitter from '../../images/twitter.svg'
import instagram from '../../images/instagram.svg'


const useStyles = makeStyles(theme => ({
    footer: {
        backgroundColor: theme.palette.primary.main,
        padding:'2rem'
    },
    linkColumn:{
        width: '20rem'
    },
    link:{
        color: 'white',
        fontSize:'0.95rem',
        // paddingTop:'2rem'
    },
    linkContainer:{
        [theme.breakpoints.down('md')]: {
            marginBottom: '3rem'
        }
    },
    icon:{
        fontSize: '0.5rem',
        "&:hover":{
            backgroundColor: 'transparent'
        }
    },
    "@global": {
        body: {
            margin: 0
        },
        a:{
            textDecoration:'none'
        }
    }
}))

const Footer = () => {

    const classes = useStyles()

    const socialMedia = [
        {link:'https://facebook.com/', icon: facebook, alt:'facebook'},
        {link:'https://twitter.com/', icon: twitter, alt:'twitter'},
        {link:'https://instagram.com/', icon: instagram, alt:'instagram'}
    ]

    const routes = {
        'Contact US': [
            {
                label: '(555) 555-5555',
                href: 'tel: (555) 555-5555'
            },
            {
                label: 'antonio_villegas@hotmail.com',
                href: 'mailto:antonio_villegas@hotmail.com'
            }
        ],
        'Customer Service': [
            {
                label: 'Contact Us',
                link: '/contact'
            },
            {
                label: 'Account',
                link: '/account'
            }
        ],
        'Information': [
            {
                label: 'Privacy Policy',
                link: '/privacy-policy'
            },
            {
                label: 'Terms & Conditions',
                link: '/terms-and-conditions'
            },
        ],
    }

    return (
        <footer className={classes.footer}>
            <Grid container justifyContent={'space-between'}>
                {/*Links*/}
                <Grid item classes={{root: classes.linkContainer}}>
                    <Grid container>
                    {
                        Object.keys(routes).map(category => (
                                <Grid item
                                      container
                                      direction={'column'}
                                      classes={{root: classes.linkColumn}}
                                      key={category}
                                >
                                    <Grid item>
                                        <Typography variant={'h5'}>{category}</Typography>
                                    </Grid>
                                    {
                                        routes[category].map(route => (

                                            <Grid key={route.label} item>
                                                <Typography variant={'body1'}
                                                            classes={{body1: classes.link}}
                                                            to={route.link && route.link}
                                                            href={route.href && route.href}
                                                            component={route.link
                                                                ? Link
                                                                : "a"
                                                }
                                                >{route.label}</Typography>
                                            </Grid>
                                        ) )
                                    }
                                </Grid>
                        ))
                    }

                    </Grid>
                </Grid>
                {/*SocialMediaIcons*/}
                <Grid item >
                    <Grid  container direction={'column'} alignItems={'center'}>
                        {
                            socialMedia.map(platform =>(
                                <Grid
                                    key={platform.alt}
                                    item
                                >
                                    <IconButton
                                        classes={{root: classes.icon}}
                                        component={'a'}
                                        href={platform.link}
                                        disableRipple={true}
                                    >
                                        <img src={platform.icon} alt={platform.alt}/>
                                    </IconButton>
                                </Grid>
                            ))
                        }
                    </Grid>
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;
