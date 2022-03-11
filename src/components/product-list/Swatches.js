import React from 'react';
import {Grid, makeStyles, Button} from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
    swatch: {
        border: "3px solid #fff",
        height: "3rem",
        width: "3rem",
        minWidth: 0,
        borderRadius: 50,
    },
    swatchesContainer: {
        marginTop: "0.5rem",
        "&:not(:first-child)": {
            marginLeft: "-0.5rem",
        },
    },
    selected: {
        borderColor: theme.palette.secondary.main,
    },
}))
const Swatches = ({colors, selectedColor, setSelectedColor}) => {

    // console.log(selectedColor)

    const classes = useStyles()

    return (
        <Grid item container >
            {colors.sort().map((color,i) => (
                <Grid item key={`${color}-${i}`} classes={{root: classes.swatchesContainer}}>
                    <Button onClick={()=>setSelectedColor(color)}
                            style={{backgroundColor: color}}
                            classes={{root: clsx(classes.swatch,{
                                [classes.selected] : selectedColor === color
                                })}}/>
                </Grid>
            ))}
        </Grid>
    );
};

export default Swatches;
