import React, {useState} from 'react';
import {Grid, makeStyles, useMediaQuery} from "@material-ui/core";
import ProductFrameGrid from "../product-list/ProductFrameGrid";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    recentContainer: {
        margin: "10rem 0",
        "& > :not(:last-child)": {
            marginRight: "2rem",
        },
    },
    arrow: {
        minWidth: 0,
        height: "4rem",
        width: "4rem",
        fontSize: "4rem",
        color: theme.palette.primary.main,
        borderRadius: 50,
        [theme.breakpoints.down("xs")]: {
            height: "1rem",
            width: "1rem",
        },
    },
}))

const RecentlyViewed = ({products}) => {
    const classes = useStyles()

    const [firstIndex, setFirstIndex] = useState(0);


    const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))
    const matchesSM = useMediaQuery(theme => theme.breakpoints.down('sm'))

    const displayNum = matchesSM ? 1 : matchesMD ? 2 : 4


    const handleNavigation = (direction) => {

        if (firstIndex === 0 && direction === 'backward') {
            return
        }
        if (firstIndex + 4 === products.length && direction === 'forward') {
            return
        }

        setFirstIndex(direction === 'forward' ? firstIndex + 1 : firstIndex - 1)
    }

    return (
        <Grid item
              container
              justifyContent={'center'}
              alignItems={'center'}
              classes={{root: classes.recentContainer}}
        >
            <Grid>
                <Button onClick={() => handleNavigation('backward')}
                        classes={{root: classes.arrow}}
                        disabled={firstIndex === 0}
                >
                    {"<"}
                </Button>
            </Grid>
            {
                products?.slice(firstIndex, firstIndex + displayNum).map(product => {

                        const hasStyles = product.node.variants.some(
                            variant => variant.style !== null
                        )

                        return <ProductFrameGrid key={product.node.variants[product.selectedVariant].id}
                                                 product={product}
                                                 variant={product.node.variants[product.selectedVariant]}
                                                 disableQuickView
                                                 small
                                                 hasStyles={hasStyles}
                        />
                    }
                )
            }
            <Grid>
                <Button onClick={() => handleNavigation('forward')}
                        classes={{root: classes.arrow}}
                        disabled={(firstIndex + 4) === products.length}
                >
                    {">"}
                </Button>
            </Grid>
        </Grid>
    );
};

export default RecentlyViewed;
