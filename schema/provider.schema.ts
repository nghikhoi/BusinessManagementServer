import {IsBoolean, IsDate, IsDateString, IsDefined, IsEnum, IsIn, IsInt, IsString, Min} from "class-validator";

/**
 * @openapi
 * components:
 *  schemas:
 *    Publisher:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          description: Id of publisher
 *        name:
 *          type: string
 *          description: Name of publisher
 *        description:
 *          type: string
 *          description: Description of publisher
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    PublisherUpdateRequest:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: Name of author
 *        description:
 *          type: string
 *          description: Description of author
 */
export class PublisherUpdateRequest {

    @IsString()
    @IsDefined()
    name: string;

    @IsString()
    description: string;

}