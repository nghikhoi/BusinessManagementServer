import {IsBoolean, IsDate, IsDateString, IsDefined, IsEnum, IsIn, IsInt, IsString, Min} from "class-validator";
import {DiscountType} from "../models/voucher";
/**
 * @openapi
 * components:
 *  schemas:
 *    VoucherProfile:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: Id of voucher
 *        name:
 *          type: string
 *          description: Name of voucher
 *        discount_type:
 *          type: string
 *          description: Discount type of voucher
 *          enum:
 *          - PERCENTAGE
 *          - AMOUNT
 *        discount:
 *          type: decimal
 *          description: Discount of voucher
 *    BookTagVoucher:
 *      allOf:
 *        - $ref: '#/components/schemas/VoucherProfile'
 *        - type: object
 *          properties:
 *            tags:
 *              type: array
 *              items:
 *                type: string
 *              enum:
 *              - Drama
 *              - Comedy
 *              - Horror
 *              - Thriller
 *              - Romance
 *              - Mystery
 *              - Fantasy
 *              - ScienceFiction
 *              - Biography
 *              - SelfHelp
 *              - Health
 *              - Humor
 *              - History
 *              - Poetry
 *              - Essay
 *              - Memoir
 *              - Autobiography
 *              - Business
 *              - Travel
 *              - Journalism
 *              - Art
 *              - Literature
 *              description: Tags of voucher
 *    BaseVoucher:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: Id of user
 *        code:
 *          type: string
 *          description: Code of voucher
 *        release_date:
 *          type: string
 *          format: date-time
 *          description: Release date of voucher
 *        expire_date:
 *          type: string
 *          format: date-time
 *          description: Expire date of voucher
 *        profile_id:
 *          type: string
 *          description: Profile id of voucher
 *    Voucher:
 *      allOf:
 *        - $ref: '#/components/schemas/BaseVoucher'
 *        - type: object
 *          properties:
 *            user_id:
 *              type: string
 *              description: User id of voucher
 *            used_at:
 *              type: string
 *              format: date-time
 *              description: Used at of voucher
 *    WildVoucher:
 *      allOf:
 *        - $ref: '#/components/schemas/BaseVoucher'
 *        - type: object
 *          properties:
 *            remaining_uses:
 *              type: integer
 *              description: Remaining uses of voucher
 *            max_uses:
 *              type: integer
 *              description: Max uses of voucher
 */
