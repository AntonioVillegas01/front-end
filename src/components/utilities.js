/*
 Function to get the current image selected
* */
export const colorIndex = (product, variant, color) => {
    return product.node.variants.indexOf(
        product.node.variants.filter(
            item =>
                item.color === color
                && variant.style === item.style
                && item.size === variant.size
        )[0]
    )

}


export const getStockDisplay = (stock, vaiant) => {
    switch (stock) {
        case undefined:
        case null:
            return 'Loading Inventory'
        case -1:
            return 'Error Loading Inventory'
        default:
            if (stock[vaiant].qty === 0) {
                return 'Out of Stock'
            }
            return `${stock[vaiant].qty} Currently In Stock`
    }
}