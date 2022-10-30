import {
    IsBoolean,
    IsDate,
    IsDateString,
    IsDecimal,
    IsDefined,
    IsEnum,
    IsIn,
    IsInt,
    IsString,
    Min
} from "class-validator";

/**
 * @openapi
 * components:
 *  schemas:
 *    Book:
 *      type: object
 *      properties:
 *        id:
 *          type: string
 *          format: uuid
 *          description: Id of book
 *        title:
 *          type: string
 *          description: Title of book
 *        description:
 *          type: string
 *          description: Description of book
 *        isbn:
 *          type: string
 *          description: ISBN of book
 *        stock:
 *          type: integer
 *          description: Stock of book
 *        author_id:
 *          type: integer
 *          description: Author id of book
 *        price:
 *          type: decimal
 *          description: Price of book
 *        publisher_id:
 *          type: integer
 *          description: Publisher id of book
 *    FavouriteBook:
 *      type: object
 *      properties:
 *        user_id:
 *          type: string
 *          description: Id of user
 *        book_id:
 *          type: string
 *          description: Id of book
 */

/**
 * @openapi
 * components:
 *  schemas:
 *    BookSearch:
 *      type: object
 *      properties:
 *        skip:
 *          type: integer
 *          description: The number of users to skip.
 *        limit:
 *          type: integer
 *          description: The number of users to return.
 */
export class BookSearch {

    @IsInt()
    @Min(0)
    skip: number;

    @IsInt()
    @Min(1)
    limit: number;

}

abstract class BookCRUDRequest {

    @IsString()
    description: string;

    @IsString()
    isbn: string;

    @IsDecimal()
    price: number;

    @IsString()
    author_id: string;

    @IsString()
    publisher_id: string;

}

export class BookCreateRequest extends BookCRUDRequest {

    @IsDefined()
    @IsString()
    title: string;

}

export class BookUpdateRequest extends BookCRUDRequest {

    @IsString()
    title: string;

}