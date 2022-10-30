import {IsBoolean, IsDate, IsDateString, IsDefined, IsEnum, IsIn, IsInt, IsString, Min} from "class-validator";

/**
 * @openapi
 * components:
 *  schemas:
 *    Transporter:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Id of transporter
 *        name:
 *          type: string
 *          description: Name of transporter
 *        description:
 *          type: string
 *          description: Description of transporter
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    TransporterUpdateRequest:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: Name of author
 *        description:
 *          type: string
 *          description: Description of author
 */
export class TransporterUpdateRequest {

    @IsString()
    @IsDefined()
    name: string;

    @IsString()
    description: string;

}