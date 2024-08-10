
// const backendDomain = 'http://localhost:8080'
const backendDomain = 'https://website-backend-6xpv.onrender.com'



const SummeryApi = {

    signup: {
        url: `${backendDomain}/api/signup`,
        method: "post"
    },

    signin: {
        url: `${backendDomain}/api/signin`,
        method: "post"
    },

    current_user: {
        url: `${backendDomain}/api/user-details`,
        method: "get"
    },

    user_logout: {
        url: `${backendDomain}/api/userLogout`,
        method: "get"
    },

    allUser: {
        url: `${backendDomain}/api/all-user`,
        method: 'get'

    },
    updateUser: {
        url: `${backendDomain}/api/update-user`,
        method: 'post'

    },

    uploadProduct: {
        url: `${backendDomain}/api/upload-product`,
        method: 'post'
    },

    allProduct: {
        url: `${backendDomain}/api/get-product`,
        method: 'get'

    },

    updateProduct: {
        url: `${backendDomain}/api/update-product`,
        method: 'post'
    },

    categoryProduct: {
        url: `${backendDomain}/api/get-productCategory`,
        method: 'get'
    },

    categoryWiseProduct: {
        url: `${backendDomain}/api/category-product`,
        method: 'post'

    },
    productDetails: {
        url: `${backendDomain}/api/product-details`,
        method: 'post'

    },

    addToCartProduct: {
        url: `${backendDomain}/api/addtocart`,
        method: "post"
    },

    addToCardProductCount: {
        url: `${backendDomain}/api/countAddToCartProduct`,
        method: "get"
    },

    addToCartProductView: {
        url: `${backendDomain}/api/view-cart-product`,
        method: "get"
    },

    updateCartProduct: {
        url: `${backendDomain}/api/update-cart-product`,
        method: "post"
    },

    deleteCartProduct: {
        url: `${backendDomain}/api/delete-cart-product`,
        method: "post"
    },

    searchProduct: {
        url: `${backendDomain}/api/search`,
        method: "get"

    },

    filterProduct: {
        url: `${backendDomain}/api/filter-product`,
        method: "post"
    }









}

export default SummeryApi