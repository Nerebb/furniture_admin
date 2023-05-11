import React from 'react'
import { ResponseOrder } from '../../../../@type'
import { useEditContext } from 'react-admin'
import OrderedProductTable from '../custom/OrderedProductTable'
import { Typography, Box } from '@mui/material';
type Props = {}

export default function OrderedItem({ }: Props) {
    const { record } = useEditContext<ResponseOrder>()
    if (!record?.orderedProductDetail) return <Typography>Cant Found any ProductItem</Typography>
    return (
        <Box
            sx={{
                maxHeight: "500px",
                overflowY: "auto"
            }}
        >
            <OrderedProductTable products={record?.orderedProductDetail} />
        </Box>
    )
}