const router = require('express').Router()
const reportListController = require('../app/controllers/quickbooks_report.controller')

/**
 * @swagger
 *  /v1/quickbooks/report/transaction-list/{realmID}:
*      get:
 *          summary: Get Report on Transaction List
 *          tags: [QuickBooks Report]
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
 *                  description: SystemFailureError from QuickBooks
 */
router.get('/transaction-list/:realmID', reportListController.getTransactionList)


/**
 * @swagger
 *  /v1/quickbooks/report/debt-ageing-list/{realmID}:
*      get:
 *          summary: Get Report on Debt Ageing (AccountReceivables)
 *          tags: [QuickBooks Report]
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
 *                  description: SystemFailureError from QuickBooks
 */
router.get('/debt-ageing-list/:realmID', reportListController.getDebtAgeingList)


module.exports = router