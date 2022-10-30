import {IsBoolean, IsDate, IsDateString, IsDefined, IsEnum, IsIn, IsInt, IsString, Min} from "class-validator";

/**
 * @openapi
 * components:
 *  schemas:
 *    CartItem:
 *      type: object
 *      properties:
 *        user_id:
 *          type: string
 *          description: Id of user
 *        book_id:
 *          type: string
 *          description: Id of book
 *        quantity:
 *          type: integer
 *          description: Quantity of cart item
 *          default: 1
 *        selected:
 *          type: boolean
 *          description: Selected of cart item
 *          default: true
 */
