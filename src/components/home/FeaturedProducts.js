import React from 'react';

import {useStaticQuery, graphql} from "gatsby";
import {Chip, Grid, IconButton, makeStyles, Typography, useMediaQuery} from "@material-ui/core";
import clsx from 'clsx'

import featuredAdornment from '../../images/featured-adornment.svg'
import frame from '../../images/product-frame-grid.svg'
import explore from '../../images/explore.svg'
// import promoAdornment from "../../images/promo-adornment.svg";
import Rating from "./Rating";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
    background: {
        backgroundImage: `url(${featuredAdornment})`,
        backgroundPosition: 'top',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100%',
        height: '180rem',
        padding: '0 2.5rem',
        [theme.breakpoints.down('md')]:{
            height: '220rem',
        }
    },
    chipLabel:{
        ...theme.typography.h5,
    },
    chipRoot:{
        backgroundColor:theme.palette.secondary.main
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
        zIndex:1,
        [theme.breakpoints.down('md')]:{
            height: '19.8rem',
            width: '20rem'
        }
    },
    exploreContainer:{
        marginTop: 'auto'
    },
    exploreButton:{
        marginTop: 'auto',
        textTransform: "none"
    },
    exploreIcon:{
        height: '1.5rem',
        marginLeft: '1rem'
    },
    featured: {
        height: '20rem',
        width: '20rem',
        [theme.breakpoints.down('md')]:{
            height: '15rem',
            width: '15rem'
        }
    },
    slide: {
        backgroundColor: theme.palette.primary.main,
        height: '20rem',
        width: '24.5rem',
        transition: 'transform 0.5s ease',
        zIndex: 0,
        padding: '1rem 2rem',

        [theme.breakpoints.down('md')]:{
            height: '15.2rem',
            width: '19.5rem'
        }
    },
    slideLeft: {
        transform: 'translate(-24.5rem, 0px)',
    },
    slideRight: {
        transform: 'translate(24.5rem, 0px)',
    },
    slideDown: {
        transform: 'translate(0px, 17rem)',
    }
}))

const FeaturedProducts = () => {

    const [expanded, setExpanded] = React.useState(null);
    const classes = useStyles()


    const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))

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

    // console.log(edges)

    return (
        <Grid container
              direction={'column'}
              classes={{root: classes.background}}
              justifyContent={matchesMD ? 'space-between'  :'center'}
        >
            {
                edges.map(({node}, i) => {
                    // Verify if the item is the first or the third on the row
                    const alignment = matchesMD ? 'center' :
                        (i === 0 || i === 3)
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
                                          [classes.slideLeft]:
                                          !matchesMD && expanded === i && alignment === 'flex-end',
                                          [classes.slideRight]:
                                          !matchesMD && expanded === i && (alignment === 'flex-start'
                                          || alignment === 'center'),
                                          [classes.slideDown]:
                                          matchesMD && expanded === i ,
                                      })
                                  }}
                            >
                                <Grid item>
                                    <Typography variant={'h4'}>
                                        {node.name.split(' ')[0]}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Rating number={1.5}/>
                                </Grid>
                                <Grid item>
                                    <Chip label={`$${node.variants[0].price}`}
                                          classes={{root:classes.chipRoot, label: classes.chipLabel}}
                                    />
                                </Grid>
                                <Grid item classes={{root: classes.exploreContainer}}>
                                    <Button classes={{root: classes.exploreButton}}>
                                        <Typography variant={'h5'}>
                                            Details
                                        </Typography>
                                        <img src={explore}
                                             alt="go to products details"
                                             className={classes.exploreIcon}
                                        />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    )
                })
            }
        </Grid>
    );
};

export default FeaturedProducts;
