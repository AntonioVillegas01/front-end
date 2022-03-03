require('dotenv').config()

module.exports = {
    siteMetadata: {
        title: `Gatsby Default Starter`,
        description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
        author: `@marcoGarcia`,
        siteUrl: `https://gatsbystarterdefaultsource.gatsbyjs.io/`,
    },
    flags: {
        FAST_REFRESH: false
    },
    plugins: [
        "gatsby-plugin-image",
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-sitemap",
        `gatsby-plugin-material-ui`,
        {
            resolve: 'gatsby-plugin-web-font-loader',
            options: {
                google: {
                    families: [
                        'Philosopher:i7:latin',
                        'Montserrat:n6,n5,n4,n3:latin'
                    ]
                }
            }
        },
        {
            resolve: `gatsby-source-strapi`,
            options: {
                apiURL: `http://localhost:1337`,
                queryLimit: 1000, // Defaults to 100
                collectionTypes: [`product`, `category`, 'variant']
            },
        },
        {
            resolve: 'gatsby-plugin-manifest',
            options: {
                "icon": "src/images/ico.png"
            }
        },
        "gatsby-plugin-mdx",
        "gatsby-transformer-remark",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
        {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "images",
                "path": "./src/images/"
            },
            __key: "images"
        }, {
            resolve: 'gatsby-source-filesystem',
            options: {
                "name": "pages",
                "path": "./src/pages/"
            },
            __key: "pages"
        }]
};