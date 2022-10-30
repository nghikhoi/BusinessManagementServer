import {IsBoolean, IsDate, IsDateString, IsDefined, IsEnum, IsIn, IsInt, IsString, Min} from "class-validator";

/**
 * @openapi
 * components:
 *  schemas:
 *    Transport:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: Id of transport
 *        transporter_id:
 *          type: integer
 *          description: Id of transporter
 *        tracking:
 *          type: string
 *          description: Tracking of transport
*/
