import * as React from 'react';
import { Card, CardHeader, List } from '@mui/material';
import { useTranslate } from 'react-admin';

import { PendingOrder } from './PendingOrder';
import { ResponseOrder } from '../../../@type';

interface Props {
    orders?: ResponseOrder[];
}

const PendingOrders = (props: Props) => {
    const orders = props.orders
        ? props.orders?.sort((a, b) => (new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()))
        : []

    return (
        <Card sx={{ flex: 1 }}>
            <CardHeader title={'Pending orders'} />
            <List dense={true}>
                {orders.map(record => (
                    <PendingOrder key={record.id} order={record} />
                ))}
            </List>
        </Card>
    );
};

export default PendingOrders;
