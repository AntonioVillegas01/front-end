import React from 'react';
import {Grid, makeStyles, Typography, useMediaQuery} from "@material-ui/core";
import Lottie from 'react-lottie';

import animationData from '../../images/data.json'

const useStyles = makeStyles(theme => ({
    textContainer:{
        padding: '2rem',
        [theme.breakpoints.down('xs')]:{
            padding: '1rem'
        }
    },
    heading:{
        [theme.breakpoints.down('xs')]:{
            fontSize: '3.5rem'
        }
    }
}))

const HeroBlock = () => {

    const classes = useStyles()

    const matchesLG = useMediaQuery(theme => theme.breakpoints.down('lg'))
    const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))
    const matchesXS = useMediaQuery(theme => theme.breakpoints.down('xs'))

    const defaultOptions = {
        loop: true,
        autoplay: false,
        animationData
    }

    return (
        <Grid container
              justifyContent={'space-around'}
              alignItems={'center'}
        >
            <Grid item classes={{root: classes.textContainer}}>
                <Grid container direction={'column'}>
                    <Grid item>
                        <Typography classes={{root: classes.heading}} align={'center'} variant={'h1'}>
                            The Premier
                            <br/>
                            Developer Clothing Line
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Typography variant={'h3'}>
                            high quality, custom-designed shirts, hats and hoodies
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Lottie options={defaultOptions}
                        isStopped
                        width={matchesXS ? '15rem' : matchesMD ? '30rem' : matchesLG ? '40rem' : '50rem'}
                />
            </Grid>
        </Grid>
    );
};

export default HeroBlock;
