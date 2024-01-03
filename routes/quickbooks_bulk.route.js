const router = require('express').Router()
const bulkOperationController = require('../app/controllers/quickbooks_bulk.controller')


router.post('/create/:realmID', bulkOperationController.bulk_operation)

module.exports = router