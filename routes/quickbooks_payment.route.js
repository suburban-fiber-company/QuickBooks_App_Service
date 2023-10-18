const router = require('express').Router()
const paymentController = require('../app/controllers/quickbooks_payment.controller')
const { route } = require('./quickbooks_ouath.route')


/**
 *  @swagger
 *  components:
 *      schemas:
 *          PaymentRequest:
 *              type: object
 *              properties:
 *                  TotalAmount:
 *                      type: string
 *                      description: Total Amount of the Payment
 *                      required: true
 *                  CustomerRef:
 *                      type: object
 *                      description: Customer Object with value and name
 *                      required: true
 */


/**
 * @swagger
 *  /v1/quickbooks/payment/get-payment/{realmID}/{payment_id}:
*      get:
 *          summary: Get Single Payment
 *          tags: [QuickBooks Payment]
 *          parameters:
*              -   in: path
 *                  name: realmID
 *                  type: string
 *                  required: true
 *              -   in: query
 *                  name: payment_id
 *                  type: integer
 *                  required: true
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized or Token expired
 *              500:
 *                  description: SystemFailureError from QuickBooks
 */
router.get('/get-payment/:realmID/:payment_id', paymentController.getSinglePayment)

/**
 * @swagger
 *  /v1/quickbooks/payment/create/{realmID}:
 *      post:
 *          summary: Create Single Payment
 *          tags: [QuickBooks Payment]
 *          parameters:
 *              -   in: path
 *                  name: realmID
 *                  type: string
 *                  required: true
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/PaymentRequest'
 *          responses:
 *              200:
 *                  description: Success
 *              401:
 *                  description: Unauthorized or Token expired
 *              500:
 *                  description: SystemFailureError from QuickBooks
 */
router.post('/create/:realmID', paymentController.createPayment)

module.exports = router