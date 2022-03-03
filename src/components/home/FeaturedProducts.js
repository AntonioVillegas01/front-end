import React from 'react';

import {useStaticQuery, graphql} from "gatsby";
import {Grid, IconButton, makeStyles, Typography} from "@material-ui/core";
import clsx from 'clsx'

import featuredAdornment from '../../images/featured-adornment.svg'
import frame from '../../images/product-frame-grid.svg'
import promoAdornment from "../../images/promo-adornment.svg";

const useStyles = makeStyles(theme => ({
    background: {
        backgroundImage: `url(${featuredAdornment})`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '180rem',
        padding: '0 2.5rem',
    },
    productContainer: {
        margin: '5rem 0'
    },
    frame: {
        backgroundImage: `url(${frame})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: 0,
        height: '24.8rem',
        width: '25rem',
        boxSizing: 'border-box',
        boxShadow: theme.shadows[5],
        position: "absolute",
        zIndex:1
    },
    featured: {
        height: '20rem',
        width: '20rem'
    },
    slide: {
        backgroundColor: theme.palette.primary.main,
        height: '20rem',
        width: '24.5rem',
        transition: 'transform 0.5s ease',
        zIndex: 0
    },
    slideLeft: {
        transform: 'translate(-24.5rem, 0px)',
    },
    slideRight: {
        transform: 'translate(24.5rem, 0px)',
    }
}))

const FeaturedProducts = () => {

    const [expanded, setExpanded] = React.useState(null);
    const classes = useStyles()

    const {allStrapiProduct: {edges}} = useStaticQuery(graphql`
        query GetFeatured {
            allStrapiProduct(filter: {featured: {eq: true}}) {
                edges {
                    node {
                        strapiId
                        name
                        variants {
                            price
                            images {
                                url
                            }
                        }
                    }
                }
            }
        }
    `)

    console.log(edges)

    return (
        <Grid container
              direction={'column'}
              classes={{root: classes.background}}
              justifyContent={'center'}
        >
            {
                edges.map(({node}, i) => {
                    // Verify if the item is the first or the third on the row
                    const alignment = (i === 0 || i === 3)
                        ? 'flex-start'
                        : (i === 1 || i === 4)
                            ? 'center'
                            : 'flex-end'

                    return (
                        <Grid item
                              justifyContent={alignment}
                              key={node.name + i}
                              classes={{root: classes.productContainer}}
                              alignItems={'center'}
                              container>
                            <IconButton classes={{root: classes.frame}}
                                // Check if the card is already expanded
                                        onClick={() => expanded === i ? setExpanded(null) : setExpanded(i)}
                            >
                                <img src={process.env.GATSBY_STRAPI_URL + node.variants[0].images[0].url}
                                     alt={node.name}
                                     className={classes.featured}
                                />
                            </IconButton>
                            <Grid container
                                  direction={'column'}
                                  classes={{
                                      root: clsx(classes.slide, {
                                          [classes.slideLeft]: expanded === i && alignment === 'flex-end',
                                          [classes.slideRight]: expanded === i && (alignment === 'flex-start'
                                          || alignment === 'center'),
                                      })
                                  }}
                            >

                            </Grid>
                        </Grid>
                    )
                })
            }
        </Grid>
    );
};

export default FeaturedProducts;
