import { Gender, Role, Status } from '@prisma/client'
import * as Yup from 'yup'

export const AllowedProductFilters = [
    'available', 'avgRating', 'cateIds', 'colors', 'createdDate', 'creatorId', 'description',
    'description', 'id', 'name', 'price', 'totalRating', 'updatedAt'
]

export const isUUID = Yup.string().uuid()

export const ProductSearchSchemaValidate = {
    limit: Yup.number().integer().moreThan(-1),
    skip: Yup.number().integer().moreThan(-1),
    rating: Yup.number().integer().moreThan(-1).max(5),
    fromPrice: Yup.number().integer().moreThan(-1),
    toPrice: Yup.number().integer().moreThan(-1),
    available: Yup.boolean(),
    cateId: Yup.array().of(Yup.number().moreThan(-1).required()),
    colorHex: Yup.array().of(Yup.string().max(7).required()),
    roomId: Yup.array().of(Yup.number().moreThan(-1).required()),
    createdDate: Yup.date(),
    name: Yup.string().max(50),
    creatorName: Yup.string(),
    isFeatureProduct: Yup.boolean(),
    filter: Yup.string().oneOf(AllowedProductFilters),
    sort: Yup.string().lowercase().oneOf(['asc', 'desc'])
}

export const CreateFilterSchemaValidate = {
    id: Yup.number().min(1),
    label: Yup.string().required().max(20),
}

export const CreateColorSchemaValidate = {
    id: Yup.string().max(7).required(),
    label: Yup.string(),
}

export const ProductUpdateSchemaValidate = {
    name: Yup.string().max(20),
    description: Yup.string().min(1),
    price: Yup.number().integer().min(0),
    available: Yup.number().integer().min(0),
    isFeatureProduct: Yup.boolean(),
    colors: Yup.array().of(Yup.string().max(7).required()),
    cateIds: Yup.array().of(Yup.number().integer().moreThan(-1).required()),
    roomIds: Yup.array().of(Yup.number().integer().moreThan(-1).required()),
    imageIds: Yup.array().of(Yup.number().integer().moreThan(-1).required()),

    creatorId: Yup.string().uuid(),
    avgRating: Yup.number().integer().min(0).max(5),
}

export const ProductCreateSchemaValidate = {
    name: ProductUpdateSchemaValidate.name.required(),
    description: ProductUpdateSchemaValidate.description.required(),
    price: ProductUpdateSchemaValidate.price.required(),
    available: ProductUpdateSchemaValidate.available.required(),
    creatorId: ProductUpdateSchemaValidate.creatorId.required(),
    colors: ProductUpdateSchemaValidate.colors.required('Color must be array type'),
    roomIds: ProductUpdateSchemaValidate.roomIds.required(),
    cateIds: ProductUpdateSchemaValidate.cateIds.required(),
    // imageIds: ProductUpdateSchemaValidate.imageIds.required(),
    isFeatureProduct: Yup.boolean(),
}

export const UserEditSchemaValidate = {
    name: Yup.string().lowercase().max(20),
    nickName: Yup.string().lowercase().max(20),
    address: Yup.string().lowercase().max(255),
    email: Yup.string().email().typeError("Invalid email"),
    gender: Yup.string().oneOf(Object.values(Gender), "Invalid gender"),
    phoneNumber: Yup.string().required("Phone number required"),
    birthDay: Yup.date().max(new Date()).typeError("Invalid date"),
    role: Yup.string().oneOf(Object.values(Role)),
    userVerified: Yup.boolean(),
    emailVerified: Yup.boolean(),
    deleted: Yup.boolean(),
}

export const UserCreateSchemaValidate = {
    ...UserEditSchemaValidate,
    loginId: Yup.string().max(20).required("Login ID field missing"),
    password: Yup.string().max(20, 'Must lesser than 20 characters').required('Password field missing'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords dont match').required('Password field missing'),
}

export const LoginSchemaValidate = {
    loginId: UserCreateSchemaValidate.loginId,
    password: UserCreateSchemaValidate.password,
    confirmPassword: UserCreateSchemaValidate.confirmPassword,
}

export const CreateProductReviewSchemaValidate = {
    productId: Yup.string().uuid("Invalid productId").required(),
    content: Yup.string().max(255).required(),
    rating: Yup.number().integer().min(0).max(5).required(),
}

export const UpdateProductReviewSchemaValidate = {
    id: Yup.string().uuid("Invalid reviewId").required(),
    content: Yup.string().max(255),
    rating: Yup.number().integer().min(0).max(5),
    isPending: Yup.boolean()
}

export const ShoppingCartCreateSchemaValidate = {
    productId: Yup.string().uuid().required(),
    color: Yup.string().max(7, "Color must be hex type").required(),
    quantities: Yup.number().moreThan(0).required()
}

export const NewOrderSchemaValidate = {
    userId: Yup.string().uuid().required(),
    billingAddress: Yup.string().max(255).required(),
    shippingAddress: Yup.string().max(255).required(),
    products: Yup.array().of(Yup.object(ShoppingCartCreateSchemaValidate).required()).required(),
}

export const AddProductToNewOrderSchemaValidate = {
    productId: Yup.string().uuid().required(),
    color: Yup.string().max(7, "Color must be hex type").required(),
    quantities: Yup.number().moreThan(0).required(),
    name: Yup.string().required(),
    salePrice: Yup.number().integer().min(0).required(),
}

export const EditOrderSchemaValidate = {
    ...NewOrderSchemaValidate,
    status: Yup.string().oneOf(Object.values(Status))
}

export const UpdateOrderSchemaValidate = {
    shippingFee: Yup.number().integer().min(0),
    subTotal: Yup.number().integer().min(0),
    total: Yup.number().integer().min(0),
    status: Yup.string().oneOf(Object.values(Status))
}