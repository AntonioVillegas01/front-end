import React, {useEffect, useState} from 'react';
import {useQuery, gql} from "@apollo/client";
import Layout from "../components/ui/layout";
import ProductImages from "../components/product-detail/ProductImages";
import {Grid, useMediaQuery} from "@material-ui/core";
import ProductInfo from "../components/product-detail/ProductInfo";
import RecentlyViewed from "../components/product-detail/RecentlyViewed";
import {GET_DETAILS} from "../apollo/queries";


const ProductDetail = ({
                           pageContext: {
                               name,
                               id,
                               category,
                               description,
                               variants,
                               product
                           }
                       }) => {


    const [selectedVariant, setSelectedVariant] = useState(0);
    const [selectedImage, setSelectedImage] = useState(0);
    const [stock, setStock] = useState(null);

    const matchesMD = useMediaQuery(theme => theme.breakpoints.down('md'))

    const params = new URLSearchParams(window.location.search)
    const style = params.get('style')


    /*
        MAking the actual http call here
        useQuery gets (queryItsfeld, options:{ variable: idOfTheProduct})
     */
    const { loading, error, data} = useQuery(GET_DETAILS, {
        variables: {id}
    })

    // useEffect for querying the data of the product
    useEffect(() => {

        if(error) {
            setStock(-1)
        }else if( data) {
            setStock(data.product.variants)
        }

    }, [error, data]);

    // console.log(stock)


    // useEffect for setting up the variants
    useEffect(() => {
        const styledVariant = variants
            .filter(variant => variant.style === params.get('style'))[0]

        const variantIndex = variants.indexOf(styledVariant)

        let recentlyViewed = JSON.parse(window.localStorage.getItem('recentlyViewed'))

        if(recentlyViewed){
            if(recentlyViewed.length === 10) {
                recentlyViewed.shift()
            }
            if(!recentlyViewed.some(product => product.node.name === name &&
                product.selectedVariant === variantIndex
            )){
                recentlyViewed.push({...product, selectedVariant: variantIndex})
            }


        }else{
            recentlyViewed = [{...product, selectedVariant: variantIndex}]
        }

        window.localStorage.setItem('recentlyViewed', JSON.stringify(recentlyViewed))

        setSelectedVariant(variantIndex)

    }, [style]);


    return (
        <Layout>
            <Grid container direction="column">
                <Grid item
                      container
                      direction={matchesMD ? 'column' : 'row'}
                >

                    <ProductImages images={variants[selectedVariant].images}
                                   selectedImage={selectedImage}
                                   setSelectedImage={setSelectedImage}
                    />

                    <ProductInfo name={name}
                                 description={description}
                                 variants={variants}
                                 selectedVariant={selectedVariant}
                                 setSelectedVariant={setSelectedVariant}
                                 stock={stock}
                    />

                </Grid>
                    <RecentlyViewed products={JSON.parse(window.localStorage.getItem('recentlyViewed'))}/>
            </Grid>
        </Layout>
    );
};

export default ProductDetail;
