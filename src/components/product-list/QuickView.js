import React from 'react';
import {Button, Chip, Dialog, DialogContent, Grid, makeStyles, Typography} from "@material-ui/core";


import frame from "../../images/selected-frame.svg"
import explore from "../../images/explore.svg"
import Rating from "../home/Rating";
import Sizes from "./Sizes";
import Swatches from "./Swatches";
import QtyButton from "./QtyButton";
import {Link} from "gatsby";
import {getStockDisplay} from "../utilities";

const useStyles = makeStyles(theme => ({
    selectedFrame: {
        backgroundImage: `url(${frame})`,
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "60.4rem",
        width: "73.5rem",
        padding: "0 !important",
    },
    dialog: {
        maxWidth: "100%",
    },
    productImage: {
        height: "40rem",
        width: "40rem",
        marginTop: "4rem",
    },
    toolbar: {
        backgroundColor: theme.palette.primary.main,
        height: "13rem",
        marginTop: "2rem",
        padding: "0.5rem 1rem",
        position: "relative",
    },
    stock: {
        color: "#fff",
    },
    details: {
        color: "#fff",
        textTransform: "none",
        fontSize: "1.5rem",
    },
    exploreIcon: {
        height: "1.5rem",
        width: "2rem",
        marginLeft: "0.5rem",
    },
    detailButton: {
        padding: 0,
    },
    infoContainer: {
        height: "100%",
    },
    chipRoot: {
        transform: "scale(1.5)",
    },
    chipContainer: {
        display: "flex",
        alignItems: "center",
    },
    qtyContainer: {
        marginTop: "1.0rem",
    },
    infoItem: {
        position: "absolute",
        left: "1rem",
        height: "calc(100% - 1rem)",
    },
    actionsItem: {
        position: "absolute",
        right: "1rem",
    },
}))

const QuickView = ({
                       open,
                       setOpen,
                       variant,
                       url,
                       name,
                       price,
                       product,
                       sizes,
                       colors,
                       selectedSize,
                       selectedColor,
                       setSelectedSize,
                       setSelectedColor,
                       stock,
                       imageIndex
                   }) => {

    const classes = useStyles()

    const selectedVariant = imageIndex === - 1
        ? product.node.variants.indexOf(variant)
        : imageIndex

    const stockDisplay = getStockDisplay(stock,selectedVariant)

    const productName = product.node.name.split(' ')[0].toLowerCase()

    let detailUrl = `/${product.node.category.name.toLowerCase()}/${productName}`
    if (variant.style) {
        detailUrl = `${detailUrl}?style=${variant.style}`
    }


    return (
        <Dialog open={open}
                onClose={() => setOpen(false)}
                classes={{paper: classes.dialog}}
        >
            <DialogContent classes={{root: classes.selectedFrame}}>
                <Grid container direction={'column'} alignItems={'center'}>
                    <Grid item>
                        <img src={url} alt="no prd img found"
                             className={classes.productImage}/>
                    </Grid>
                    <Grid item
                          container
                          justifyContent={'center'}
                          classes={{root: classes.toolbar}}
                    >
                        <Grid item classes={{root: classes.infoItem}}>
                            <Grid container direction={'column'} justifyContent={'space-between'}
                                  classes={{root: classes.infoContainer}}
                                  to={encodeURI(detailUrl)}
                                  component={Link}
                            >
                                <Grid item>
                                    <Typography variant={'h4'}>
                                        {name}
                                    </Typography>
                                    <Rating number={4}/>
                                </Grid>
                                <Grid item>
                                    <Typography variant={'h3'} classes={{root: classes.stock}}>
                                        {stockDisplay}
                                    </Typography>
                                    <Button classes={{root: classes.detailButton}}>
                                        <Typography variant={'h3'} classes={{root: classes.details}}>
                                            Details
                                        </Typography>
                                        <img src={explore}
                                             className={classes.exploreIcon}
                                             alt="go to product detail page"
                                        />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item
                              classes={{root: classes.chipContainer}}
                        >
                            <Chip label={`$${price}`} classes={{root: classes.chipRoot}}/>
                        </Grid>
                        <Grid item classes={{root: classes.actionsItem}}>
                            <Grid container direction={"column"}>
                                <Sizes sizes={sizes}
                                       selectedSize={selectedSize}
                                       setSelectedSize={setSelectedSize}
                                />
                                <Swatches colors={colors}
                                          selectedColor={selectedColor}
                                          setSelectedColor={setSelectedColor}
                                />
                                <span className={classes.qtyContainer}>
                                    <QtyButton stock={stock}
                                                                                                  selectedVariant={selectedVariant}
                                />
                                </span>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default QuickView;
