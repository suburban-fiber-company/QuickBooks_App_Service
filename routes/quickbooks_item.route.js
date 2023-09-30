const router = require('express').Router()
const itemController = require('../app/controllers/quickbooks_item.controller')

/**
 * @swagger
 *  /v1/quickbooks/item/get-items/{realmID}:
*      get:
 *          summary: Get All Items
 *          tags: [QuickBooks Item]
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
 *                  description: Unauthorized or Token expired
 *              500:
 *                  description: SystemFailureError from QuickBooks
 */
router.get('/get-items/:realmID', itemController.fetchAll)

module.exports = router