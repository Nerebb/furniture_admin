import { MediaGallery, Order, OrderItem, Prisma, Product, ProductReview, Status, User } from "@prisma/client";
import { GetListParams, GetListResult } from "react-admin";

export interface AnyObject { [key: string]: any }

export enum ApiMethod {
    POST = "POST",
    GET = 'GET',
    PUT = 'PUT',
    DELETE = "DELETE",
}

export interface JsonColor { id: string, quantities: number }

export type ProductSearch = {
    limit?: number,
    skip?: number,
    rating?: number,
    fromPrice?: number,
    toPrice?: number,
    available?: boolean,
    name?: string,
    cateId?: number[],
    colorHex?: string[],
    roomId?: number[],
    createdDate?: Date,
    creatorName?: string,
    isFeatureProduct?: boolean,
    filter?: string //"available" | "name" | "createdDate" | "id" | "imageUrl" | "updatedAt" | "cateIds" | "roomIds" | "description" | "price" | "creatorId" | "avgRating" | "totalSale" | "totalRating" | "totalComments" | "colors"
    sort?: string //'asc' | 'desc'
}

export type FilterSearch = {
    id?: string | number[]
    filter?: string //'id' | "label" | "hex"
    sort?: string //"asc" "desc"
    limit?: number
    skip?: number
}

export type UserSearch = Partial<User>
    & {
        filter?: string //'id' | "label" | "hex"
        sort?: string //"asc" "desc"
        limit?: number
        skip?: number
    }

export type ReviewSearch = {
    id?: string,
    ownerId?: string,
    productId?: string,
    likedUsers?: string[],
    totalLike?: number,
    content?: string,
    rating?: number,
    createdDate?: Date,
    updatedAt?: Date,
    limit?: number,
    skip?: number,
    filter?: string //keyof Omit<ProductReview, ''>,
    sort?: string // 'asc' | 'desc'
    isPending?: boolean
}

export type ResponseReview = ProductReview & {
    name: string,
    nickName?: string,
    userCreatedDate: Date,
    isLiked: boolean,
}

export type NewOrderItem = {
    productId: string,
    color: string,
    quantities: number,
    name: string
    salePrice: number
}

export type NewOrder = {
    billingAddress: string;
    shippingAddress: string;
    shippingFee?: number;
    products: NewOrderItem[]
}

export type OrderedItem = {
    id: string
    name: string
    salePrice: number
    quantities: number
    color: string
    orderId: string
    productId: string
}

export type ResponseOrder = {
    id: string
    subTotal: string
    shippingFee: number
    total: string
    billingAddress: string
    shippingAddress: string
    status: Status
    ownerId: string
    createdDate: string
    updatedAt: string
    orderedProductIds: string[]
    orderedProductDetail?: OrderedItem[]
}

export type OrderSearch = {
    id?: string | string[],
    subTotal?: number,
    shippingFee?: number,
    total?: number,
    billingAddress?: string,
    shippingAddress?: string,
    status?: Status
    ownerId?: string | string[],
    limit?: number
    filter?: string
    sort?: string
    skip?: number
    createdDate?: Date,
    updatedAt?: Date
}

export type ProductCard = {
    id: string,
    name: Product['name']
    price: Product['price']
    description?: string,
    available: Product['available']
    cateIds?: number[],
    roomIds?: number[]
    colors: string[],
    avgRating: number,
    creatorId: string,
    imageUrl?: MediaGallery['imageUrl'][],

    createdDate: string,
    updatedAt: string,

    totalProduct: number,
    totalSale: number,
    totalRating: number,
    totalComments: number,
}

export type UpdateReview = {
    id?: string
    content?: string
    rating?: number
    isPending?: boolean
}