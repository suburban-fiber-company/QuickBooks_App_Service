const axios = require('axios')
const { requestInterceptor } = require('../../functions')
const config = require('../../settings/config')


module.exports = {
    createCustomer: async (req, res) => {
        await axios.post(config.sandbox_baseurl + '/v3/company/'+req.params.realmID+'/customer?minorversion='+config.minorversion, 
            req.body,
            {
                headers: {
                    Authorization: req.header('authorization')
                }
            },
        )
        .then((result) => {
            res.json({status: result.status, data: result.data})
        })
        .catch((error) => {
            res.json({status: error.response.status, data: error.response.data})
        })
    },
    getCustomerById: async (req, res) => {
        await axios.get(config.sandbox_baseurl + '/v3/company/'+req.params.realmID+'/customer/'+ req.params.id  +'?minorversion='+config.minorversion, {
            headers: {
                Authorization: req.header('authorization') 
            }
        })
        .then((result) => {
            res.json({status: result.status, data: result.data})
        })
        .catch((error) => {
            if(error.response) return res.json({status: error.response.status, data: error.response.data})
        }) 
    },
    getAllCustomers: async (req, res) => {
        if(req.query.startposition == '' || req.query.maxresults == '') return res.json({status: 422, message: 'startposition and maxresults fields are required.'})
        await axios.post(config.sandbox_baseurl + '/v3/company/'+req.params.realmID+'/query?minorversion='+config.minorversion,
        `Select * from Customer startposition ${req.query.startposition} maxresults ${req.query.maxresults}`,
        {
            headers: {
                Authorization: req.header('authorization') 
            }
        })
        .then((result) => {
            res.json({status: result.status, data: result.data})
        })
        .catch((error) => {
            res.json({status: error.response.status, data: error.response.data})
        }) 
    }
}