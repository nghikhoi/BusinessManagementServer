const Action = {
  GET_USER: 'GET_USER',
  GET_USERS: 'GET_USERS',
  CREATE_USER: 'CREATE_USER',
  UPDATE_USER: 'UPDATE_USER',
  UPDATE_USER_SELF: 'UPDATE_USER_SELF',
  DELETE_USER: 'DELETE_USER',

  GET_AUTHOR: 'GET_AUTHOR',
  GET_AUTHORS: 'GET_AUTHORS',
  CREATE_AUTHOR: 'CREATE_AUTHOR',
  UPDATE_AUTHOR: 'UPDATE_AUTHOR',
  DELETE_AUTHOR: 'DELETE_AUTHOR',

  GET_VOUCHER_PROFILE: 'GET_VOUCHER_PROFILE',
  GET_VOUCHER_PROFILES: 'GET_VOUCHER_PROFILES',
  CREATE_VOUCHER_PROFILE: 'CREATE_VOUCHER_PROFILE',
  UPDATE_VOUCHER_PROFILE: 'UPDATE_VOUCHER_PROFILE',
  DELETE_VOUCHER_PROFILE: 'DELETE_VOUCHER_PROFILE',

  GET_BOOK_PROFILE: 'GET_BOOK_PROFILE',
  GET_BOOK_PROFILES: 'GET_BOOK_PROFILES',
  CREATE_BOOK_PROFILE: 'CREATE_BOOK_PROFILE',
  UPDATE_BOOK_PROFILE: 'UPDATE_BOOK_PROFILE',
  DELETE_BOOK_PROFILE: 'DELETE_BOOK_PROFILE',

  GET_BOOK_PROFILE_IMAGE: 'GET_BOOK_PROFILE_IMAGE',
  GET_BOOK_PROFILE_IMAGES: 'GET_BOOK_PROFILE_IMAGES',
  CREATE_BOOK_PROFILE_IMAGE: 'CREATE_BOOK_PROFILE_IMAGE',
  UPDATE_BOOK_PROFILE_IMAGE: 'UPDATE_BOOK_PROFILE_IMAGE',
  DELETE_BOOK_PROFILE_IMAGE: 'DELETE_BOOK_PROFILE_IMAGE',

  GET_TRANSPORT: 'GET_TRANSPORT',
  GET_TRANSPORTS: 'GET_TRANSPORTS',
  CREATE_TRANSPORT: 'CREATE_TRANSPORT',
  UPDATE_TRANSPORT: 'UPDATE_TRANSPORT',
  DELETE_TRANSPORT: 'DELETE_TRANSPORT',

  GET_PUBLISHER: 'GET_PUBLISHER',
  GET_PUBLISHERS: 'GET_PUBLISHERS',
  CREATE_PUBLISHER: 'CREATE_PUBLISHER',
  UPDATE_PUBLISHER: 'UPDATE_PUBLISHER',
  DELETE_PUBLISHER: 'DELETE_PUBLISHER',

  GET_TRANSPORTER: 'GET_TRANSPORTER',
  GET_TRANSPORTERS: 'GET_TRANSPORTERS',
  CREATE_TRANSPORTER: 'CREATE_TRANSPORTER',
  UPDATE_TRANSPORTER: 'UPDATE_TRANSPORTER',
  DELETE_TRANSPORTER: 'DELETE_TRANSPORTER',

  GET_CART_ITEM: 'GET_CART_ITEM',
  GET_CART_ITEMS: 'GET_CART_ITEMS',
  CREATE_CART_ITEM: 'CREATE_CART_ITEM',
  UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
  DELETE_CART_ITEM: 'DELETE_CART_ITEM',

  GET_BOOK: 'GET_BOOK',
  GET_BOOKS: 'GET_BOOKS',
  CREATE_BOOK: 'CREATE_BOOK',
  UPDATE_BOOK: 'UPDATE_BOOK',
  DELETE_BOOK: 'DELETE_BOOK',

  GET_BILL: 'GET_BILL',
  GET_BILLS: 'GET_BILLS',
  CREATE_BILL: 'CREATE_BILL',
  UPDATE_BILL: 'UPDATE_BILL',
  DELETE_BILL: 'DELETE_BILL',

  GET_BILL_DETAIL: 'GET_BILL_DETAIL',
  GET_BILL_DETAILS: 'GET_BILL_DETAILS',
  CREATE_BILL_DETAIL: 'CREATE_BILL_DETAIL',
  UPDATE_BILL_DETAIL: 'UPDATE_BILL_DETAIL',
  DELETE_BILL_DETAIL: 'DELETE_BILL_DETAIL',

  GET_LEND: 'GET_LEND',
  GET_LENDS: 'GET_LENDS',
  CREATE_LEND: 'CREATE_LEND',
  UPDATE_LEND: 'UPDATE_LEND',
  DELETE_LEND: 'DELETE_LEND',

  GET_VOUCHER: 'GET_VOUCHER',
  GET_VOUCHERS: 'GET_VOUCHERS',
  CREATE_VOUCHER: 'CREATE_VOUCHER',
  UPDATE_VOUCHER: 'UPDATE_VOUCHER',
  DELETE_VOUCHER: 'DELETE_VOUCHER',

  GET_WILD_VOUCHER: 'GET_WILD_VOUCHER',
  GET_WILD_VOUCHERS: 'GET_WILD_VOUCHERS',
  CREATE_WILD_VOUCHER: 'CREATE_WILD_VOUCHER',
  UPDATE_WILD_VOUCHER: 'UPDATE_WILD_VOUCHER',
  DELETE_WILD_VOUCHER: 'DELETE_WILD_VOUCHER',
};

