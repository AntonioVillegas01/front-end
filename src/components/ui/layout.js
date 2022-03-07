/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
// import PropTypes from "prop-types"
import {useStaticQuery, graphql} from "gatsby"

import Header from "./header"
import Footer from "./footer";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    spacer: {
        marginBottom: '10rem',
        [theme.breakpoints.down('md')]:{
            marginBottom: '2rem'
        }
    }
}))

const Layout = ({children}) => {

    const classes = useStyles()

    const {allStrapiCategory} = useStaticQuery(graphql`
        query GetCategories {
            allStrapiCategory {
                edges {
                    node {
                        name
                        strapiId
                    }
                }
            }
        }
    `)

    // console.log(allStrapiCategory)

    return (
        <>
            <Header categories={allStrapiCategory.edges}/>
            <div className={classes.spacer}/>
            <main>{children}</main>

            <Footer/>
        </>
    )
}

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// }

export default Layout
