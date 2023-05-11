import * as React from 'react';
import {
    ListItem,
    ListItemSecondaryAction,
    ListItemAvatar,
    ListItemText,
    Avatar,
    Box,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useTranslate, useReference, useGetList, useGetOne } from 'react-admin';
import { ResponseOrder } from '../../../@type';
import { User } from '@prisma/client';
import { fCurrency } from '@/utils/numberal';
import { stringify } from 'querystring';


interface Props {
    order: ResponseOrder;
}

export const PendingOrder = (props: Props) => {
    const { order } = props;
    const { data: customer } = useGetOne('user', { id: order.ownerId })

    return (
        <ListItem button component={Link} to={`order/${order.id}`}>
            <ListItemAvatar>
                {customer && customer.image ? (
                    <Avatar
                        src={`${customer?.image}?size=32x32`}
                        sx={{ bgcolor: 'background.paper' }}
                        alt={`${customer?.name} ${customer?.nickName}`}
                    />
                ) : (
                    <Avatar />
                )}
            </ListItemAvatar>
            <ListItemText
                primary={new Date(order.createdDate).toLocaleString('en-GB')}
                secondary={`By ${customer ? customer.name : 'Unknow'}, ${order.orderedProductIds.length} items`}
            />
            <ListItemSecondaryAction>
                <Box
                    component="span"
                    sx={{
                        marginRight: '1em',
                        color: 'text.primary',
                    }}
                >
                    {fCurrency(Number(order.total))}
                </Box>
            </ListItemSecondaryAction>
        </ListItem>
    );
};
