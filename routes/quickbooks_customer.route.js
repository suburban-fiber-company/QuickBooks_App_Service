const router = require('express').Router()
const customerController = require('../app/controllers/quickbooks_customer.controller')

/**
 * @swagger
 *  /v1/quickbooks/customer/create/{realmID}:
 *      post:
 *          summary: Create Customer
 *          tags: [Customer]
 *          parameters:
 *              -   in: path
 *                  name: realmID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized or Token expired
 *              500:
 *                  description: SystemFailureError from QuickBooks
 */
router.post('/create/:realmID', customerController.createCustomer)

/**
 * @swagger
 *  /v1/quickbooks/customer/get-single-customers/{customer_id}/{realmID}:
*      get:
 *          summary: Get Single Customer
 *          tags: [Customer]
 *          parameters:
 *              -   in: header
 *                  name: authorization
 *                  type: string
 *                  required: true
 *                  description: Bearer token
 *              -   in: path
 *                  name: customer_id
 *                  type: integer
 *                  required: true
 *              -   in: path
 *                  name: realmID
 *                  type: string
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized or Token expired
 *              500:
 *                  description: SystemFailureError from QuickBooks
 */
router.get('/get-single-customer/:id/:realmID', customerController.getCustomerById)

/**
 * @swagger
 *  /v1/quickbooks/customer/get-customers/{realmID}:
*      get:
 *          summary: Get All Customers
 *          tags: [Customer]
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
router.get('/get-customers/:realmID', customerController.getAllCustomers)

/**
 * @swagger
 *  /v1/quickbooks/customer/sparse-update/{realmID}:
 *      post:
 *          summary: Sparse Update Customer
 *          tags: [Customer]
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
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized or Token expired
 *              500:
 *                  description: SystemFailureError from QuickBooks
 */
router.post('/sparse-update/:realmID', customerController.customerSparseUpdate)


module.exports = router