import React from 'react'
import { Link, TopToolbar, useEditContext, useGetOne } from 'react-admin'
import { ResponseOrder } from '../../../../@type'
import { User } from '@prisma/client'
import EmptyRecord from '@/components/customs/EmptyRecord'
import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import OrderedProducts from '../custom/OrderedProducts'

type Props = {}

export default function BasicInfo({ }: Props) {
    const { record } = useEditContext<ResponseOrder>()
    const { data: owner } = useGetOne<User>('user',
        { id: record?.ownerId || '' },
        { enabled: Boolean(record?.ownerId) }
    )
    if (!record) return <EmptyRecord />
    return (
        <Stack gap={1}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                OrderID: {record.id}
            </Typography>
            {owner && (
                <Grid container justifyContent='space-between'>
                    <Grid item xs={6} justifyContent={'space-between'}>
                        <Link to={`/user/${owner.id}`}>
                            <Stack
                                direction='row'
                                gap={1}
                            >
                                {owner.image ? (
                                    <Avatar alt={owner.name || ""} src={owner.image[0]} />
                                ) : (
                                    <Avatar sx={{ width: 30, height: 30, fontSize: 20 }}>{owner.name?.substring(0, 1).toUpperCase() || "N"}</Avatar>
                                )}
                                <Typography
                                    variant="h5"
                                    sx={{ ":first-letter": { textTransform: 'capitalize' } }}
                                >
                                    {owner.name} ({owner.nickName})
                                </Typography>
                            </Stack>
                        </Link>
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
    )
}