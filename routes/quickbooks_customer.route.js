const router = require('express').Router()
const customerController = require('../app/controllers/quickbooks_customer.controller')

router.post('/create', customerController.createCustomer)

module.exports = router