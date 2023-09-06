const router = require('express').Router()
const transactionListController = require('../app/controllers/quickbooks_transactionlist.controller')

/**
 * @swagger
 *  /v1/quickbooks/transaction-list/report/{realmID}:
*      get:
 *          summary: Get Report on Transaction List
 *          tags: [ReportTransactionList]
 *          parameters:
 *              -   in: header
 *                  name: authorization
 *                  type: string
 *                  required: true
 *                  description: Bearer token
 *              -   in: path
 *                  name: realmID
 *                  type: string
 *                  required: true
 *              -   in: query
 *                  name: start_date
 *                  type: date
 *                  example: 'y-m-d'
 *                  required: true
 *              -   in: query
 *                  name: end_date
 *                  type: date
 *                  example: 'y-m-d'
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: Internal Serval Error
 */
router.get('/report/:realmID', transactionListController.getTransactionList)


module.exports = router