import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import { Link, useGetOne, useRecordContext } from 'react-admin';

import { fCurrency } from '@/utils/numberal';
import { ResponseOrder } from '../../../@type';
import EmptyRecord from './EmptyRecord';

const OrderedProducts = () => {
    const record = useRecordContext<ResponseOrder>();

    const { isLoading, data: products } = useGetOne<ResponseOrder>(
        'order',
        { id: record.id, meta: { userId: record.ownerId } },
        { enabled: !!record }
    );

    if (isLoading || !record || !products || !products.orderedProductDetail) return <EmptyRecord />;

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
                {products.orderedProductDetail.map((item, idx) => (
                    <TableRow key={`${item.productId}-${idx}`}>
                        <TableCell>
                            <Link to={`/products/${item.productId}`}>
                                {item.name}
                            </Link>
                        </TableCell>
                        <TableCell align='center'>{item.color}</TableCell>
                        <TableCell align='center'>{item.quantities}</TableCell>
                        <TableCell align='right'>{fCurrency(item.salePrice)}</TableCell>
                        <TableCell align='right'>{fCurrency(item.salePrice * item.quantities)}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default OrderedProducts;
