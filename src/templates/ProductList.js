import React, {useEffect, useRef, useState} from 'react';
import Layout from "../components/ui/layout";
import {Fab, Grid, makeStyles} from "@material-ui/core";
import {Pagination} from "@material-ui/lab";
import DynamicToolbar from "../components/product-list/DynamicToolbar";
import {graphql} from "gatsby";
import ListOfProducts from "../components/product-list/ListOfProducts";

import {alphabetic, time, price} from "../components/product-list/SortFunctions";


const useStyles = makeStyles(theme => ({
    fab: {
        alignSelf: "flex-end",
        marginRight: "2rem",
        marginBottom: "2rem",
        color: "#fff",
        fontFamily: "Montserrat",
        fontSize: "5rem",
        width: "5rem",
        height: "5rem",
    },
    pagination: {
        alignSelf: "flex-end",
        marginRight: "2%",
        marginTop: "-3rem",
        marginBottom: "4rem",
        [theme.breakpoints.only("md")]: {
            marginTop: "1rem",
        },
    },
    "@global": {
        '.MuiPaginationItem-root': {
            fontFamily: 'Montserrat',
            fontSize: '2rem',
            color: theme.palette.primary.main,
            "&.Mui-selected": {
                color: 'white'
            }
        }
    }
}))

/*
    The data prop is coming from the query at the bottom of this file
    as a prop called data
 */
const ProductList = ({
                         pageContext: {filterOptions: options, name, description},
                         // data
                          data: {allStrapiProduct: {edges:products}}
                     }) => {
    // const products = data.allStrapiProduct.edges
    const classes = useStyles()

    const [layout, setLayout] = useState('grid');
    const [page, setPage] = useState(1);
    const [filterOptions, setFilterOptions] = useState(options);
    const [sortOptions, setSortOptions] = useState([
        {label: 'A-Z', active: true, function: (data) => alphabetic(data, 'asc')},
        {label: 'Z-A', active: false, function: (data) => alphabetic(data, 'desc')},
        {label: 'NEWEST', active: false, function: (data) => time(data, 'asc')},
        {label: 'OLDEST', active: false, function: (data) => time(data, 'desc')},
        {label: 'PRICE ↑', active: false, function: (data) => price(data, 'asc')},
        {label: 'PRICE ↓', active: false, function: (data) => price(data, 'desc')},
        {label: 'REVIEWS', active: false, function: (data) => data}
    ]);

    const scrollRef = useRef(null);
    const scrollToTop = () => {
        scrollRef.current.scrollIntoView({behavior: 'smooth'})
    }


    useEffect(() => {
        //Everytime filterOptions is change the page is set to 1
        setPage(1)
    }, [filterOptions, layout]);


    const productsPerPage = layout === 'grid' ? 16 : 6

    /*
*
  Important logic for reusing whenever filter items is needed
  * Start here
* */

    let content = []
    const selectedSort = sortOptions.filter(option => option.active)[0]
    const sortedProducts = selectedSort.function(products)

    sortedProducts.map((product, i) => product.node.variants.map(variant => content.push({
        product: i,
        variant
    })))

    let isFiltered = false
    let filters = {}
    let filteredProducts = []

    Object.keys(filterOptions)
        .filter(option => filterOptions[option] !== null)
        .map(option => {
            filterOptions[option].forEach(value => {
                if (value.checked) {
                    isFiltered = true

                    if (filters[option] === undefined) {
                        filters[option] = []
                    }

                    if (!filters[option].includes(value)) {
                        filters[option].push(value)
                    }

                    content.forEach(item => {
                        if (option === 'Color') {
                            if (item.variant.colorLabel === value.label &&
                                !filteredProducts.includes(item)) {
                                filteredProducts.push(item)
                            }
                        } else if (item.variant[option.toLowerCase()] === value.label &&
                            !filteredProducts.includes(item)) {
                            filteredProducts.push(item)
                        }
                    })
                }
            })
        })

    // console.log(filteredProducts)

    Object.keys(filters).forEach(filter => {
        filteredProducts = filteredProducts.filter(item => {
            let valid;

            filters[filter].some(value => {
                if (filter === 'Color') {
                    if (item.variant.colorLabel === value.label) {
                        valid = item
                    }
                } else if (item.variant[filter.toLowerCase()] === value.label) {
                    valid = item
                }
            })

            return valid
        })
    })

    if (isFiltered) {
        content = filteredProducts
    }

    /*
*
  Important logic for reusing whenever filter items is needed
  * Ends here
* */


    const numPages = Math.ceil(content.length / productsPerPage)


    return (
        <Layout>
            <Grid container direction={'column'} alignItems={'center'}>
                <div ref={scrollRef}/>
                <DynamicToolbar filterOptions={filterOptions}
                                setFilterOptions={setFilterOptions}
                                sortOptions={sortOptions}
                                setSortOptions={setSortOptions}
                                name={name}
                                description={description}
                                layout={layout}
                                setLayout={setLayout}

                />
                <ListOfProducts layout={layout}
                                page={page}
                                products={products}
                                productsPerPage={productsPerPage}
                                filterOptions={filterOptions}
                                content={content}
                />
                <Pagination page={page}
                            count={numPages}
                            color={'primary'}
                            onChange={(e, newPage) => setPage(newPage)}
                            classes={{root: classes.pagination}}
                />
                <Fab classes={{root: classes.fab}}
                     onClick={scrollToTop}
                >
                    ^
                </Fab>
            </Grid>
        </Layout>
    );
};

export default ProductList;


/*
    Anything passing from the context obj in gatsby-node.js
    its gonna be availbale inside the component Page of the
    createPage method as a variable for the query example the id
    on this case is coming from the context obj,
    The query result is gonna be passed to the ProductList component
    as a prop called data
 */
export const query = graphql`
    query GetCategoryProducts($id: String!) {
        allStrapiProduct(filter: {category: {id: {eq: $id}}}) {
            edges {
                node {
                    strapiId
                    name
                    createdAt
                    category{
                        name
                    }
                    variants {
                        color
                        id
                        price
                        size
                        style
                        colorLabel
                        images {
                            url
                        }
                    }
                }
            }
        }
    }

`