const router = require('express').Router()
const reportListController = require('../app/controllers/quickbooks_report.controller')

/**
 * @swagger
 *  /v1/quickbooks/report/transaction-list/{realmID}:
*      get:
 *          summary: Get Report on Transaction List
 *          tags: [QuickBooks Report]
 *          parameters:
 *              -   in: path
 *                  name: realmID
 *                  type: string
 *                  required: true
 *              -   in: query
 *                  name: start_date
 *                  type: date
 *                  example: 'y-m-d'
 *                  required: false
 *              -   in: query
 *                  name: end_date
 *                  type: date
 *                  example: 'y-m-d'
 *                  required: false
 *              -   in: query
 *                  name: arpaid
 *                  type: string
 *                  example: 'e.g All, Paid, Unpaid'
 *                  required: false
 *              -   in: query
 *                  name: date_macro
 *                  type: string
 *                  example: 'Supported Values from Get Supported Transaction Types endpoint'
 *                  required: false
 *              -   in: query
 *                  name: transaction_type
 *                  type: string
 *                  example: 'Supported Values from Get Supported Transaction Types'
 *                  required: false
 *              -   in: query
 *                  name: sort_order
 *                  type: string
 *                  example: 'ascend or descend'
 *                  required: false
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized or Token expired
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
 *                  description: Unauthorized or Token expired
 *              500:
 *                  description: SystemFailureError from QuickBooks
 */
router.get('/debt-ageing-list/:realmID', reportListController.getAccountReceivables)


/**
 * @swagger
 *  /v1/quickbooks/report/aged-payable-list/{realmID}:
*      get:
 *          summary: Get Report on AgedPayables (Account Payables)
 *          tags: [QuickBooks Report]
 *          parameters:
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
 *                  description: Unauthorized or Token expired
 *              500:
 *                  description: SystemFailureError from QuickBooks
 */
router.get('/aged-payable-list/:realmID', reportListController.getAccountPayables)

/**
 * @swagger
 *  /v1/quickbooks/report/account-payable-aging-summary/{realmID}:
*      get:
 *          summary: Get Report on AgedPayable Summary (Account Payable Summary)
 *          tags: [QuickBooks Report]
 *          parameters:
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
 *                  description: Unauthorized or Token expired
 *              500:
 *                  description: SystemFailureError from QuickBooks
 */
router.get('/account-payable-aging-summary/:realmID', reportListController.getAccountPayableAgingSummary)

/**
 * @swagger
 *  /v1/quickbooks/report/predefined-date-range:
*      get:
 *          summary: Get PreDefined Macro Date
 *          tags: [QuickBooks Report]
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized or Token expired
 *              500:
 *                  description: SystemFailureError from QuickBooks
 */
router.get('/predefined-date-range', reportListController.reportMacroPreDefined)

/**
 * @swagger
 *  /v1/quickbooks/report/transaction-types:
*      get:
 *          summary: Get Supported Transaction Types
 *          tags: [QuickBooks Report]
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized or Token expired
 *              500:
 *                  description: SystemFailureError from QuickBooks
 */
router.get('/transaction-types', reportListController.reportTransactionType)

module.exports = router