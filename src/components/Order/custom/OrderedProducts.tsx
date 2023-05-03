import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow
} from '@mui/material';
import { Link, useGetOne, useRecordContext } from 'react-admin';

import { fCurrency } from '@/utils/numberal';
import { ResponseOrder } from '../../../../@type';
import EmptyRecord from '@/components/customs/EmptyRecord';
import ProductOrderTable from './OrderedProductTable';


const OrderedProducts = () => {
    const record = useRecordContext<ResponseOrder>();

    const { isLoading, data: products } = useGetOne<ResponseOrder>(
        'order',
        { id: record.id, meta: { userId: record.ownerId } },
        { enabled: !!record }
    );

    if (isLoading || !record || !products || !products.orderedProductDetail) return <EmptyRecord />;

    return (
        <ProductOrderTable products={products.orderedProductDetail} />
    );
};

export default OrderedProducts;
