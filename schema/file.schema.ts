import {IsBoolean, IsDate, IsDateString, IsDefined, IsEnum, IsIn, IsInt, IsString, Min} from "class-validator";

/**
 * @openapi
 * components:
 *  schemas:
 *    File:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: Id of file
 *        name:
 *          type: string
 *          description: Name of file
 *        path:
 *          type: string
 *          description: Path of file
 *    Media:
 *      allOf:
 *        - $ref: '#/components/schemas/File'
 *        - type: object
 *    Image:
 *      allOf:
 *        - $ref: '#/components/schemas/Media'
 *        - type: object
 *          properties:
 *            width:
 *              type: integer
 *              description: Width of image
 *            height:
 *              type: integer
 *              description: Height of image
 *    Video:
 *      allOf:
 *        - $ref: '#/components/schemas/Media'
 *        - type: object
 *          properties:
 *            duration:
 *              type: integer
 *              description: Duration of video
 *    Audio:
 *      allOf:
 *        - $ref: '#/components/schemas/Media'
 *        - type: object
 *          properties:
 *            duration:
 *              type: integer
 *              description: Duration of audio
 *    Document:
 *      allOf:
 *        - $ref: '#/components/schemas/File'
 *        - type: object
 *          properties:
 *            size:
 *              type: integer
 *              description: Size of document
 *    Other:
 *      allOf:
 *        - $ref: '#/components/schemas/File'
 *        - type: object
 *          properties:
 *            size:
 *              type: integer
 *              description: Size of other
 */
