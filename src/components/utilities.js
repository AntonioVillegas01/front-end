
/*
 Function to get the current image selected
* */
export const colorIndex = (product, variant, color) => {
    return product.node.variants.indexOf(
        product.node.variants.filter(
            item =>
                item.color === color &&
                variant.style === item.style
        )[0]
    )

}