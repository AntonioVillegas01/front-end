// create pages programaticaly using the createPage API


exports.createPages = async ({graphql, actions}) => {

    const {createPage} = actions

    const result = await graphql(
        `
   {
  products: allStrapiProduct {
    edges {
      node {
        name
        strapiId
        description
        category {
          name
        }
        variants {
        id
        color
        size
        style
        price
        images{
        url
        }
        }
      }
    }
  }
  categories:   allStrapiCategory {
    edges {
      node {
        strapiId
        name
        description
        filterOptions {
          Size {
            checked
            label
          }
          Style {
            checked
            label
          }
          Color {
            checked
            label
          }
        }
      }
    }
  }
}
        `)


    if (result.errors) {
        throw result.errors
    }

    const products = result.data.products.edges
    const categories = result.data.categories.edges

    products.forEach( product => {
        createPage({
            path: `/${product.node.category.name.toLowerCase()}/${product.node.name.split(' ')[0]}`,
            component: require.resolve('./src/templates/ProductDetail.js'),
            context: {
                name: product.node.name,
                id: product.node.strapiId,
                category: product.node.category.name,
                description: product.node.description,
                variants: product.node.variants,
                product: product
            }
        })
    })

    categories.forEach(({node}) => {
        createPage({
            path: `/${node.name.toLowerCase()}`,
            component: require.resolve('./src/templates/ProductList.js'),
            context: {
                name: node.name,
                description: node.description,
                id: node.strapiId,
                filterOptions: node.filterOptions
            }
        })
    })

}

