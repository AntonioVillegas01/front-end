import React, {useEffect, useState} from 'react';
import {Grid, makeStyles, useMediaQuery} from "@material-ui/core";
import {useQuery} from "@apollo/client";
import ProductFrameGrid from "./ProductFrameGrid";
import ProductFrameList from "./ProductFrameList";

import {GET_DETAILS} from "../../apollo/queries";

const useStyles = makeStyles(theme => ({
    productContainer: {
        width: "95%",
        [theme.breakpoints.only("xl")]: {
            "& > *": {
                marginRight: ({layout}) =>
                    layout === "grid" ? "calc((100% - (25rem * 4)) / 3)" : 0,
                marginBottom: "5rem",
            },
            "& > :nth-child(4n)": {
                marginRight: 0,
            },
        },
        [theme.breakpoints.only("lg")]: {
            "& > *": {
                marginRight: ({layout}) =>
                    layout === "grid" ? "calc((100% - (25rem * 3)) / 2)" : 0,
                marginBottom: "5rem",
            },
            "& > :nth-child(3n)": {
                marginRight: 0,
            },
        },
        [theme.breakpoints.only("md")]: {
            "& > *": {
                marginRight: ({layout}) =>
                    layout === "grid" ? "calc(100% - (25rem * 2))" : 0,
                marginBottom: "5rem",
            },
            "& > :nth-child(2n)": {
                marginRight: 0,
            },
        },
        [theme.breakpoints.down("sm")]: {
            "& > *": {
                marginBottom: "5rem",
            },
        },
    },
}))

const ListOfProducts = ({
                            products,
                            content,
                            layout,
                            page,
                            productsPerPage,
                            filterOptions
                        }) => {
    const classes = useStyles({layout})
    const matchesSM = useMediaQuery(theme => theme.breakpoints.down('sm'))

    /*
        Render the correct Component using React best Practices
    * */
    const FrameHelper = ({Frame, product, variant}) => {
        const [selectedSize, setSelectedSize] = useState(null);
        const [selectedColor, setSelectedColor] = useState(null);
        const [stock, setStock] = useState(null);
        const [selectedVariant, setSelectedVariant] = useState(null);


        // APOLLO QUERIE
        const {loading, error, data} = useQuery(GET_DETAILS, {
            variables: {id: product.node.strapiId}
        })

        // useEffect for querying the data of the product
        useEffect(() => {

            if (error) {
                setStock(-1)
            } else if (data) {
                setStock(data.product.variants)
            }

        }, [error, data]);

        useEffect(() => {
            if(!selectedSize) return undefined
            // reset the color
            setSelectedColor(null)
            let variants = product.node.variants

            // set the variant to the first color
            const newVariant = variants.find(
                item =>
                    item.size === selectedSize &&
                    item.style === variant.style &&
                    item.color === colors[0]
            )
            setSelectedVariant(newVariant)
        }, [selectedSize]);


        let sizes = []
        let colors = []
        product.node.variants.map(item => {
            sizes.push(item.size)
            /*
                check if there is no color added
             */
            if (
                !colors.includes(item.color)
                && item.size === (selectedSize || variant.size)
                && item.style === variant.style
            ) {
                colors.push(item.color)
            }
        })


        const hasStyles = product.node.variants.some(variant => variant.style !== null)

        return <Frame variant={selectedVariant || variant}
                      product={product}
                      sizes={sizes}
                      colors={colors}
                      selectedSize={selectedSize || variant.size}
                      selectedColor={selectedColor}
                      setSelectedSize={setSelectedSize}
                      setSelectedColor={setSelectedColor}
                      hasStyles={hasStyles}
                      stock={stock}
        />
    }


    return (
        <Grid item
              container
              direction={matchesSM ? 'column' : 'row'}
              alignItems={matchesSM ? 'center' : undefined}
              justifyContent={'center'} classes={{root: classes.productContainer}}>
            {

                content.slice(
                    (page - 1) * productsPerPage, page * productsPerPage
                ).map(({product, variant}) => (
                    <FrameHelper key={variant.id}
                                 Frame={layout === 'grid' ? ProductFrameGrid : ProductFrameList}
                                 variant={variant}
                                 product={products[product]}
                    />
                ))

            }
        </Grid>
    );
};

export default ListOfProducts;
