import React, {useState} from 'react';
import {graphql, useStaticQuery} from "gatsby";
import {Grid, IconButton, makeStyles, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import clsx from 'clsx'
import Carousel from "react-spring-3d-carousel";

import promoAdornment from '../../images/promo-adornment.svg'
import explore from '../../images/explore.svg'

const useStyles = makeStyles(theme => ({
        mainContainer: {
            backgroundImage: `url(${promoAdornment})`,
            backgroundPosition: 'top',
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            width: '100%',
            height: '70rem',
            padding: '30rem 10rem 10rem 10rem',
        },
        productName: {
            color: 'white'
        },
        iconButton: {
            "&:hover": {
                backgroundColor: 'transparent'
            }
        },
        carouselImage: {
            height: '30rem',
            width: '25rem',
            backgroundColor: 'white',
            borderRadius: 20,
            boxShadow: theme.shadows[5]
        },
        carouselContainer: {
            marginLeft: '20rem'
        },
        space: {
            margin: '0 15rem',
            marginBottom: '10rem'
        },
        explore: {
            textTransform: "none",
            marginRight: '2rem'
        },
        descriptionContainer: {
            textAlign: "right"
        }
    })
)

const PromotionalProducts = () => {

    const [selectedSlide, setSelectedSlide] = useState(0);

    const classes = useStyles()

    const {allStrapiProduct: {edges}} = useStaticQuery(graphql`
        query getPromo {
            allStrapiProduct(filter: {promo: {eq: true}}) {
                edges {
                    node {
                        name
                        strapiId
                        description
                        variants {
                            images {
                                url
                            }
                        }
                    }
                }
            }
        }
    `)

    let slides = []

    // console.log(edges[0].node.variants[0].images[0].url)
    console.log(process.env.GATSBY_STRAPI_URL)
    edges.map(({node}, i) => slides.push({
        key: i,
        content: (
            <Grid container direction='column' alignItems={"center"}>
                <Grid item>
                    <IconButton disableRipple={true}
                                onClick={()=> setSelectedSlide(i)}
                                classes={{
                        root: clsx(classes.iconButton, {
                            [classes.space]: selectedSlide !== i
                        })
                    }}
                    >
                        {/*CarouselImages*/}
                        <img src={process.env.GATSBY_STRAPI_URL + node.variants[0].images[0].url}
                             alt={node.name}
                             className={classes.carouselImage}
                        />
                    </IconButton>
                </Grid>
                <Grid item>
                    {selectedSlide === i && (
                        <Typography variant={'h1'} classes={{root: classes.productName}}>
                            {node.name.split(' ')[0]}
                        </Typography>
                    )
                    }
                </Grid>
            </Grid>
        ),
        description: node.description
    }))

    return (
        <Grid container justifyContent={'space-between'} alignItems={'center'}
              classes={{root: classes.mainContainer}}
        >
            <Grid item classes={{root: classes.carouselContainer}}>
                <Carousel showNavigation={false}
                          slides={slides}
                          goToSlide={selectedSlide}
                />
            </Grid>
            <Grid item classes={{root: classes.descriptionContainer}}>
                <Typography variant={'h2'}
                            paragraph
                >
                    {slides[selectedSlide].description}
                </Typography>
                <Button>
                    <Typography variant={'h4'}
                                classes={{root: classes.explore}}
                    >
                        Explore
                    </Typography>
                    <img src={explore} alt="exploreICon"/>
                </Button>
            </Grid>
        </Grid>
    );
};

export default PromotionalProducts;
