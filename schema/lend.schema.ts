import {IsBoolean, IsDate, IsDateString, IsDefined, IsEnum, IsIn, IsInt, IsString, Min} from "class-validator";

/**
 * @openapi
 * components:
 *  schemas:
 *    Lend:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: Id of lend
 *        user_id:
 *          type: string
 *          format: uuid
 *          description: Id of user
 *        book_id:
 *          type: string
 *          description: Id of book
 *        unit_price:
 *          type: number
 *          description: Price of lend
 *        start_date:
 *          type: string
 *          format: date-time
 *          description: Start date of lend
 *        end_date:
 *          type: string
 *          format: date-time
 *          description: End date of lend
 */
