const express = require('express');
const validate = require('../../middlewares/validate');
const caseValidation = require('../../validations/case.validation');
const caseController = require('../../controllers/case.controller');

const router = express.Router();

router.route('/').get(validate(caseValidation.getCases), caseController.getCases);

router.route('/:caseId').get(validate(caseValidation.getCase), caseController.getCase);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Cases
 *   description: Case management and retrieval
 */

/**
 * @swagger
 * path:
 *  /cases:
 *    get:
 *      summary: Get all cases
 *      description: Anyone can retrieve all cases.
 *      tags: [Cases]
 *      parameters:
 *        - in: query
 *          name: healthStatus
 *          schema:
 *            type: string
 *            enum: [asymptomatic, mild, severe, critical, died, recovered, invalid]
 *          description: Known current health status of patient
 *        - in: query
 *          name: removalType
 *          schema:
 *            type: string
 *            enum: [recovered, died, duplicate]
 *          description: Type of removal
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. name:asc)
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of cases
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  results:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Case'
 *                  page:
 *                    type: integer
 *                    example: 1
 *                  limit:
 *                    type: integer
 *                    example: 10
 *                  totalPages:
 *                    type: integer
 *                    example: 1
 *                  totalResults:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * path:
 *  /cases/{id}:
 *    get:
 *      summary: Get a case
 *      description: Anyone can fetch a specific case.
 *      tags: [Cases]
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Case id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Case'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 */
