import {IsDefined, IsString} from "class-validator";

/**
 * @openapi
 * components:
 *  schemas:
 *    Author:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: Id of author
 *        name:
 *          type: string
 *          description: Name of author
 *        description:
 *          type: string
 *          description: Description of author
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    AuthorUpdateRequest:
 *      type: object
 *      properties:
 *        name:
 *          type: string
 *          description: Name of author
 *        description:
 *          type: string
 *          description: Description of author
 */
export class AuthorUpdateRequest {

    @IsString()
    @IsDefined()
    name: string;

    @IsString()
    description: string;

}