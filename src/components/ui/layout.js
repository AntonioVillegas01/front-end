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

const Layout = ({children}) => {
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
            <Header categories={allStrapiCategory.edges} />
            <div style={{marginBottom:'10rem'}}/>

                <main>{children}</main>

            <Footer/>
        </>
    )
}

// Layout.propTypes = {
//   children: PropTypes.node.isRequired,
// }

export default Layout