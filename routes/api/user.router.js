const {ValidateProperty} = require("../middleware/validateproperty");
const {UserSearch, ProfileUpdateRequest} = require("../../schema/user.schema");
const router = require('express').Router();
const UserController = require('../../controllers/user.controller').UserController;

router.get('/profile/:user_id?', UserController.getProfile);
router.post('/profile/:user_id?', ValidateProperty(ProfileUpdateRequest), UserController.updateProfile);

router.get('/setting/:user_id?'); //TODO: get user setting
router.post('/setting/:user_id?'); //TODO: update user setting

/**
 * @openapi
 * '/api/user/recent/{user_id}':
 *  get:
 *     tags:
 *     - User
 *     - RecentBook
 *     summary: Get recent book list of user
 *     parameters:
 *     - name: user_id
 *       type: string
 *       in: path
 *       description: User id for query (optional - default is self)
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Book'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/recent/:user_id?', UserController.recentBooks);
/**
 * @openapi
 * '/api/user/recent/{user_id}':
 *  post:
 *     tags:
 *     - User
 *     - RecentBook
 *     summary: Add a book to recent book list of user
 *     parameters:
 *     - name: user_id
 *       in: path
 *       description: user id
 *       type: string
 *     - name: book_id
 *       in: body
 *       description: book id
 *       type: string
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/recent/:user_id?', UserController.addRecentBook);

router.get('/favourite/:book_id/:user_id?', UserController.isFavouriteBook);
/**
 * @openapi
 * '/api/user/favourites/{user_id}':
 *  get:
 *     tags:
 *     - User
 *     - FavouriteBook
 *     summary: Get user's cart
 *     parameters:
 *     - name: user_id
 *       type: string
 *       in: path
 *       description: User id for query (optional - default is self)
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Book'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/favourites/:user_id?', UserController.favouriteBooks);
/**
 * @openapi
 * '/api/user/favourite/{user_id}':
 *  post:
 *     tags:
 *     - User
 *     - FavouriteBook
 *     summary: Add a book to user's favourite list
 *     parameters:
 *     - name: user_id
 *       in: path
 *       description: user id
 *       type: string
 *     - name: book_id
 *       in: body
 *       description: book id
 *       type: string
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/favourite/:user_id?', UserController.addFavouriteBook);
/**
 * @openapi
 * '/api/user/favourite/{user_id}':
 *  delete:
 *     tags:
 *     - User
 *     - FavouriteBook
 *     summary: Delete a book from user's favourite list
 *     parameters:
 *     - name: user_id
 *       in: path
 *       description: user id
 *       type: string
 *     - name: book_id
 *       in: body
 *       description: book id
 *       type: string
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.delete('/favourite/:book_id/:user_id?', UserController.removeFavouriteBook);

/**
 * @openapi
 * '/api/user/carts/{user_id}':
 *  get:
 *     tags:
 *     - User
 *     - CartItem
 *     summary: Get user's cart
 *     parameters:
 *     - name: user_id
 *       type: string
 *       in: path
 *       description: User id for query (optional - default is self)
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/CartItem'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/carts/:user_id?', UserController.cartItems);
/**
 * @openapi
 * '/api/user/cart/{user_id}':
 *  post:
 *     tags:
 *     - User
 *     - CartItem
 *     summary: Create user's bill from cart items
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CartItemUpdateRequest'
 *     parameters:
 *     - name: user_id
 *       type: string
 *       in: path
 *       description: User id for query (optional - default is self)
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CartItem'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/cart/:user_id?', UserController.addCartItem);
/**
 * @openapi
 * '/api/user/cart/{user_id}':
 *  delete:
 *     tags:
 *     - User
 *     - CartItem
 *     summary: Remove a cart item
 *     parameters:
 *     - name: user_id
 *       in: path
 *       description: user id
 *       type: string
 *     - name: book_id
 *       in: body
 *       description: book id
 *       type: string
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.delete('/cart/:book_id/:user_id?', UserController.removeCartItem);

/**
 * @openapi
 * '/api/user/bill/{user_id}':
 *  get:
 *     tags:
 *     - User
 *     - Bill
 *     summary: Get user's bill
 *     parameters:
 *     - name: user_id
 *       type: string
 *       in: path
 *       description: User id for query (optional - default is self)
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Bill'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/bills/:user_id?', UserController.getBills);
/**
 * @openapi
 * '/api/user/bill/{user_id}':
 *  post:
 *     tags:
 *     - User
 *     - Bill
 *     summary: Create user's bill from cart items
 *     parameters:
 *     - name: user_id
 *       type: string
 *       in: path
 *       description: User id for query (optional - default is self)
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Bill'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/bill/:user_id?', UserController.createBillFromCart);
/**
 * @openapi
 * '/api/user/bill/{user_id}':
 *  delete:
 *     tags:
 *     - User
 *     - Bill
 *     summary: Cancel bill
 *     parameters:
 *     - name: bill_id
 *       in: path
 *       description: Bill id for query
 *       type: string
 *       required: true
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.delete('/bill/:bill_id', UserController.cancelBill); //

/**
 * @openapi
 * '/api/user/addresses/{user_id}':
 *  get:
 *     tags:
 *     - User
 *     - Address
 *     summary: Query user's address
 *     parameters:
 *     - name: user_id
 *       type: string
 *       in: path
 *       description: User id for query (optional - default is self)
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/UserAddress'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/addresses/:user_id?', UserController.getAddresses);
router.get('/address/:address_id/:user_id?', UserController.getAddress);
/**
 * @openapi
 * '/api/user/address/{user_id}':
 *  post:
 *     tags:
 *     - User
 *     - Address
 *     summary: Add bank
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserAddressCRUDRequest'
 *     parameters:
 *     - name: user_id
 *       type: string
 *       in: path
 *       description: User id for query (optional - default is self)
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserAddress'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/address/:address_id(\\d+)/:user_id?', UserController.addAddress);
router.post('/address/:user_id?', UserController.addAddress);
/**
 * @openapi
 * '/api/user/address/{user_id}':
 *  delete:
 *     tags:
 *     - User
 *     - Address
 *     summary: Delete address
 *     parameters:
 *     - name: user_id
 *       type: string
 *       in: path
 *       description: User id for query (optional - default is self)
 *     - name: address_id
 *       in: body
 *       description: Address id to delete
 *       type: string
 *       format: date-time
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.delete('/address/:address_id/:user_id?', UserController.removeAddress);

/**
 * @openapi
 * '/api/user/banks/{user_id}':
 *  get:
 *     tags:
 *     - User
 *     - Bank
 *     summary: Query user's bank accounts
 *     parameters:
 *     - name: user_id
 *       type: string
 *       in: path
 *       description: User id for query (optional - default is self)
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/UserBank'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/banks/:user_id?', UserController.getBanks);
router.get('/bank/:bank_id/:user_id?', UserController.getBank);
/**
 * @openapi
 * '/api/user/bank/{user_id}':
 *  post:
 *     tags:
 *     - User
 *     - Bank
 *     summary: Add bank
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserBankCRUDRequest'
 *     parameters:
 *     - name: user_id
 *       type: string
 *       in: path
 *       description: User id for query (optional - default is self)
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserBank'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/bank/:bank_id(\\d+)/:user_id?', UserController.addBank);
router.post('/bank/:user_id?', UserController.addBank);
/**
 * @openapi
 * '/api/user/bank/{user_id}':
 *  delete:
 *     tags:
 *     - User
 *     - Bank
 *     summary: Remove bank account
 *     parameters:
 *     - name: user_id
 *       type: string
 *       in: path
 *       description: User id for query (optional - default is self)
 *     - name: bank_id
 *       in: body
 *       description: Book id for query
 *       type: string
 *       format: date-time
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.delete('/bank/:bank_id/:user_id?', UserController.removeBank);

/**
 * @openapi
 * '/api/user/lends/{user_id}':
 *  get:
 *     tags:
 *     - User
 *     - Lend
 *     summary: Query user's lend
 *     parameters:
 *     - name: user_id
 *       type: string
 *       in: path
 *       description: User id for query (optional - default is self)
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Lend'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/lends/:user_id?', UserController.getLends);
/**
 * @openapi
 * '/api/user/lend/{user_id}':
 *  post:
 *     tags:
 *     - User
 *     - Lend
 *     summary: Add lend
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LendRequest'
 *     parameters:
 *     - name: user_id
 *       type: string
 *       in: path
 *       description: User id for query (optional - default is self)
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Lend'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/lend/:user_id?', UserController.addLend);
/**
 * @openapi
 * '/api/user/lend/{user_id}':
 *  delete:
 *     tags:
 *     - User
 *     - Lend
 *     summary: Cancel lend
 *     parameters:
 *     - name: user_id
 *       type: string
 *       in: path
 *       description: User id for query (optional - default is self)
 *     - name: book_id
 *       in: body
 *       description: Book id for query
 *       type: string
 *     responses:
 *      200:
 *        description: Success
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.delete('/lend/:user_id?'); //TODO: return book

/**
 * @openapi
 * '/api/user/vouchers/{user_id}':
 *  get:
 *     tags:
 *     - User
 *     - Voucher
 *     summary: Query user's voucher
 *     parameters:
 *     - name: user_id
 *       type: string
 *       in: path
 *       description: User id for query (optional - default is self)
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Voucher'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/vouchers/:user_id?', UserController.getVouchers);

//region Management
/**
 * @openapi
 * '/api/user/moderator/{user_id}':
 *  post:
 *     tags:
 *     - User
 *     summary: Create moderator user
 *     parameters:
 *     - name: user_id
 *       type: string
 *       in: path
 *       description: User id for update (optional - default is self)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegister'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.post('/moderator/:user_id?', UserController.createModerator); //TODO: create or update modeartor
//endregion

router.get('/:user_id', UserController.getUser);
/**
 * @openapi
 * '/api/user':
 *  get:
 *     tags:
 *     - User
 *     summary: Search users
 *     query:
 *       content:
 *          application/json:
 *             schema:
 *                $ref: '#/components/schemas/UserSearch'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
router.get('/', ValidateProperty(null, UserSearch), UserController.search);

module.exports = router;


