import {NextFunction, Request, Response} from "express"
import {
    FavouriteBookRepository,
    ProfileProperties, RecentBookRepository,
    UserAddressRepository,
    UserBankRepository,
    UserRepository
} from "../repositories/user.repository"
import {bodyFilter} from "./helper";
import {CartItemRepository, InteractProperties} from "../repositories/caritem.repository";
import {BillRepository} from "../repositories/bill.repository";
import {BillStatus} from "../models/billstatus";
import {LendRepository} from "../repositories/lend.repository";
import {User, UserAddress} from "../models/user";
import {BookRepository} from "../repositories/book.repository";
import {Role} from "../models/role";
import { passwordVerify } from "../routes/auth/auth.methods";

export class UserController {

    static async getUser(request: Request, response: Response, next: NextFunction) {
        return response.json(await UserRepository.findOneBy({
            id: request.params.user_id
        }));
    }

    static async search(request: Request, response: Response, next: NextFunction) {
        const query = request.query;
        if (request.params.search) {
            return response.json(await UserRepository.searchByUser(request.params.search, query.select as any, query.skip as any, query.limit as any));
        }
        return response.json(await UserRepository.search(query.select as any, query.skip as any, query.limit as any, query.search as any, query.search_by as any));
    }

    //region Profile
    static async getProfile(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request['user']['id'];
        return response.json(await UserRepository.findOne({
            where: {
                id: targetId
            },
            select: ProfileProperties.concat(['id']) as any,
            relations: {
                addresses: true,
                banks: true,
                avatar: true
            }
        }));
    }

