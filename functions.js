const axios = require('axios')

module.exports = {
    requestInterceptor: (req, res, next) => {
        axios.interceptors.request.use(request => {
            console.log(request.headers['authorization'])
            return Promise.reject('Error is found')
            return request
        },
        error => {
            return Promise.reject(error)
        });
    }
}