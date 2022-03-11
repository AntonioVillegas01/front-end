import React, {useState} from 'react';
import {Grid, makeStyles, Typography, useMediaQuery} from "@material-ui/core";
import clsx from "clsx";
import QuickView from "./QuickView";

import frame from "../../images/product-frame-grid.svg"
import {colorIndex} from "../utilities";
import {navigate} from "gatsby";

const useStyles = makeStyles(theme => ({
    frame: {
        backgroundImage: `url(${frame})`,
        backgroundPosition: "center",
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        height: "25rem",
        width: "25rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        [theme.breakpoints.down("xs")]: {
            height: "20rem",
            width: "20rem",
        },
        [theme.breakpoints.up("xs")]: {
            height: ({small}) => (small ? "15rem" : undefined),
            width: ({small}) => (small ? "15rem" : undefined),
        },
    },
    product: {
        height: "20rem",
        width: "20rem",
        [theme.breakpoints.down("xs")]: {
            height: "15rem",
            width: "15rem",
        },
        [theme.breakpoints.up("xs")]: {
            height: ({small}) => (small ? "12rem" : undefined),
            width: ({small}) => (small ? "12rem" : undefined),
        },
    },
    title: {
        backgroundColor: theme.palette.primary.main,
        height: "5rem",
        width: "25rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "-0.1rem",
        [theme.breakpoints.down("xs")]: {
            width: "20rem",
        },
        [theme.breakpoints.up("xs")]: {
            width: ({small}) => (small ? "15rem" : undefined),
        },
    },
    invisibility: {
        visibility: "hidden",
    },
    frameContainer: {
        "&:hover": {
            cursor: "pointer",
        },
    },
}))


const ProductFrameGrid = ({
                              product,
                              variant,
                              sizes,
                              colors,
                              selectedSize,
                              selectedColor,
                              setSelectedSize,
                              setSelectedColor,
                              hasStyles,
                              disableQuickView,
                              small,
                              stock
                          }) => {

    const classes = useStyles({small})
    const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))

    const [open, setOpen] = useState(false);

    if (matchesMD && open) {
        setOpen(false)
    }


    const imageIndex = colorIndex(product, variant, selectedColor)


    /*
        Set the image programmatically
        depending on the selectedColor prop
    * */
    const imgUrl = process.env.GATSBY_STRAPI_URL +
        (imageIndex !== -1
            ? product.node.variants[imageIndex].images[0].url
            : variant.images[0].url)
    const productName = product.node.name.split(' ')[0].toLowerCase()

    return (
        <>
            <Grid item classes={{
                root: clsx(classes.frameContainer, {
                    [classes.invisibility]: open === true
                })
            }}>
                <Grid container
                      direction={'column'}
                      onClick={() => matchesMD || disableQuickView
                          ? navigate(
                              `/${product.node.category.name.toLowerCase()}/${productName}${hasStyles ? `?style=${variant.style}` : ''}`
                          )
                          : setOpen(true)
                      }
                >
                    <Grid item classes={{root: classes.frame}}>
                        <img src={imgUrl}
                             alt={product.node.name}
                             className={classes.product}
                        />
                    </Grid>
                </Grid>
                <Grid item classes={{root: classes.title}}>
                    <Typography variant={'h5'}>
                        {productName}
                        {/*- {variant.color}*/}
                    </Typography>
                </Grid>
            </Grid>
            <QuickView open={open}
                       setOpen={setOpen}
                       url={imgUrl}
                       name={productName}
                       price={variant.price}
                       product={product}
                       variant={variant}
                       sizes={sizes}
                       colors={colors}
                       selectedSize={selectedSize}
                       selectedColor={selectedColor}
                       setSelectedSize={setSelectedSize}
                       setSelectedColor={setSelectedColor}
                       hasStyles={hasStyles}
                       stock={stock}
                       imageIndex={imageIndex}
            />
        </>

    );
};

export default ProductFrameGrid;
