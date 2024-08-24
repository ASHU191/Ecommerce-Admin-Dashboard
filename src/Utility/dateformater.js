
export const dateformater = (dateString) => {

    const date = new Date(dateString).getDate();

    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const month = monthNames[new Date(dateString).getMonth()]

    const year = new Date(dateString).getFullYear()

    const formatedDate = `${date}/${month}/${year}`
    

    return {formatedDate}
}