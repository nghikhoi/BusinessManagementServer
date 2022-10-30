const {PublisherController} = require("../../controllers/publisher.controller");
const router = require("express").Router();

/**
 * @openapi
 * '/api/publisher/{id}':
 *  get:
 *     tags:
 *     - Publisher
 *     summary: Get publisher by id
 *     parameters:
 *     - in: path
 *       name: id
 *       description: Publisher id
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
 *                $ref: '#/components/schemas/Publisher'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/:id', PublisherController.one);
/**
 * @openapi
 * '/api/publisher/{id}':
 *  post:
 *     tags:
 *     - Publisher
 *     summary: Update an publisher
 *     parameters:
 *     - in: path
 *       name: id
 *       description: publisher id
 *       required: true
 *       type: string
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PublisherUpdateRequest'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Publisher'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.put('/:id', PublisherController.update);
/**
 * @openapi
 * '/api/publisher/{id}':
 *  delete:
 *     tags:
 *     - Publisher
 *     summary: Delete an publisher
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id of publisher
 *       required: true
 *     responses:
 *      200:
 *        description: Successfully deleted
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.delete('/:id', PublisherController.delete);

/**
 * @openapi
 * '/api/publisher':
 *  get:
 *     tags:
 *     - Publisher
 *     summary: Get publishers
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            content:
 *              type: array
 *              schema:
 *                $ref: '#/components/schemas/Publisher'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/', PublisherController.all);
/**
 * @openapi
 * '/api/publisher':
 *  post:
 *     tags:
 *     - Publisher
 *     summary: Create publisher
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PublisherUpdateRequest'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Publisher'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/', PublisherController.create);

module.exports = router;