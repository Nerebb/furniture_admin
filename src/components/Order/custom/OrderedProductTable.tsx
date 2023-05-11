import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { Link } from 'react-admin'
import { fCurrency } from '@/utils/numberal'
import { NewOrderItem, OrderedItem } from '../../../../@type'

type Props = {
    products: OrderedItem[] | NewOrderItem[]
}

function CusTableRow(item: OrderedItem | NewOrderItem) {
    return (
        <>
            <TableCell>
                <Link to={`/products/${item.productId}`}>
                    {item.name}
                </Link>
            </TableCell>
            <TableCell align='center'>{item.color}</TableCell>
            <TableCell align='center'>{item.quantities}</TableCell>
            <TableCell align='right'>{fCurrency(item.salePrice)}</TableCell>
            <TableCell align='right'>{fCurrency(item.salePrice * item.quantities)}</TableCell>
        </>
    )
}

export default function OrderedProductTable({ products }: Props) {
    return (
        <Table stickyHeader>
            <TableHead>
                <TableRow>
                    <TableCell>Product name</TableCell>
                    <TableCell align='center'>Color</TableCell>
                    <TableCell align='center'>Quantities</TableCell>
                    <TableCell align='right'>Unit price</TableCell>
                    <TableCell align='right'>Price</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {products.map((item, idx) => (
                    <TableRow key={`${item.productId}-${idx}`}>
                        <CusTableRow {...item} />
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}