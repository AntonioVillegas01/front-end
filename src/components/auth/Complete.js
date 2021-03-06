import React from 'react';
import {Button, Grid, makeStyles, Typography} from "@material-ui/core";


import checkmark from "../../images/checkmark-outline.svg"
import forward from "../../images/forward-outline.svg"

const useStyles = makeStyles(theme => ({
    iconText: {
        marginTop: "10rem",
    },
    text: {
        color: theme.palette.secondary.main,
        fontWeight: 700,
        textTransform: "none",
    },
    shop: {
        marginLeft: "1rem",
    },
    shopContainer: {
        marginRight: "1rem",
        marginBottom: "1rem",
    },
}))

export const Complete = () => {

    const classes = useStyles()
    
    return (
        <>
            <Grid item
                  container
                  alignItems={'center'}
                  direction={"column"}
                  classes={{root: classes.iconText}}
            >
                <Grid item>
                    <img src={checkmark} alt="sign up finishes"/>
                </Grid>
                <Grid item>
                    <Typography variant={'h3'} classes={{root:classes.text}}>
                        Account Created!
                    </Typography>
                </Grid>
            </Grid>
            <Grid item container justifyContent={'flex-end'} >
                <Grid item classes={{root:classes.shopContainer}}>
                    <Button>
                        <Typography variant={'h3'} classes={{root:classes.text}}>
                            Shop
                        </Typography>
                        <img src={forward} alt="browse products" className={classes.shop}/>
                    </Button>
                </Grid>
            </Grid>
        </>
    );
};

