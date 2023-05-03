import { Avatar, Box, Card, CardContent, Grid, Stack, TableCell, Typography } from '@mui/material';
import { DeleteButton, TopToolbar, useGetOne, useRecordContext } from 'react-admin';
import { ResponseOrder } from '../../../../@type';
import { User } from '@prisma/client';
import OrderedProducts from './OrderedProducts';
import { checkOrderStatus } from '@/utils/checkOrderStatus';

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

export default OrderDetail