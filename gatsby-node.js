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
        category {
          name
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

    products.forEach(({node}) => {
        createPage({
            path: `/${node.category.name.toLowerCase()}/${node.name.split(' ')[0]}`,
            component: require.resolve('./src/templates/ProductDetail.js'),
            context: {
                name: node.name,
                id: node.strapiId,
                category: node.category.name
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

