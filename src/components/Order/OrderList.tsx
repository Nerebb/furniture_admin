import { Avatar, Box, Card, CardContent, Grid, Stack, TableCell, Typography } from '@mui/material';
import { Datagrid, DateField, FunctionField, List, NumberField, ReferenceField, TextField } from 'react-admin';
import ListActions from '../customs/ListActions';
import OrderDetail from './custom/OrderDetail';
import { User } from '@prisma/client';
import { orderFilters } from '.';

const OrderList = () => (
    <List
        filters={orderFilters}
        actions={<ListActions isFilter />}
        sx={{
            ".column-status": {
                textTransform: "capitalize"
            }
        }}
    >
        <Datagrid
            rowClick="expand"
            expand={<OrderDetail />}
        >
            <TextField source="id" />
            <ReferenceField source="ownerId" reference='user' sx={{ textTransform: "capitalize" }}>
                <FunctionField render={(record: User) => record && `${record.name} (${record.nickName})`} />
            </ReferenceField>
            <TextField source="status" />
            <NumberField source="shippingFee" options={{ style: 'currency', currency: 'VND' }} />
            <NumberField source="subTotal" options={{ style: 'currency', currency: 'VND' }} />
            <NumberField source="total" options={{ style: 'currency', currency: 'VND' }} />
            <DateField source="createdDate" showDate textAlign='center' />
            <DateField source="updatedAt" showDate textAlign='center' />
        </Datagrid>
    </List>
);

export default OrderList