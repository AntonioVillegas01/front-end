import React from 'react';
import clsx from 'clsx'
import {Button, Grid, makeStyles, Typography} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    size: {
        color: "#fff",
    },
    button: {
        border: "3px solid #fff",
        borderRadius: 50,
        height: "3rem",
        width: "3rem",
        minWidth: 0,
    },
    selected: {
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
            backgroundColor: theme.palette.secondary.main,
        },
    },
}))

const Sizes = ({sizes, selectedSize, setSelectedSize}) => {

    const classes = useStyles()

    const posibleSizes = ['S', 'M', 'L']
    const posibleExtraSizes = ['S', 'M', 'L', 'XL']
    let actualSizes = []

    /*
        Programmaticaly order the sizes buttons
        with the statement below
     */

    if (posibleSizes.every(size => sizes.includes(size))) {
        actualSizes = posibleSizes
    } else if (posibleExtraSizes.every(size => sizes.includes(size))) {
        actualSizes = posibleExtraSizes
    }

    return (
        <Grid item container justifyContent={'space-between'}>
            {actualSizes.map((size, i) => (
                <Grid item
                      key={i}
                >
                    <Button onClick={() => {
                        setSelectedSize(size)
                    }}
                            classes={{
                                root: clsx(classes.button, {
                                    [classes.selected]: selectedSize === size
                                })
                            }}

                    >
                        <Typography variant={'h3'} classes={{root: classes.size}}>
                            {size}
                        </Typography>
                    </Button>
                </Grid>
            ))}
        </Grid>
    );
};

export default Sizes;
