import React from 'react';
import {Chip, Grid, makeStyles, Typography} from "@material-ui/core";

import frame from "../../images/product-frame-list.svg"
import Rating from "../home/Rating";
import Sizes from "./Sizes";
import Swatches from "./Swatches";
import QtyButton from "./QtyButton";
import {colorIndex, getStockDisplay} from "../utilities";
import {Link} from "gatsby";

const useStyles = makeStyles(theme => ({
    frame: {
        backgroundImage: `url(${frame})`,
        // backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "28rem",
    },
    info: {
        backgroundColor: theme.palette.primary.main,
        height: "100%",
        width: "100%",
        padding: "1rem",
        [theme.breakpoints.down("md")]: {
            height: "50%",
        },
        [theme.breakpoints.down("sm")]: {
            height: "26rem",
        },
    },
    productImage: {
        height: "20rem",
        width: "20rem",
    },
    stock: {
        color: "#fff",
    },
    sizesAndSwatches: {
        maxWidth: "13rem",
    },
    chipLabel: {
        fontSize: "2rem",
        "&:hover": {
            cursor: "pointer",
        },
    },
}))




const ProductFrameList = ({
                              product,
                              variant,
                              sizes,
                              colors,
                              selectedSize,
                              selectedColor,
                              setSelectedSize,
                              setSelectedColor,
                              hasStyles,
                              stock
                          }) => {

    const classes = useStyles()



    const imageIndex = colorIndex(product,variant,selectedColor)

    /*
        Set the image programmatically
        depending on the selectedColor prop
    * */
    const images = imageIndex !== -1
        ? product.node.variants[imageIndex].images
        : variant.images

    const selectedVariant = imageIndex === -1
        ? product.node.variants.indexOf(variant)
        : imageIndex

    const stockDisplay = getStockDisplay(stock, selectedVariant)

    const productName = product.node.name.split(' ')[0].toLowerCase()

    return (
        <Grid item container>
            <Grid item
                  lg={9}
                  container
                  justifyContent={'space-around'}
                  alignItems={"center"} classes={{root: classes.frame}}
            >
                {
                    images.slice(0, 4).map(image => (
                        <Grid item
                              key={image.url}
                              to={`/${product.node.category.name.toLowerCase()}/${productName}${hasStyles ? `?style=${variant.style }` : ''}`}
                              component={Link}
                        >
                            <img src={process.env.GATSBY_STRAPI_URL + image.url}
                                 alt={image.url}
                                 className={classes.productImage}
                            />
                        </Grid>

                    ))
                }
            </Grid>
            <Grid item
                  lg={3}
                  container
                  direction={'column'}
                  classes={{root: classes.info}}
                  justifyContent={'space-between'}
            >
                <Grid item container direction={"column"}
                      to={`/${product.node.category.name.toLowerCase()}/${productName}${hasStyles ? `?style=${variant.style }` : ''}`}
                      component={Link}
                >
                    <Grid item>
                        <Typography variant={'h4'}>
                            {product.node.name.split(' ')[0]}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Rating number={3.5}/>
                    </Grid>
                    <Grid item>
                        <Chip label={`$${variant.price}`}
                              classes={{label: classes.chipLabel}}/>
                    </Grid>
                    <Grid item>
                        <Typography variant={'h3'} classes={{root: classes.stock}}>
                            {stockDisplay}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid item container direction={'column'} classes={{root:classes.sizesAndSwatches}}>
                    <Sizes sizes={sizes} selectedSize={selectedSize} setSelectedSize={setSelectedSize}/>
                    <Swatches colors={colors} selectedColor={selectedColor} setSelectedColor={setSelectedColor}/>
                </Grid>

                <QtyButton stock={stock}
                           selectedVariant={selectedVariant}
                />
            </Grid>
        </Grid>
    );
};

export default ProductFrameList;
