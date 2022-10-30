const {BookController} = require('../../controllers/book.controller');
const router = require('express').Router();

router.get('/feedback/:book_id', BookController.getFeedback);
/**
 * @openapi
 * '/api/book/info/{book_id}':
 *  get:
 *     tags:
 *     - Book
 *     summary: Get book info
 *     parameters:
 *     - name: book_id
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
router.get('/info/:book_id', BookController.getBook);
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
router.get('/search', BookController.search);

router.post('/:book_id?', BookController.createOrUpdate); //TODO: create or update
router.delete('/:book_id', BookController.delete); //TODO: delete

module.exports = router;


