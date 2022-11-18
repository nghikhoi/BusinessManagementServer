const {ProductController} = require('../../controllers/product.controller');
const router = require('express').Router();
/**
 * @openapi
 * '/api/book/info/{product_id}':
 *  get:
 *     tags:
 *     - Book
 *     summary: Get book info
 *     parameters:
 *     - name: product_id
 *       type: string
 *       in: path
 *       description: book id
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Book'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/info/:product_id', ProductController.getProduct);
/**
 * @openapi
 * '/api/book/search':
 *  get:
 *     tags:
 *     - Book
 *     summary: Search books
 *     query:
 *       content:
 *          application/json:
 *             schema:
 *                $ref: '#/components/schemas/BookSearch'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            content:
 *              type: array
 *              schema:
 *                $ref: '#/components/schemas/Book'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/search', ProductController.search);

router.post('/:product_id?', ProductController.createOrUpdate); //TODO: create or update
router.delete('/:product_id', ProductController.delete); //TODO: delete

module.exports = router;


