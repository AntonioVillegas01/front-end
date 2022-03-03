import React from 'react';
import {Grid, Typography} from "@material-ui/core";
import Lottie from 'react-lottie';

import animationData from '../../images/data.json'

const HeroBlock = () => {

    const defaultOptions = {
        loop: true,
        autoplay: false,
        animationData
    }

    return (
        <Grid container
              justifyContent={'space-around'}
              alignItems={'center'}
              style={{marginLeft:'20px'}}
        >
            <Grid item>
                <Grid container direction={'column'}>
                    <Grid item>
                        <Typography align={'left'} variant={'h1'}>
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
                        width={'50rem'}/>
            </Grid>
        </Grid>
    );
};

export default HeroBlock;
