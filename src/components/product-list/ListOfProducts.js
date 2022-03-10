import React, {useState} from 'react';
import {Grid, makeStyles, useMediaQuery} from "@material-ui/core";
import ProductFrameGrid from "./ProductFrameGrid";
import ProductFrameList from "./ProductFrameList";

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


        let sizes = []
        let colors = []
        product.node.variants.map(variant => {
            sizes.push(variant.size)
            /*
                check if there is no color added
             */
            if (!colors.includes(variant.color)) {
                colors.push(variant.color)
            }
        })

        return <Frame variant={variant}
                      product={product}
                      sizes={sizes}
                      colors={colors}
                      selectedSize={selectedSize}
                      selectedColor={selectedColor}
                      setSelectedSize={setSelectedSize}
                      setSelectedColor={setSelectedColor}
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
