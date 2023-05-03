import React, { useMemo, useState } from 'react'
import { GetListParams, useGetList } from 'react-admin'
import { NewOrderItem, ProductCard } from '../../../@type'
import { Autocomplete, Box, Stack, TextField } from '@mui/material'
import { User } from '@prisma/client'

type UserOrderInfo = {
  id: string
  billingAddress: string
  shippingAddress: string
}

export type CreateOrderProps = {
  user: Partial<UserOrderInfo>
  products: Partial<NewOrderItem[]>
}

const initCreateOrder = {
  user: {
    id: undefined,
    billingAddress: undefined,
    shippingAddress: undefined,
  },
  products: []
} satisfies CreateOrderProps

type Props = {}

function OrderCreate({ }: Props) {
  const [UserOptions, setUserOptions] = useState<User['name'][]>([])
  const [UserParams, setUserParams] = useState<Partial<GetListParams>>({
    filter: { name: undefined },
    pagination: { page: 1, perPage: 10 }
  })
  const [selectedUser, setSelectedUser] = useState<string | undefined>(undefined)

  const [ProductOptions, setProductOptions] = useState<ProductCard['name'][]>([])
  const [ProductParams, setProductParams] = useState<Partial<GetListParams>>({
    filter: { name: undefined },
    pagination: { page: 1, perPage: 10 }
  })
  const UsersList = useGetList<User>(
    'user',
    UserParams,
    {
      onSuccess: (res) => setUserOptions(res.data.map(i => {
        if (i.nickName) return i.nickName
        if (i.name) return i.name
        return i.id
      }))
    }
  )
  const ProductList = useGetList<ProductCard>(
    'products',
    ProductParams,
    {
      onSuccess: (res) => setProductOptions(res.data.map(i => i.name))
    }
  )
  const [selectedProduct, setSelectedProduct] = useState<string>()
  const [orderItems, setOrderItems] = useState<NewOrderItem[]>([])
  const selectedUserInfo = useMemo(() => {
    if (!selectedUser
      || !UsersList.data
      || !UsersList.data.length) return
    const data = UsersList.data.map(user => user.address)
    return data[0]
  }, [selectedUser, UsersList.data])
  const selectedProductInfo = useMemo(() => {
    if (!selectedProduct
      || !ProductList.data
      || !ProductList.data.length
    ) return
    const colors = ProductList.data.filter(i => i.id === selectedProduct)
  }, [selectedProduct, ProductList.data])

  return (
    <Box>
      {/* UserInfo */}
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        onChange={(event, newValue) => {
          if (newValue) setSelectedUser(newValue)
        }}
        onInputChange={(event, newInputValue) => {
          setUserParams({ ...UserParams, filter: newInputValue })
        }}
        options={UserOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
      {selectedUserInfo && (
        <Stack>
          <TextField
            label="Billing address"
            variant="outlined"
            defaultValue={selectedUserInfo}
            onChange={(e) => console.log(e.target.value)}
          />
          <TextField
            label="Shipping address"
            variant="outlined"
            defaultValue={selectedUserInfo}
            onChange={(e) => console.log(e.target.value)}
          />
        </Stack>
      )}

      {/* Products */}
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        onChange={(event, newValue) => {
          if (newValue) setSelectedProduct(newValue)
        }}
        onInputChange={(event, newInputValue) => {
          setProductParams({ ...ProductParams, filter: newInputValue })
        }}
        options={ProductOptions}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="Movie" />}
      />
      {selectedProduct && (
        <Stack>
          {/* Color */}
          <TextField
            label="Billing address"
            variant="outlined"
            defaultValue={selectedProductInfo}
            onChange={(e) => console.log(e.target.value)}
          />

          {/* Quantities */}
          <TextField
            label="Shipping address"
            variant="outlined"
            defaultValue={selectedProductInfo}
            onChange={(e) => console.log(e.target.value)}
          />

          {/* Price */}
        </Stack>
      )}
    </Box>
  )
}

/**
 * WorkFlow
 * select User => render userInfo, product => productInfo
 * Submit button on every ProductINfo
 * Reducer => connect all datas and sent to sever by http
 */

export default OrderCreate