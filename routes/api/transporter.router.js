const {TransporterController} = require("../../controllers/transporter.controller");
const router = require("express").Router();

/**
 * @openapi
 * '/api/transporter/{id}':
 *  get:
 *     tags:
 *     - Transporter
 *     summary: Get transporter by id
 *     parameters:
 *     - in: path
 *       name: id
 *       description: Transporter id
 *       required: true
 *       type: string
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            content:
 *              type: array
 *              schema:
 *                $ref: '#/components/schemas/Transporter'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/:id', TransporterController.one);
/**
 * @openapi
 * '/api/transporter/{id}':
 *  post:
 *     tags:
 *     - Transporter
 *     summary: Update an transporter
 *     parameters:
 *     - in: path
 *       name: id
 *       description: transporter id
 *       required: true
 *       type: string
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TransporterUpdateRequest'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Transporter'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.put('/:id', TransporterController.update);
/**
 * @openapi
 * '/api/transporter/{id}':
 *  delete:
 *     tags:
 *     - Transporter
 *     summary: Delete an transporter
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id of transporter
 *       required: true
 *     responses:
 *      200:
 *        description: Successfully deleted
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.delete('/:id', TransporterController.delete);

/**
 * @openapi
 * '/api/transporter':
 *  get:
 *     tags:
 *     - Transporter
 *     summary: Get transporters
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            content:
 *              type: array
 *              schema:
 *                $ref: '#/components/schemas/Transporter'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/', TransporterController.all);
/**
 * @openapi
 * '/api/transporter':
 *  post:
 *     tags:
 *     - Transporter
 *     summary: Create transporter
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/TransporterUpdateRequest'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Transporter'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/', TransporterController.create);

module.exports = router;