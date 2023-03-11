const router = require('express').Router()
const customerController = require('../app/controllers/quickbooks_customer.controller')

router.post('/create/:realmID', customerController.createCustomer)
router.get('/get-single-customer/:id/:realmID', customerController.getCustomerById)
router.get('/get-all-customers/:realmID', customerController.getAllCustomers)

module.exports = router