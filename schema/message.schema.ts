import {IsBoolean, IsDate, IsDateString, IsDefined, IsEnum, IsIn, IsInt, IsString, Min} from "class-validator";

/**
 * @openapi
 * components:
 *  schemas:
 *    Message:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: Id of message
 *        text:
 *          type: string
 *          description: Text of message
 *    Feedback:
 *      allOf:
 *        - $ref: '#/components/schemas/Message'
 *        - type: object
 *          properties:
 *            rating:
 *              type: integer
 *              description: Rating of feedback
 *    ReplyFeedback:
 *      allOf:
 *        - $ref: '#/components/schemas/Message'
 *        - type: object
 */
