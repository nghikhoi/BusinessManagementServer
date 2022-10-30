import {
    IsArray,
    IsBoolean,
    IsDate,
    IsDateString,
    IsDefined,
    IsEnum,
    IsIn,
    IsInt,
    IsNotEmpty,
    IsString,
    Min
} from "class-validator";
import {Gender} from "../models/user";
import {Column} from "typeorm";

/**
 * @openapi
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          description: Id of user
 *        firstname:
 *          type: string
 *          description: Firstname of user
 *        lastname:
 *          type: string
 *          description: Lastname of user
 *        email:
 *          type: string
 *          description: Email of user
 *        username:
 *          type: string
 *          description: Username of user
 *        age:
 *          type: integer
 *          description: Age of user
 *        phone:
 *          type: string
 *          description: Phone of user
 *        gender:
 *          type: string
 *          description: Gender of user
 *          enum:
 *          - MALE
 *          - FEMALE
 *          - OTHER
 *        birthday:
 *          type: string
 *          format: date-time
 *          description: Birthday of user
 *        password:
 *          type: string
 *          description: Password of user
 *        salt:
 *          type: string
 *          description: Salt of user
 *        role:
 *          type: string
 *          description: Role of user
 *          enum:
 *          - ADMIN
 *          - USER
 *        refresh_token:
 *          type: string
 *          description: Refresh token of user
 *    UserAddress:
 *      type: object
 *      properties:
 *        user_id:
 *          type: string
 *          description: Id of user
 *        updated_at:
 *          type: string
 *          format: date-time
 *          description: Updated at of user
 *        street:
 *          type: string
 *          description: Street of useraddress
 *        city:
 *          type: string
 *          description: City of useraddress
 *        zip:
 *          type: string
 *          description: Zip of useraddress
 *        country:
 *          type: string
 *          description: Country of useraddress
 *    UserBank:
 *      type: object
 *      properties:
 *        user_id:
 *          type: string
 *          description: Id of user
 *        updated_at:
 *          type: string
 *          format: date-time
 *          description: Updated at of user
 *        bank_name:
 *          type: string
 *          description: Bank name of userbank
 *        iban:
 *          type: string
 *          description: IBAN of userbank
 *        bic:
 *          type: string
 *          description: BIC of userbank
 *    ProfileUpdateRequest:
 *      type: object
 *      properties:
 *        firstname:
 *          type: string
 *          description: Firstname of user
 *        lastname:
 *          type: string
 *          description: Lastname of user
 *        email:
 *          type: string
 *          description: Email of user
 *        phone:
 *          type: string
 *          description: Phone of user
 *        gender:
 *          type: string
 *          description: Gender of user
 *          enum:
 *          - MALE
 *          - FEMALE
 *          - OTHER
 *        birthday:
 *          type: string
 *          description: Birthday of user
 *    FavouriteBookCRUDRequest:
 *      type: object
 *      properties:
 *        book_id:
 *          type: string
 *          description: Id of book
 *    CartItemAddCRUDRequest:
 *      type: object
 *      properties:
 *        book_id:
 *          type: string
 *          description: Id of book
 *    CartItemUpdateRequest:
 *      allOf:
 *        - $ref: '#components/schemas/CartItemAddCRUDRequest'
 *        - type: object
 *          properties:
 *            quantity:
 *              type: integer
 *              description: Quantity of book
 *            selected:
 *              type: boolean
 *              description: Selected of book
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    UserSearch:
 *      type: object
 *      properties:
 *        skip:
 *          type: integer
 *          description: The number of users to skip.
 *        limit:
 *          type: integer
 *          description: The number of users to return.
 */
export class UserSearch {

    @IsInt()
    @Min(0)
    skip: number;

    @IsInt()
    @Min(1)
    limit: number;

}

/**
 * @openapi
 * components:
 *  schemas:
 *    UserRegister:
 *      type: object
 *      properties:
 *        username:
 *          type: string
 *          description: Username of user
 *        password:
 *          type: string
 *          description: Password of user
 */
export class UserRegister {

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    username: string;

    @IsString()
    @IsNotEmpty()
    @IsDefined()
    password: string;

}

export class ProfileUpdateRequest {

    @IsString()
    firstname: string

    @IsString()
    lastname: string

    @IsString()
    email: string

    @IsString()
    phone: string

    @IsEnum(Gender)
    gender: string

    @IsDateString()
    birthday: string

}

export class FavouriteBookCRUDRequest {

    @IsString()
    @IsDefined()
    book_id: string

    @IsBoolean()
    selected: boolean

}

/**
 * @openapi
 * components:
 *  schemas:
 *    UserBankCRUDRequest:
 *      type: object
 *      properties:
 *        bank_name:
 *          type: string
 *          description: Bank name of userbank
 *        iban:
 *          type: string
 *          description: IBAN of userbank
 *        bic:
 *          type: string
 *          description: BIC of userbank
 */
export class UserBankCRUDRequest {

    @IsString()
    @IsDefined()
    bank_name: string

    @IsString()
    @IsDefined()
    iban: string

    @IsString()
    @IsDefined()
    bic: string

}

/**
 * @openapi
 * components:
 *  schemas:
 *    UserAddressCRUDRequest:
 *      type: object
 *      properties:
 *        street:
 *          type: string
 *          description: Street of useraddress
 *        city:
 *          type: string
 *          description: City of useraddress
 *        zip:
 *          type: string
 *          description: Zip of useraddress
 *        country:
 *          type: string
 *          description: Country of useraddress
 */
export class UserAddressCRUDRequest {

    @IsString()
    @IsDefined()
    address: string

    @IsString()
    @IsDefined()
    street: string

    @IsString()
    @IsDefined()
    city: string

    @IsString()
    @IsDefined()
    project: string

    @IsString()
    @IsDefined()
    ward: string

    @IsString()
    @IsDefined()
    district: string

}

export class CartItemAddCRUDRequest {

    @IsString()
    @IsDefined()
    book_id: string

}

export class CartItemUpdateRequest extends CartItemAddCRUDRequest {

    @IsInt()
    @Min(1)
    quantity: number

    @IsBoolean()
    selected: boolean

}

/**
 * @openapi
 * components:
 *  schemas:
 *    LendRequest:
 *      type: object
 *      properties:
 *        book_ids:
 *          type: array
 *          items:
 *            type: string
 *          description: Book ids
 *        end_date:
 *          type: string
 *          format: date
 *          description: End date of lend
 */
export class LendRequest {

    @IsArray()
    @IsDefined()
    book_ids: string[]

    @IsDate()
    @IsDefined()
    end_date: Date

}