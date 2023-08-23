const router = require('express').Router()
const itemController = require('../app/controllers/quickbooks_item.controller')

/**
 * @swagger
 *  /v1/quickbooks/item/get-items/{realmID}:
*      get:
 *          summary: Get All Items
 *          tags: [Item]
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
 *                  description: Internal Serval Error
 */
router.get('/get-items/:realmID', itemController.fetchAll)

module.exports = router