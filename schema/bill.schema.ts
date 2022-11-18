import { BillStatus } from './../models/bill';
/**
 * @openapi
 * components:
 *  schemas:
 *   BillDetail:
 *     type: object
 *     properties:
 *        bill_id:
 *          type: integer
 *          description: Id of bill
 *        book_id:
 *          type: string
 *          description: Id of book
 *        unit_price:
 *          type: decimal
 *          description: Unit price of bill
 *        quantity:
 *          type: integer
 *          description: Quantity of bill
 *          default: 1
 *   Bill:
 *    type: object
 *    properties:
 *      id:
 *        type: integer
 *        description: Id of bill
 *      transport_id:
 *        type: string
 *        description: Transport id of bill
 *      user_id:
 *        type: string
 *        description: User id of bill
 *      status:
 *        type: string
 *        description: Status of bill
 *        default: WAITING
 *        enum:
 *        - WAITING
 *        - PROCESSING
 *        - COMPLETED
 *        - CANCELED
 *        - TRANSPORTING
 *      bill_details:
 *        type: array
 *        items:
 *          $ref: '#/components/schemas/BillDetail'
 */
import {IsDefined, IsEnum} from "class-validator";

class StatusUpdateRequest {

    @IsEnum(BillStatus)
    @IsDefined()
    status: BillStatus;

}
