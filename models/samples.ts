import {AppDataSource} from "../config/database";
import {Gender, User, UserAddress, UserBank} from "./user";
import {init} from "../variables/run.variable";
import {Role} from "./role";
import {Author} from "./author";
import {Publisher} from "./publisher";
import {Transporter} from "./transporter";
import {Transport} from "./transport";
import {Book, FavouriteBook} from "./book";
import {Bill, Payment} from "./bill";
import {BillStatus} from "./billstatus";
import {BillDetail} from "./billdetail";
import {CartItem} from "./cartitem";
import {Lend} from "./lend";
import {DiscountType, Voucher, VoucherProfile} from "./voucher";
import {BookTag} from "./booktag";
import {Image} from "./file";
import {Feedback, ReplyFeedback} from "./message";

async function InitCommon() {
    //region Author
    const authorRepo = AppDataSource.getRepository(Author);

    const author1: Author = authorRepo.create({
        name: 'J.K. Rowling'
    })
    await authorRepo.save(author1);

    const author2: Author = authorRepo.create({
        name: 'J.R.R. Tolkien'
    })
    await authorRepo.save(author2);

    const author3: Author = authorRepo.create({
        name: 'Stephen King'
    })
    await authorRepo.save(author3);

    const author4: Author = authorRepo.create({
        name: 'Nguyễn Nhật Ánh'
    })
    await authorRepo.save(author4);

    const author5: Author = authorRepo.create({
        name: 'Thạch Lam'
    })
    await authorRepo.save(author5);

    const author6: Author = authorRepo.create({
        name: 'Ngô Tất Tố'
    })
    await authorRepo.save(author6);

    const author7: Author = authorRepo.create({
        name: 'Hồ Chí Minh'
    })
    await authorRepo.save(author7);

    const author8: Author = authorRepo.create({
        name: 'Trần Đăng Khoa'
    })
    await authorRepo.save(author8);

    const author9: Author = authorRepo.create({
        name: 'Vũ Trọng Phụng'
    })
    await authorRepo.save(author9);

    const author10: Author = authorRepo.create({
        name: 'Xuân Diệu'
    })
    await authorRepo.save(author10);

    const author11: Author = authorRepo.create({
        name: 'Fujiko Fujio'
    })
    await authorRepo.save(author11);
    console.log('Author created');
    //endregion

    //region Publisher
    const publisherRepo = AppDataSource.getRepository(Publisher);

    const publisher1: Publisher = publisherRepo.create({
        name: 'Penguin Books'
    })
    await publisherRepo.save(publisher1);

    const publisher2: Publisher = publisherRepo.create({
        name: 'HarperCollins'
    })
    await publisherRepo.save(publisher2);

    const publisher3: Publisher = publisherRepo.create({
        name: 'Simon & Schuster'
    })
    await publisherRepo.save(publisher3);

    const publisher4: Publisher = publisherRepo.create({
        name: 'Nhà Xuất Bản Trẻ'
    })
    await publisherRepo.save(publisher4);

    const publisher5: Publisher = publisherRepo.create({
        name: 'Nhà xuất bản Kim Đồng'
    })
    await publisherRepo.save(publisher5);

    const publisher6: Publisher = publisherRepo.create({
        name: 'Nhà xuất bản Sự Thật'
    })
    await publisherRepo.save(publisher6);

    const publisher7: Publisher = publisherRepo.create({
        name: 'Nhà xuất bản Giáo Dục'
    })
    await publisherRepo.save(publisher7);

    const publisher8: Publisher = publisherRepo.create({
        name: 'Nhà xuất bản Đại Học Quốc Gia Hồ Chí Minh'
    })
    await publisherRepo.save(publisher8);

    const publisher9: Publisher = publisherRepo.create({
        name: 'Nhà xuất bản tổng hợp Thành Phố Hồ Chí Minh'
    })
    await publisherRepo.save(publisher9);

    const publisher10: Publisher = publisherRepo.create({
        name: 'Nhà xuất bản Chính Trị và Quốc Gia'
    })
    await publisherRepo.save(publisher10);
    console.log('Publisher created');
    //endregion

    //region Transporter
    const transporterRepo = AppDataSource.getRepository(Transporter);

    const transporter1: Transporter = transporterRepo.create({
        name: 'Amazon'
    })
    await transporterRepo.save(transporter1);

    const transporter2: Transporter = transporterRepo.create({
        name: 'FedEx'
    })
    await transporterRepo.save(transporter2);

    const transporter3: Transporter = transporterRepo.create({
        name: 'UPS'
    })
    await transporterRepo.save(transporter3);
    console.log('Transporter created');
    //endregion

    //region Image
    const imageRepo = AppDataSource.getRepository(Image);

    const image1 = imageRepo.create({
        id: "a4392290-15c6-4f15-bd2a-aca9d2b8ef42",
        name: "sample.png",
        path: "a4392290-15c6-4f15-bd2a-aca9d2b8ef42.png",
        height: 100,
        width: 100,
    });
    await imageRepo.save(image1);

    const image2 = imageRepo.create({
        id: "a1f49fb4-6ad8-4e07-99e8-d5d9893a985c",
        name: "sample2.png",
        path: "a1f49fb4-6ad8-4e07-99e8-d5d9893a985c.png",
        height: 100,
        width: 100,
    });
    await imageRepo.save(image2);

    const images = await Promise.all([
        '2930ce29-27c3-4ec7-9dcb-343911559f5a',
        'a163bf15-3ee7-4db7-b9f9-02dee0423f35',
        '6afc5d1e-0383-45aa-a92f-29825a7008ab',
        '64558f9e-2325-4ca4-8307-62158ae8f0f2',
        'bd61dc3b-b2be-46a3-8389-5a051ab737d9',
        '87126613-a7ff-4278-8c06-cd40ace3db5c',
        '3461f81d-24f5-4247-aa3d-6bf348cd2ca3',
        '03f0f504-16cf-4f80-b4bc-ba09d8bcc1d0',
        '7327feb4-108b-4067-85ac-1913c76602ba',
        '299313f9-d6d8-4513-843f-834181771684',
        '025532b0-9d2c-4e1c-90a6-25285ccc73da'
    ].map(id => imageRepo.save(imageRepo.create({
        id: id,
        name: `${id}.png`,
        path: `${id}.png`,
        height: 100,
        width: 100,
    }))));
    //endregion

    const userRepo = AppDataSource.getRepository(User);
    const addressRepo = AppDataSource.getRepository(UserAddress);
    const bankRepo = AppDataSource.getRepository(UserBank);

    //region User
    //region User1
    const user1: User = userRepo.create({
        firstname: 'John',
        lastname: 'Doe',
        username: 'admin',
        password: 'admin',
        role: Role.ADMIN,
        gender: Gender.MALE,
        email: 'abc@gmail.com',
        phone: '0987654321',
        birthday: new Date('1990-01-01'),
    });
    user1.avatar = images[3];
    await userRepo.save(user1);

    const bank1: UserBank = bankRepo.create({
        user_id: user1.id,
        bank_name: 'Bank of America',
        iban: '123456789',
        bic: '123456789'
    });
    await bankRepo.save(bank1);

    const address1: UserAddress = addressRepo.create({
        user_id: user1.id,
        address: '123 Main St',
        city: 'New York',
        district: 'Manhattan',
        ward: '123',
        project: '123',
        street: '123',
        is_primary: true
    });
    await addressRepo.save(address1);

    const address2: UserAddress = addressRepo.create({
        user_id: user1.id,
        address: '13245 Main St',
        city: 'East Laos',
        district: 'Manhattan',
        ward: '123',
        project: '123',
        street: '123',
    });
    await addressRepo.save(address2);
    //endregion

    //region User2
    const user2: User = userRepo.create({
        firstname: 'Jane',
        lastname: 'Doe',
        username: 'user',
        password: 'user',
        role: Role.USER,
        gender: Gender.MALE,
        email: 'abca@gmail.com',
        phone: '0987654321',
        birthday: new Date('1990-01-01'),
    });
    user1.avatar = images[4];
    await userRepo.save(user2);

    const bank2: UserBank = bankRepo.create({
        user_id: user2.id,
        bank_name: 'Bank of America',
        iban: '123456789',
        bic: '123456789'
    });

    const address3: UserAddress = addressRepo.create({
        user_id: user2.id,
        address: '123 Main St',
        city: 'New York',
        district: 'Manhattan',
        ward: '123',
        project: '123',
        street: '123',
    });
    await addressRepo.save(address3);
    //endregion

    //region User3
    const user3: User = userRepo.create({
        firstname: 'Jack',
        lastname: 'Doe',
        username: 'guest',
        password: 'guest',
        role: Role.USER,
        email: 'abc123@gmail.com',
        phone: '0987654321',
        gender: Gender.MALE,
        birthday: new Date('1990-01-01'),
    })
    user1.avatar = images[5];
    await userRepo.save(user3);

    const bank3: UserBank = bankRepo.create({
        user_id: user3.id,
        bank_name: 'Bank of America',
        iban: '123456789',
        bic: '123456789'
    });

    const address4: UserAddress = addressRepo.create({
        user_id: user3.id,
        address: '123 Main St',
        city: 'New York',
        district: 'Manhattan',
        ward: '123',
        project: '123',
        street: '123',
    });
    await addressRepo.save(address4);
    console.log('Users created');
    //endregion
    //endregion

    //region Transport
    const transportRepo = AppDataSource.getRepository(Transport);

    const transport1: Transport = transportRepo.create({
        transporter_id: 1,
        tracking: '123456789'
    })
    await transportRepo.save(transport1);

    const transport2: Transport = transportRepo.create({
        transporter_id: 2,
        tracking: '123456789'
    })
    await transportRepo.save(transport2);

    const transport3: Transport = transportRepo.create({
        transporter_id: 3,
        tracking: '123456789'
    })
    await transportRepo.save(transport3);

    const transport4: Transport = transportRepo.create({
        transporter_id: 2,
        tracking: '123456789'
    })
    await transportRepo.save(transport4);

    const transport5: Transport = transportRepo.create({
        transporter_id: 2,
        tracking: '123456789'
    })
    await transportRepo.save(transport5);

    const transport6: Transport = transportRepo.create({
        transporter_id: 2,
        tracking: '123456789'
    })
    await transportRepo.save(transport6);

    const transport7: Transport = transportRepo.create({
        transporter_id: 2,
        tracking: '123456789'
    })
    await transportRepo.save(transport7);
    console.log('Transports created');
    //endregion

    //region Book
    const bookRepo = AppDataSource.getRepository(Book);

    const book1: Book = bookRepo.create({
        title: 'Đắc nhân tâm',
        author_id: 1,
        publisher_id: 1,
        isbn: '123456789',
        price: 250000,
        stock: 10,
        description: 'Đắc nhân tâm, tên tiếng Anh là How to Win Friends and Influence People là một quyển sách nhằm tự giúp bản thân bán chạy nhất từ trước đến nay. Quyển sách này do Dale Carnegie viết và đã được xuất bản lần đầu vào năm 1936, nó đã được bán 15 triệu bản trên khắp thế giới',
        tags: [BookTag.SelfHelp]
    })
    book1.images = [image1];
    await bookRepo.save(book1);

    const book2: Book = bookRepo.create({
        title: 'Doraemon tập 3',
        author_id: 1,
        publisher_id: 1,
        isbn: '123456789',
        description: 'Doraemon là nhân vật chính hư cấu trong loạt Manga cùng tên của họa sĩ Fujiko F. Fujio. Trong truyện lấy bối cảnh ở thế kỷ 22, Doraemon là chú mèo robot của tương lai do xưởng Matsushiba — công xưởng chuyên sản xuất robot vốn dĩ nhằm mục đích chăm sóc trẻ nhỏ',
        price: 15000,
        stock: 10,
        tags: [BookTag.Art, BookTag.Comedy, BookTag.Fantasy]
    })
    book2.images = [image2];
    await bookRepo.save(book2);

    const book5: Book = bookRepo.create({
        title: 'Mắt Biếc',
        author_id: author4.id,
        publisher_id: publisher4.id,
        isbn: '123456789',
        description: '"Mắt Biếc" là câu chuyện kể về cuộc đời của nhân vật Ngạn. Sinh ra và lớn lên ở một ngôi làn tên Đo Đo (cũng là nguyên quán của Nguyễn Nhật Ánh - tác giả), Ngạn thầm yêu từ nhỏ cô nàng cùng xóm có đôi mắt tuyệt đẹp - Hà Lan. Tuổi thơ ở nơi làng xóm bình yên giản dị thật là đẹp, nhưng rồi cũng đến lúc kết thúc khi cả hai đều phải lên thành phố tiếp tục việc học, và tấm bi kịch bắt đầu từ đây.',
        price: 90000,
        stock: 20,
        tags: [BookTag.Art, BookTag.Drama, BookTag.Romance, BookTag.Literature]
    })
    book5.images = [images[0]];
    await bookRepo.save(book5);

    const book6: Book = bookRepo.create({
        title: 'Hai đứa trẻ',
        author_id: author5.id,
        publisher_id: publisher7.id,
        isbn: '123456789',
        description: 'Cuốn sách tập hợp những truyện ngắn đặc sắc của nhà văn Thạch Lam: Nắng trong vườn, Gió lạnh đầu mùa, Tiếng chim kêu, Đứa con đầu lòng, Bắt đầu, Nhà mẹ Lê, Một cơn giận, Hai đứa trẻ, Đứa con, Trong bóng tối buổi chiều, Cuốn sách bỏ quên, Dưới bóng hoàng lan,...',
        price: 80000,
        stock: 14,
        tags: [BookTag.Art, BookTag.Literature]
    })
    book6.images = [images[1]];
    await bookRepo.save(book6);

    const book7: Book = bookRepo.create({
        title: 'Tắt đèn',
        author_id: author6.id,
        publisher_id: publisher7.id,
        isbn: '123456789',
        description: 'Tắt đèn là một trong những tác phẩm văn học tiêu biểu nhất của nhà văn Ngô Tất Tố. Đây là một tác phẩm văn học hiện thực phê phán với nội dung nói về cuộc sống khốn khổ của tầng lớp nông dân Việt Nam đầu thế kỉ XX dưới ách đô hộ của thực dân Pháp.',
        price: 120000,
        stock: 14,
        tags: [BookTag.Art, BookTag.Literature]
    })
    book7.images = [images[2]];
    await bookRepo.save(book7);

    const book8: Book = bookRepo.create({
        title: 'Làm Đĩ',
        author_id: author9.id,
        publisher_id: publisher5.id,
        isbn: '123456789',
        description: 'Làm đĩ là một cuốn tiểu thuyết của nhà văn Việt Nam Vũ Trọng Phụng, tác phẩm được viết vào năm 1936 và xuất bản vào năm 1937. Đây được coi là cuốn tiểu thuyết đầu tiên của Việt Nam đề cập đến vấn đề mại dâm.',
        price: 100000,
        stock: 14,
        tags: [BookTag.Art, BookTag.Literature]
    })
    book8.images = [images[3]];
    await bookRepo.save(book8);

    const book9: Book = bookRepo.create({
        title: 'Nhật kí trong tù',
        author_id: author7.id,
        publisher_id: publisher7.id,
        description: 'Nhật ký trong tù là tập thơ chữ Hán gồm 134 bài theo thể Đường luật do Hồ Chí Minh sáng tác trong thời gian bị chính quyền Tưởng Giới Thạch bắt giam ở Quảng Tây, Trung Quốc, từ ngày 29 tháng 8 năm 1942 đến ngày 10 tháng 9 năm 1943.',
        isbn: '123456789',
        price: 1000000,
        stock: 10,
        tags: [BookTag.History, BookTag.Literature]
    })
    book9.images = [images[4]];
    await bookRepo.save(book9);

    const book10: Book = bookRepo.create({
        title: 'Xuân Diệu tác phẩm chọn lọc',
        author_id: author10.id,
        publisher_id: publisher7.id,
        isbn: '123456789',
        description: 'Xuân Diệu họ Ngô, tên đầy đủ Ngô Xuân Diệu. Nhà thơ Việt Nam nổi tiếng còn có bút danh là Trảo Nha. Với lòng say mê nghề nghiệp, niềm khát khao cống hiến cho cuộc đời. Xuân Diệu đã để lại một sự nghiệp đồ sộ gồm nhiều lĩnh vực trong hơn nửa thế kỉ sáng tạo như;Thơ ca, Dịch thơ, Truyện ngắn, bút lý, tiểu luận, phê bình...',
        price: 100000,
        stock: 10,
        tags: [BookTag.Poetry, BookTag.Literature]
    })
    book10.images = [images[5]];
    await bookRepo.save(book10);

    const book11: Book = bookRepo.create({
        title: 'Doraemon tập đặc biệt 1',
        author_id: author11.id,
        publisher_id: publisher5.id,
        isbn: '123456789',
        description: 'Doraemon là nhân vật chính hư cấu trong loạt Manga cùng tên của họa sĩ Fujiko F. Fujio. Trong truyện lấy bối cảnh ở thế kỷ 22, Doraemon là chú mèo robot của tương lai do xưởng Matsushiba — công xưởng chuyên sản xuất robot vốn dĩ nhằm mục đích chăm sóc trẻ nhỏ',
        price: 25000,
        stock: 10,
        tags: [BookTag.Comedy, BookTag.Humor]
    })
    book11.images = [images[6]];
    await bookRepo.save(book11);

    const book12: Book = bookRepo.create({
        title: 'Doraemon tập 30',
        author_id: author11.id,
        publisher_id: publisher5.id,
        isbn: '123456789',
        description: 'Doraemon là nhân vật chính hư cấu trong loạt Manga cùng tên của họa sĩ Fujiko F. Fujio. Trong truyện lấy bối cảnh ở thế kỷ 22, Doraemon là chú mèo robot của tương lai do xưởng Matsushiba — công xưởng chuyên sản xuất robot vốn dĩ nhằm mục đích chăm sóc trẻ nhỏ',
        price: 25000,
        stock: 10,
        tags: [BookTag.Comedy, BookTag.Humor]
    })
    book12.images = [images[7]];
    await bookRepo.save(book12);

    const book13: Book = bookRepo.create({
        title: 'Tuyển thơ',
        author_id: author8.id,
        publisher_id: publisher7.id,
        isbn: '123456789',
        description: 'Cuốn TUYỂN THƠ này sẽ đem đến bạn đọc một tuyển thơ Trần Đăng Khoa đầy đủ. Chọn trong các tập thơ đã được trao Giải thưởng Nhà nước của ông, chọn lọc những sáng tác của ông từ tuổi ấu thơ cho đến những năm gần đây. Cũng là dịp để bạn đọc có một cái nhìn tương đối tổng thể, khoa học, khách quan về một mảng sáng tác của Trần Đăng Khoa.',
        price: 100000,
        stock: 20,
        tags: [BookTag.Poetry, BookTag.Literature]
    })
    book13.images = [images[8]];
    await bookRepo.save(book13);

    const book14: Book = bookRepo.create({
        title: 'Đảo mộng mơ',
        author_id: author4.id,
        publisher_id: publisher4.id,
        isbn: '123456789',
        description: 'Đảo Mộng mơ là một lát cắt đời sống của những đứa trẻ lên 10 giàu trí tưởng tượng như tất cả mọi đứa trẻ. Chúng mơ mộng, tưởng tượng, và tự làm "hiện thực hóa" những khao khát của mình.',
        price: 65000,
        stock: 20,
        tags: [BookTag.Poetry, BookTag.Literature]
    })
    book14.images = [images[9]];
    await bookRepo.save(book14);

    const book15: Book = bookRepo.create({
        title: 'Trại hoa vàng',
        author_id: author4.id,
        publisher_id: publisher4.id,
        isbn: '123456789',
        description: 'Trại hoa vàng là một truyện dài của nhà văn Nguyễn Nhật Ánh, được xuất bản năm 1994. Với chủ đề tình yêu tuổi ô mai, với giọng văn hóm hỉnh, hài hước, kể về những việc làm, lời nói ngây ngô của tuổi học trò nhưng cũng đầy ý nghĩa, nói lên thứ tình cảm trong sáng có thể khiến người ta thay đổi bản thân mình, đó là tình yêu.',
        price: 72000,
        stock: 22,
        tags: [BookTag.Poetry, BookTag.Literature]
    })
    book15.images = [images[10]];
    await bookRepo.save(book15);

    console.log('Books created');


    //endregion

    //region CartItem
    const cartItemRepo = AppDataSource.getRepository(CartItem);
    const cartItem1 = cartItemRepo.create({
        user_id: user1.id,
        book_id: book1.id,
        quantity: 1
    });
    await cartItemRepo.save(cartItem1);

    const cartItem2 = cartItemRepo.create({
        user_id: user1.id,
        book_id: book2.id,
        quantity: 1
    });
    await cartItemRepo.save(cartItem2);

    const cartItem3 = cartItemRepo.create({
        user_id: user2.id,
        book_id: book5.id,
        quantity: 1
    });
    await cartItemRepo.save(cartItem3);
    //endregion

    //region VoucherProfile
    const voucherProfileRepo = AppDataSource.getRepository(VoucherProfile);
    const voucherProfile1 = voucherProfileRepo.create({
        name: 'Voucher 1',
        description: 'Voucher 1',
        discount: 10,
        discount_type: DiscountType.PERCENTAGE,
        require_book_tags: [BookTag.Autobiography, BookTag.Art]
    });
    await voucherProfileRepo.save(voucherProfile1);

    const voucherProfile2 = voucherProfileRepo.create({
        name: 'Voucher 2',
        description: 'Voucher 2',
        discount: 20,
        discount_type: DiscountType.PERCENTAGE,
        require_book_tags: [BookTag.Art]
    });
    await voucherProfileRepo.save(voucherProfile2);
    //endregion

    //region Voucher
    const voucherRepo = AppDataSource.getRepository(Voucher);
    const voucher1 = voucherRepo.create({
        code: 'VOUCHER1',
        release_date: new Date(),
        expire_date: new Date(),
        profile_id: voucherProfile1.id,
        user_id: user1.id
    });
    await voucherRepo.save(voucher1);

    const voucher2 = voucherRepo.create({
        code: 'VOUCHER2',
        release_date: new Date(),
        expire_date: new Date(),
        profile_id: voucherProfile2.id,
        user_id: user1.id
    });
    await voucherRepo.save(voucher2);
    //endregion

    //region Bill
    const billRepo = AppDataSource.getRepository(Bill);
    const billDetail = AppDataSource.getRepository(BillDetail);

    const bill1: Bill = billRepo.create({
        user_id: user1.id,
        status: BillStatus.WAITING,
        transport_id: transport1.id,
        address_id: address1.sub_id,
        used_vouchers: [voucherProfile1],
        payment: Payment.BANK_TRANSFER
    });

    const billDetail1: BillDetail = billDetail.create({
        bill_id: bill1.id,
        book_id: book1.id,
        quantity: 1,
        unit_price: book1.price
    });

    const billDetail2: BillDetail = billDetail.create({
        bill_id: bill1.id,
        book_id: book2.id,
        quantity: 1,
        unit_price: book2.price
    });

    bill1.bill_details = [];
    bill1.bill_details.push(billDetail1, billDetail2);

    await billRepo.save(bill1);

    const bill2: Bill = billRepo.create({
        user_id: user2.id,
        status: BillStatus.WAITING,
        transport_id: transport2.id,
        address_id: address2.sub_id,
        payment: Payment.CASH,
        used_vouchers: [voucherProfile1]
    });

    const billDetail3: BillDetail = billDetail.create({
        bill_id: bill2.id,
        book_id: book5.id,
        quantity: 1,
        unit_price: book5.price
    });

    const billDetail4: BillDetail = billDetail.create({
        bill_id: bill2.id,
        book_id: book2.id,
        quantity: 1,
        unit_price: book2.price
    });
    bill2.bill_details = [];
    bill2.bill_details.push(billDetail3, billDetail4);
    await billRepo.save(bill2);

    const bill3: Bill = billRepo.create({
        user_id: user1.id,
        status: BillStatus.CANCELED,
        transport_id: transport3.id,
        address_id: address1.sub_id,
        payment: Payment.CASH,
    });

    const billDetail5: BillDetail = billDetail.create({
        bill_id: bill3.id,
        book_id: book5.id,
        quantity: 1,
        unit_price: book5.price
    });

    const billDetail6: BillDetail = billDetail.create({
        bill_id: bill3.id,
        book_id: book6.id,
        quantity: 1,
        unit_price: book6.price
    });
    bill3.bill_details = [];
    bill3.bill_details.push(billDetail5, billDetail6);
    await billRepo.save(bill3);

    const bill4: Bill = billRepo.create({
        user_id: user1.id,
        status: BillStatus.COMPLETED,
        transport_id: transport4.id,
        address_id: address1.sub_id,
        payment: Payment.CASH,
    });

    const billDetail7: BillDetail = billDetail.create({
        bill_id: bill4.id,
        book_id: book7.id,
        quantity: 1,
        unit_price: book7.price
    });

    const billDetail8: BillDetail = billDetail.create({
        bill_id: bill4.id,
        book_id: book8.id,
        quantity: 1,
        unit_price: book8.price
    });

    bill4.bill_details = [];
    bill4.bill_details.push(billDetail7, billDetail8);
    await billRepo.save(bill4);

    const bill5: Bill = billRepo.create({
        user_id: user1.id,
        status: BillStatus.PROCESSING,
        transport_id: transport5.id,
        address_id: address1.sub_id,
        payment: Payment.CASH,
    });

    const billDetail9: BillDetail = billDetail.create({
        bill_id: bill5.id,
        book_id: book9.id,
        quantity: 1,
        unit_price: book9.price
    });

    const billDetail10: BillDetail = billDetail.create({
        bill_id: bill5.id,
        book_id: book10.id,
        quantity: 1,
        unit_price: book10.price
    });

    bill5.bill_details = [];
    bill5.bill_details.push(billDetail9, billDetail10);
    await billRepo.save(bill5);

    const bill6: Bill = billRepo.create({
        user_id: user1.id,
        status: BillStatus.TRANSPORTING,
        transport_id: transport6.id,
        address_id: address1.sub_id,
        payment: Payment.CASH,
    });

    const billDetail11: BillDetail = billDetail.create({
        bill_id: bill6.id,
        book_id: book11.id,
        quantity: 1,
        unit_price: book11.price
    });

    const billDetail12: BillDetail = billDetail.create({
        bill_id: bill6.id,
        book_id: book12.id,
        quantity: 1,
        unit_price: book12.price
    });

    bill6.bill_details = [];
    bill6.bill_details.push(billDetail11, billDetail12);
    await billRepo.save(bill6);
    console.log('Bills created');
    //endregion

    //region Lend
    const lendRepo = AppDataSource.getRepository(Lend);
    const lend1 = lendRepo.create({
        user_id: user1.id,
        book_id: book1.id,
        unit_price: book1.price,
        start_date: new Date(),
        end_date: new Date(),
    });
    await lendRepo.save(lend1);

    const lend2 = lendRepo.create({
        user_id: user1.id,
        book_id: book2.id,
        unit_price: book2.price,
        start_date: new Date(),
        end_date: new Date(),
    });
    await lendRepo.save(lend2);
    //endregion

    //region FavouriteBook
    const favouriteBooKRepo = AppDataSource.getRepository(FavouriteBook);
    const favouriteBook1 = favouriteBooKRepo.create({
        user_id: user1.id,
        book_id: book1.id
    });
    await favouriteBooKRepo.save(favouriteBook1);

    const favouriteBook2 = favouriteBooKRepo.create({
        user_id: user1.id,
        book_id: book2.id
    });
    await favouriteBooKRepo.save(favouriteBook2);
    //endregion

    //region Feedback
    const feedbackRepo = AppDataSource.getRepository(Feedback);
    const feedback1 = feedbackRepo.create({
        user_id: user1.id,
        book_id: book1.id,
        text: 'Đây là feedback của user 1 về sách 1',
        images: [images[0]],
        rating: 3.5
    });

    await feedbackRepo.save(feedback1);

    const replyRepo = AppDataSource.getRepository(ReplyFeedback);
    const reply1 = replyRepo.create({
        feedback_id: feedback1.id,
        user_id: user2.id,
        text: 'Đây là reply của user 2 về feedback của user 1'
    });

    await replyRepo.save(reply1);
    //endregion
}

export async function InitSamples() {
    console.log('Initializing database...');
    if (!init) {
        console.log('Database already initialized.');
        return;
    }
    console.log('Sample initializing...');

    await InitCommon();

    console.log('Samples initialized');
}
