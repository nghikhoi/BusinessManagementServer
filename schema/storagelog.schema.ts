import {IsBoolean, IsDate, IsDateString, IsDefined, IsEnum, IsIn, IsInt, IsString, Min} from "class-validator";
import {StorageAction} from "../models/storagelog";
/**
 * @openapi
 * components:
 *  schemas:
 *    StorageLog:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: Id of storage log
 *        actor_id:
 *          type: string
 *          description: Id of actor
 *        description:
 *          type: string
 *          description: Description of storage log
 *        date:
 *          type: string
 *          format: date-time
 *          description: Date of storage log
 *        action:
 *          type: string
 *          description: Action of storage log
 *          enum:
 *          - IMPORT
 *          - EXPORT
 *    StorageLogDetail:
 *      type: object
 *      properties:
 *        book_id:
 *          type: string
 *          description: Id of book
 *        log_id:
 *          type: string
 *          description: Id of storage log
 *        quantity:
 *          type: integer
 *          description: Quantity of book
 */