    static async updateProfile(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.us || request['user']['id'];
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            },
            select: ProfileProperties.concat(['id']) as any,
        });
        if (user) {
            const body = bodyFilter(request.body, ProfileProperties);
            const res = await UserRepository.save({
                id: targetId,
                ...body
            });
            return response.json(res);
        }
        return response.json({
            message: 'User not found'
        });
    }

    //endregion

    //region RecentBook
    static async recentBooks(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            },
            relations: {
                recent_books: true
            },
            select: ['recent_books']
        });
        const books = await Promise.all(user.recent_books.map(async item => {
            return await BookRepository.findOne({
                where: {
                    id: item.book_id
                }
            });
        }));
        return response.json(books);
    }

    static async addRecentBook(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request['user']['id'];
        return response.json(await RecentBookRepository.save({
            user_id: targetId,
            book_id: request.body.book_id
        }));
    }

    //endregion

    //region FavouriteBook
    static async favouriteBooks(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            },
            relations: {
                favourite_books: true
            },
            select: ['favourite_books']
        });
        const books = await Promise.all(user.favourite_books.map(async item => {
            return await BookRepository.findOne({
                where: {
                    id: item.book_id
                }
            });
        }));
        return response.json(books);
    }

    static async addFavouriteBook(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request['user']['id'];
        const result = await FavouriteBookRepository.save({
            user_id: targetId,
            book_id: request.body.book_id
        });
        return response.json({
            item: result.book_id,
            message: 'Book added to favourites',
            status_code: 201
        });
    }

    static async removeFavouriteBook(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request['user']['id'];
        const bookId = request.params.book_id;
        const book = await FavouriteBookRepository.findOne({
            where: {
                user_id: targetId,
                book_id: bookId
            }
        });
        if (book) {
            await FavouriteBookRepository.remove(book);
            return response.json({
                message: 'Book removed from favourites',
                status_code: 200
            });
        }
        return response.json({
            message: 'Book not found',
            status_code: 404
        });
    }

    //endregion

    //region CartItem
    static async cartItems(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request['user']['id'];
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            },
            relations: {
                cart_items: true
            },
            select: ['cart_items']
        });
        return response.json(user.cart_items);
    }

    static async addCartItem(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request['user']['id'];
        console.log(request.body.book_id)
        const cartItem = await CartItemRepository.findOne({
            where: {
                user_id: targetId,
                book_id: request.body.book_id
            }
        });
        let result;
        if (cartItem) {
            const filter = bodyFilter(request.body, ['selected']);
            console.log(filter);
            CartItemRepository.merge(cartItem, filter);

            if (request.body.quantity_action && request.body.quantity_action === 'add') {
                cartItem.quantity += request.body.quantity;
            } else {
                cartItem.quantity = request.body.quantity;
            }

            result = await CartItemRepository.save(cartItem);
        } else {
            const newCart = CartItemRepository.create({
                user_id: targetId,
                book_id: request.body.book_id,
            });
            if (request.body.quantity) {
                newCart.quantity = request.body.quantity;
            }
            result = await CartItemRepository.save(newCart);
        }
        return response.json({
            item: result,
            message: 'Book added to cart',
            status_code: 200
        });
    }

    static async removeCartItem(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const bookId = request.params.book_id;
        const item = await CartItemRepository.findOne({
            where: {
                user_id: targetId,
                book_id: bookId
            }
        });
        if (item) {
            await CartItemRepository.remove(item);
            return response.json({
                message: 'Book removed from cart',
                status_code: 200
            });
        }
        return response.json({
            message: 'Book not found',
            status_code: 404
        });
    }

    static async updateCartItem(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request['user']['id'];
        const bookId = request.params.book_id;
        const item = await CartItemRepository.findOne({
            where: {
                user_id: targetId,
                book_id: bookId
            }
        });
        if (item) {
            const body = bodyFilter(request.body, InteractProperties);
            await CartItemRepository.save(CartItemRepository.merge(item, body));
            return response.json({
                message: 'Book quantity updated'
            });
        }
        return response.json({
            message: 'Book not found'
        });
    }

    //endregion

    //region Bill
    static async getBills(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            },
            relations: {
                bills: true
            },
            select: ['bills']
        });
        return response.json(user.bills);
    }

    static async createBillFromCart(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const bill = request.body.items ? await BillRepository.createFrom(targetId, request.body.items) : await BillRepository.createFromCart(targetId);

        bill.address_id = request.body.address_id;
        bill.payment = request.body.payment;
        bill.bank_id = request.body.bank_id;

        await CartItemRepository.removeAll(targetId, bill.bill_details.map(item => item.book_id));
        return response.json(await BillRepository.save(bill));
    }

    static async cancelBill(request: Request, response: Response, next: NextFunction) {
        const billId = +request.params.bill_id;
        const bill = await BillRepository.findOne({
            where: {
                id: billId,
            }
        });
        if (bill) {
            bill.status = BillStatus.CANCELED;
            await BillRepository.remove(bill);
            return response.json({
                message: 'Bill canceled'
            });
        }
        return response.json({
            message: 'Bill not found'
        });
    }

    //endregion

    //region Address
    static async getAddresses(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            },
            relations: {
                addresses: true
            },
            select: ['addresses']
        });
        return response.json(user.addresses);
    }

    static async getAddress(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const addressId = +request.params.address_id;
        const address = await UserAddressRepository.findOne({
            where: {
                sub_id: addressId,
                user_id: targetId
            }
        });
        return response.json(address);
    }

    static async addAddress(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const body = request.body;
        const address: UserAddress = await UserAddressRepository.save({
            ...body,
            user_id: targetId,
            sub_id: Date.now()
        });
        const addresses = await UserAddressRepository.find({
            where: {
                user_id: targetId
            }
        });
        if (addresses.length == 1 || address.is_primary) {
            await UserAddressRepository.setPrimary(address.user_id, address.sub_id);
        }
        return response.json({
            message: 'Address added',
            status_code: 201,
            item: address
        });
    }

    static async removeAddress(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const addressId = +request.params.address_id;
        const address = await UserAddressRepository.findOne({
            where: {
                sub_id: addressId,
                user_id: targetId
            }
        });
        if (address) {
            await UserAddressRepository.softDelete({
                sub_id: addressId
            });
            return response.json({
                message: 'Address removed',
                status_code: 200
            });
        }
        return response.json({
            status_code: 404,
            message: 'Address not found'
        });
    }

    //endregion

    //region Bank
    static async getBanks(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            },
            relations: {
                banks: true
            },
            select: ['banks']
        });
        return response.json(user.banks);
    }

    static async getBank(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const bankId = +request.params.bank_id;
        const bank = await UserBankRepository.findOne({
            where: {
                sub_id: bankId,
                user_id: targetId
            }
        });
        return response.json(bank);
    }

    static async addBank(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const body = request.body;
        const bank = await UserBankRepository.save({
            ...body,
            user_id: targetId,
            sub_id: Date.now()
        });
        const banks = await UserBankRepository.find({
            where: {
                user_id: targetId
            }
        });
        if (banks.length == 1 || bank.is_primary) {
            await UserBankRepository.setPrimary(bank.user_id, bank.sub_id);
        }
        return response.json({
            message: 'Bank added',
            status_code: 200,
            item: bank
        });
    }

    static async removeBank(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const bankId = +request.params.bank_id;
        const bank = await UserBankRepository.findOne({
            where: {
                sub_id: bankId,
                user_id: targetId
            }
        });
        if (bank) {
            await UserBankRepository.softDelete({
                sub_id: bankId,
            });
            return response.json({
                status_code: 200,
                message: 'Bank removed'
            });
        }
        return response.json({
            status_code: 404,
            message: 'Bank not found'
        });
    }

    //endregion

    //region Lend
    static async getLends(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            },
            relations: {
                lends: true
            },
            select: ['lends']
        });
        return response.json(user.lends);
    }

    static async addLend(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const body = request.body;
        const lend = await LendRepository.lend(targetId, body.book_id, body.end_date);
        return response.json(lend);
    }

    //endregion

    //region Moderator
    static async createModerator(request: Request, response: Response, next: NextFunction) {
        const body = request.body;
        const user = await UserRepository.save({
            ...body,
            role: 'moderator'
        });
        return response.json(user);
    }

    //endregion

    //region Voucher
    static async getVouchers(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id || request["user"]['id'];
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            },
            relations: {
                vouchers: true
            },
            select: ['vouchers']
        });
        return response.json(user.vouchers);
    }

    //endregion

    static async save(request: Request, response: Response, next: NextFunction) {
        return UserRepository.save(request.body)
    }

    static async register(request: Request, response: Response, next: NextFunction) {
        const username =  request.body.username;

        const existingUser = await UserRepository.findOneByUser(username);
        if (existingUser) {
            console.log(existingUser);
            return response.json({
                message: 'User already exists',
                status_code: 409
            });
        }

        const temp = UserRepository.create({
            username: username,
            password: request.body.password,
            role: Role.USER,
            birthday: request.body.birthday,
            gender: request.body.gender,
            email: request.body.email,
            phone: request.body.phone
        });
        const user = await UserRepository.save(temp);

        return response.json({
            message: 'User created',
            status_code: 201,
            id: user.id
        });
    }

    static async remove(request: Request, response: Response, next: NextFunction) {
        let userToRemove = await UserRepository.findOneBy({id: request.params['id']})
        await UserRepository.remove(userToRemove)
    }

    static async isFavouriteBook(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id;
        const bookId = request.params.book_id;
        const book = await FavouriteBookRepository.findOne({
            where: {
                book_id: bookId,
                user_id: targetId
            }
        });
        return response.json({
            item: !!book,
            status_code: 200
        });
    }

    static async changePassword(request: Request, response: Response, next: NextFunction) {
        const targetId = request.params.user_id;
        const oldPassword = request.body.old_password;
        const newPassword = request.body.new_password;
        const user = await UserRepository.findOne({
            where: {
                id: targetId
            }
        });
        await passwordVerify(oldPassword, user.salt, user.password, async (err, res) => {
            if (!res) {
                return response.json({
                    message: 'Wrong password',
                    status_code: 401
                });
            }
            user.password = newPassword;
            await UserRepository.save(user);
            return response.json({
                message: 'Password changed',
                status_code: 200
            });
        });
    }

}
