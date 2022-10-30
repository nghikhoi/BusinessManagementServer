const {AuthorController} = require("../../controllers/author.controller");
const router = require("express").Router();

/**
 * @openapi
 * '/api/author/{id}':
 *  get:
 *     tags:
 *     - Author
 *     summary: Get author by id
 *     parameters:
 *     - in: path
 *       name: id
 *       description: Author id
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
 *                $ref: '#/components/schemas/Author'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/:id', AuthorController.one);
/**
 * @openapi
 * '/api/author/{id}':
 *  post:
 *     tags:
 *     - Author
 *     summary: Update an author
 *     parameters:
 *     - in: path
 *       name: id
 *       description: author id
 *       required: true
 *       type: string
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AuthorUpdateRequest'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Author'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/:id', AuthorController.update);
/**
 * @openapi
 * '/api/author/{id}':
 *  delete:
 *     tags:
 *     - Author
 *     summary: Delete an author
 *     parameters:
 *     - name: id
 *       in: path
 *       description: id of author
 *       required: true
 *     responses:
 *      200:
 *        description: Successfully deleted
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.delete('/:id', AuthorController.delete);

/**
 * @openapi
 * '/api/author':
 *  get:
 *     tags:
 *     - Author
 *     summary: Get authors
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            content:
 *              type: array
 *              schema:
 *                $ref: '#/components/schemas/Author'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/', AuthorController.all);
/**
 * @openapi
 * '/api/author':
 *  post:
 *     tags:
 *     - Author
 *     summary: Create author
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/AuthorUpdateRequest'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Author'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/', AuthorController.create);

module.exports = router;