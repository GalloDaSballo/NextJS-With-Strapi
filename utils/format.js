export const formatPrice = (price) => {
    if(!price){
        return `$0.00`
    }
    return `$${(parseInt(price) / 100).toFixed(2)}`
}