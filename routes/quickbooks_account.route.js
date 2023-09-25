const router = require('express').Router()
const accountController = require('../app/controllers/quickbooks_account.controller')

/**
 * @swagger
 *  /v1/quickbooks/account/get-accounts/{realmID}:
*      get:
 *          summary: Get All Chart of Accounts
 *          tags: [Chart of Account]
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
 *                  name: startposition
 *                  type: integer
 *                  required: true
 *                  description: start from 1
 *              -   in: query
 *                  name: maxresult
 *                  type: integer
 *                  required: true
 *                  description: max result e.g 5
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized
 *              500:
 *                  description: SystemFailureError from QuickBooks
 */
router.get('/get-accounts/:realmID', accountController.fetchAll)

module.exports = router