const axios = require('axios')


module.exports = {
    createCustomer: async (req, res) => {
        return res.send(req.header('authorization'))
    }
}