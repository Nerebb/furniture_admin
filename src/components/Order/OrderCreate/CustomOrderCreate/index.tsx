import { initCreateOrder, useCreateOrderContext } from '@/context/CreateOrderProvider'
import { Button, Stack, Typography } from '@mui/material'
import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useDataProvider, useRedirect } from 'react-admin'
import SelectProducts from './SelectProducts'
import SelectUser from './SelectUser'
import ProductOrderTable from '../../custom/OrderedProductTable'
import { useRouter } from 'next/router'


type Props = {}

function CustomOrderCreate({ }: Props) {
  const [error, setError] = useState<string | undefined>(undefined)
  const { newOrder, setNewOrder } = useCreateOrderContext()
  const DataProvider = useDataProvider()
  const redirect = useRedirect()
  const { mutate } = useMutation({
    mutationKey: ['CreateNewOrder'],
    mutationFn: () => DataProvider.create('order', { data: newOrder }),
    onError: (error: any) => {
      setError(error.message)
    },
    onSuccess: () => {
      setNewOrder(initCreateOrder)
      redirect('/order')
    }
  })

  function handleCreateOrder() {
    mutate()
  }
  return (
    <Stack gap={1}>
      {/* User */}
      <Typography variant='h6' sx={{ textDecoration: 'underline' }}>Select user</Typography>
      <SelectUser />

      {/* Choose product */}
      <Typography variant='h6' sx={{ textDecoration: 'underline' }}>Select Product</Typography>
      <SelectProducts />

      {/* View ProductList */}
      {newOrder.products && newOrder.products.length > 0 && <ProductOrderTable products={newOrder.products} />}

      {/* Submit */}
      {newOrder.products && newOrder.products.length > 0 && <Button onClick={handleCreateOrder}>Create Order</Button>}
      {error && <Typography>{error}</Typography>}
    </Stack>
  )
}

/**
 * WorkFlow
 * select User => render userInfo, product => productInfo
 * Submit button on every ProductINfo
 * Reducer => connect all datas and sent to sever by http
 */

export default CustomOrderCreate