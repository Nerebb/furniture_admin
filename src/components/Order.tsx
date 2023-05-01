import { checkOrderStatus } from '@/utils/checkOrderStatus';
import { NewOrderSchemaValidate } from '@/utils/schemaValidate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Box, Card, CardContent, Grid, Stack, TableCell, Typography } from '@mui/material';
import { User } from '@prisma/client';
import { useReducer, useState } from 'react';
import { AutocompleteInput, Create, Datagrid, DateField, DeleteButton, FunctionField, List, NumberField, NumberInput, ReferenceField, ReferenceInput, SelectInput, SimpleForm, TextField, TextInput, TopToolbar, required, useGetList, useGetOne, useList, useRecordContext } from 'react-admin';
import * as Yup from 'yup';
import { NewOrder, ProductCard, ResponseOrder } from '../../@type';
import ListActions from './customs/ListActions';
import OrderedProducts from './customs/OrderedProducts';
import CreateOrderProducts from './customs/CreateOrderProduct';

const OrderDetail = () => {
    const record = useRecordContext<ResponseOrder>()
    const { data: owner } = useGetOne<User>('user', { id: record.ownerId })
    return (
        <Card sx={{ maxWidth: 800, margin: 'auto' }}>
            <CardContent>
                <Stack gap={1}>
                    {/* BasicInfo */}
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        OrderID: {record.id}
                    </Typography>
                    {owner && (
                        <Grid container justifyContent='space-between'>
                            <Grid item xs={6} justifyContent={'space-between'}>
                                <Stack
                                    direction='row'
                                    gap={1}
                                >
                                    {owner.image ? (
                                        <Avatar alt={owner.name || ""} src={owner.image[0]} />
                                    ) : (
                                        <Avatar sx={{ width: 30, height: 30, fontSize: 20 }}>{owner.name?.substring(0, 1).toUpperCase() || "N"}</Avatar>
                                    )}
                                    <Typography variant="h5" sx={{ ":first-letter": { textTransform: 'capitalize' } }}>{owner.name} ({owner.nickName})</Typography>
                                </Stack>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary">
                                    OwnerID: {owner.id}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography width={"100%"} sx={{ fontSize: 16, display: 'flex', justifyContent: "space-between" }} color="text.secondary" gutterBottom>
                                    Phone number: <span>{owner.phoneNumber}</span>
                                </Typography>
                                <Typography width={"100%"} sx={{ fontSize: 16, display: 'flex', justifyContent: "space-between" }} color="text.secondary" gutterBottom>
                                    Email: <span>{owner.email}</span>
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                    <Stack>
                        <Typography width={"100%"} sx={{ fontSize: 16, display: 'flex', justifyContent: "space-between" }} color="text.secondary" gutterBottom>
                            Current address: <span>{owner?.address ?? "Unknown"}</span>
                        </Typography>
                        <Typography width={"100%"} sx={{ fontSize: 16, display: 'flex', justifyContent: "space-between" }} color="text.secondary" gutterBottom>
                            Billing address: <span>{record.billingAddress}</span>
                        </Typography>
                        <Typography width={"100%"} sx={{ fontSize: 16, display: 'flex', justifyContent: "space-between" }} color="text.secondary" gutterBottom>
                            Shipping address: <span>{record.shippingAddress}</span>
                        </Typography>
                    </Stack>
                </Stack>
                <Box
                    sx={{
                        maxHeight: "500px",
                        overflowY: "auto"
                    }}
                >
                    <OrderedProducts />
                </Box>
                <TopToolbar>
                    <DeleteButton label='Cancel order' disabled={checkOrderStatus(record.status)} />
                </TopToolbar>
            </CardContent>
        </Card>
    )
}


export const OrderList = () => (
    <List
        actions={<ListActions />}
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
            <DateField source="updatedAt" showDate textAlign='center' />
            <DateField source="createdDate" showDate textAlign='center' />
        </Datagrid>
    </List>
);

export type CreateOrder = {
    userId: string
} & NewOrder
const initOrderCreateState = {
    userId: "",
    billingAddress: "",
    shippingAddress: "",
    products: [],
} satisfies NewOrder & { userId: string }
export const OrderCreate = () => {
    const { data: productList } = useGetList<ProductCard>('products')
    const [formState, setFormState] = useReducer((prev: Partial<CreateOrder>, next: Partial<CreateOrder>) => {
        return { ...prev, ...next }
    }, initOrderCreateState)
    // const [selectedProduct, setSelectedProduct] = useState<>(null)
    return (
        <Create
            sx={{ maxWidth: 800, margin: 'auto' }}
        >
            <SimpleForm
                defaultValues={initOrderCreateState}
                resolver={yupResolver(Yup.object(NewOrderSchemaValidate))}
            >

                {/* BasicInfo */}
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Create new Order
                </Typography>
                <ReferenceInput source="userId" reference='user'>
                    <AutocompleteInput optionText='id' />
                </ReferenceInput>
                <Stack gap={1}>
                    <TextInput source='billingAddress' />
                    <TextInput source='shippingAddress' />
                </Stack>
                <Box
                    sx={{
                        maxHeight: "500px",
                        overflowY: "auto"
                    }}
                >
                    <CreateOrderProducts newItems={formState.products} setNewItem={setFormState} />
                </Box>
            </SimpleForm>
        </Create>
    )
}