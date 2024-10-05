import axios from "axios";
// const axios = require("axios")


async function main() {

    const response = await axios.get('https://fakestoreapi.com/products')
    return response.data

}
const productList = await main()

export default productList