const Role = {
	ADMIN: 'ADMIN',
	USER: 'USER'
}

const PermissionMap = {
  GET_USER: [ Role.ADMIN ],
  GET_USER_SELF: [ Role.ADMIN, Role.USER ],
  GET_USERS: [ Role.ADMIN ],
  CREATE_USER: [ Role.ADMIN ],
  UPDATE_USER: [ Role.ADMIN ],
  UPDATE_USER_SELF: [ Role.ADMIN, Role.USER ],
  DELETE_USER: [ Role.ADMIN ],

  GET_USERADDRESS: [ Role.ADMIN ],
  GET_USERADDRESS_SELF: [ Role.ADMIN, Role.USERADDRESS ],
  GET_USERADDRESSES: [ Role.ADMIN ],
  CREATE_USERADDRESS: [ Role.ADMIN ],
  UPDATE_USERADDRESS: [ Role.ADMIN ],
  UPDATE_USERADDRESS_SELF: [ Role.ADMIN, Role.USERADDRESS ],
  DELETE_USERADDRESS: [ Role.ADMIN ],


  GET_AUTHOR: [ Role.ADMIN, Role.USER ],
  GET_AUTHORS: [ Role.ADMIN, Role.USER ],
  CREATE_AUTHOR: [ Role.ADMIN ],
  UPDATE_AUTHOR: [ Role.ADMIN ],
  DELETE_AUTHOR: [ Role.ADMIN ],

  GET_VOUCHER_PROFILE: [ Role.ADMIN, Role.USER ],
  GET_VOUCHER_PROFILES: [ Role.ADMIN, Role.USER ],
  CREATE_VOUCHER_PROFILE: [ Role.ADMIN ],
  UPDATE_VOUCHER_PROFILE: [ Role.ADMIN ],
  DELETE_VOUCHER_PROFILE: [ Role.ADMIN ],

  GET_BOOK_PROFILE: [ Role.ADMIN, Role.USER ],
  GET_BOOK_PROFILES: [ Role.ADMIN, Role.USER ],
  CREATE_BOOK_PROFILE: [ Role.ADMIN ],
  UPDATE_BOOK_PROFILE: [ Role.ADMIN ],
  DELETE_BOOK_PROFILE: [ Role.ADMIN ],

  GET_BOOK_PROFILE_IMAGE: [ Role.ADMIN, Role.USER ],
  GET_BOOK_PROFILE_IMAGES: [ Role.ADMIN, Role.USER ],
  CREATE_BOOK_PROFILE_IMAGE: [ Role.ADMIN ],
  UPDATE_BOOK_PROFILE_IMAGE: [ Role.ADMIN ],
  DELETE_BOOK_PROFILE_IMAGE: [ Role.ADMIN ],

  GET_TRANSPORT: [ Role.ADMIN, Role.USER ],
  GET_TRANSPORTS: [ Role.ADMIN, Role.USER ],
  CREATE_TRANSPORT: [ Role.ADMIN ],
  UPDATE_TRANSPORT: [ Role.ADMIN ],
  DELETE_TRANSPORT: [ Role.ADMIN ],

  GET_PUBLISHER: [ Role.ADMIN, Role.USER ],
  GET_PUBLISHERS: [ Role.ADMIN, Role.USER ],
  CREATE_PUBLISHER: [ Role.ADMIN ],
  UPDATE_PUBLISHER: [ Role.ADMIN ],
  DELETE_PUBLISHER: [ Role.ADMIN ],

  GET_TRANSPORTER: [ Role.ADMIN ],
  GET_TRANSPORTERS: [ Role.ADMIN ],
  CREATE_TRANSPORTER: [ Role.ADMIN ],
  UPDATE_TRANSPORTER: [ Role.ADMIN ],
  DELETE_TRANSPORTER: [ Role.ADMIN ],

  GET_CART_ITEM: [ Role.USER ],
  GET_CART_ITEMS: [ Role.USER ],
  CREATE_CART_ITEM: [ Role.USER ],
  UPDATE_CART_ITEM: [ Role.USER ],
  DELETE_CART_ITEM: [ Role.USER ],


  GET_BOOK: [ Role.ADMIN, Role.USER ],
  GET_BOOKS: [ Role.ADMIN, Role.USER ],
  CREATE_BOOK: [ Role.ADMIN ],
  UPDATE_BOOK: [ Role.ADMIN ],
  DELETE_BOOK: [ Role.ADMIN ],

  GET_BILL: [ Role.ADMIN, Role.USER ],
  GET_BILLS: [ Role.ADMIN, Role.USER ],
  CREATE_BILL: [ Role.ADMIN ],
  UPDATE_BILL: [ Role.ADMIN ],
  DELETE_BILL: [ Role.ADMIN ],

  GET_BILL_DETAIL: [ Role.ADMIN, Role.USER ],
  GET_BILL_DETAILS: [ Role.ADMIN, Role.USER ],
  CREATE_BILL_DETAIL: [ Role.ADMIN ],
  UPDATE_BILL_DETAIL: [ Role.ADMIN ],
  DELETE_BILL_DETAIL: [ Role.ADMIN ],

  GET_LEND: [ Role.ADMIN, Role.USER ],
  GET_LENDS: [ Role.ADMIN, Role.USER ],
  CREATE_LEND: [ Role.ADMIN ],
  UPDATE_LEND: [ Role.ADMIN ],
  DELETE_LEND: [ Role.ADMIN ],

  GET_VOUCHER: [ Role.ADMIN, Role.USER ],
  GET_VOUCHERS: [ Role.ADMIN, Role.USER ],
  CREATE_VOUCHER: [ Role.ADMIN ],
  UPDATE_VOUCHER: [ Role.ADMIN ],
  DELETE_VOUCHER: [ Role.ADMIN ],

  GET_WILD_VOUCHER: [ Role.ADMIN, Role.USER ],
  GET_WILD_VOUCHERS: [ Role.ADMIN, Role.USER ],
  CREATE_WILD_VOUCHER: [ Role.ADMIN ],
  UPDATE_WILD_VOUCHER: [ Role.ADMIN ],
  DELETE_WILD_VOUCHER: [ Role.ADMIN ],
}

const hasPermission = (permissions, role) => {
  permissions = typeof permissions === 'string' ? [ permissions ] : permissions
  return permissions.every(permission => PermissionMap[permission].includes(role.toUpperCase()));
}

module.exports = { Action, Role, hasPermission }
