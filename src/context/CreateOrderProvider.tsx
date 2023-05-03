import React, { Dispatch, PropsWithChildren, createContext, useContext, useReducer } from 'react'
import { NewOrder, NewOrderItem } from '../../@type'

type Props = {}

export type UserOrderInfo = {
    userId: string
    billingAddress: string
    shippingAddress: string
}

export const initCreateOrder = {
    products: []
} satisfies CreateOrderProps

export type CreateOrderProps = Partial<UserOrderInfo> & {
    products?: NewOrderItem[]
}

type OrderContext = {
    newOrder: Partial<CreateOrderProps>
    setNewOrder: Dispatch<CreateOrderProps>
}

const CreateOrderContext = createContext<OrderContext | null>(null)

export function CreateOrderProvider({ children }: PropsWithChildren<Props>) {
    const [newOrder, setNewOrder] = useReducer((prev: CreateOrderProps, next: CreateOrderProps) => {
        return { ...prev, ...next }
    }, initCreateOrder)
    return (
        <CreateOrderContext.Provider value={{ newOrder, setNewOrder }}>
            {children}
        </CreateOrderContext.Provider>
    )
}

export function useCreateOrderContext() {
    const content = useContext(CreateOrderContext)
    if (!content) throw new Error("Provider must be parent of useContext")
    return content
}