import * as React from 'react';
import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Rating,
} from '@mui/material';
import CommentIcon from '@mui/icons-material/Comment';
import { Link } from 'react-router-dom';

import {
    ReferenceField,
    FunctionField,
    useGetList,
    useTranslate,
    useIsDataLoaded,
} from 'react-admin';

import { stringify } from 'query-string';

import CardWithIcon from './CardWithIcon';
import { ResponseReview } from '../../../@type';
import { User } from '@prisma/client';

const PendingReviews = () => {
    const translate = useTranslate();
    const { data: reviews, isLoading } = useGetList<ResponseReview>('review', {
        filter: { isPending: true },
        sort: { field: 'updatedAt', order: 'DESC' },
        pagination: { page: 1, perPage: 30 },
    });

    // Poor man's Suspense: hide the content until all the data is loaded,
    // including the reference customers.
    // As ReferenceField aggregates the calls to reference customers,
    // if the first customer is loaded, then all the customers are loaded.
    const isCustomerDataLoaded = useIsDataLoaded(
        ['user', 'getMany', { ids: [String(reviews?.[0].ownerId)] }],
        { enabled: !isLoading && reviews && reviews.length > 0 }
    );
    const display = isLoading || !isCustomerDataLoaded ? 'none' : 'block';

    return (
        <CardWithIcon
            to={{
                pathname: '/review',
                search: stringify({
                    filter: JSON.stringify({ isPending: true }),
                }),
            }}
            icon={CommentIcon}
            title={'Pending reviews'}
            subtitle={reviews?.length}
        >
            <List sx={{ display }}>
                {reviews?.map((record: ResponseReview) => (
                    <ListItem
                        key={record.id}
                        button
                        component={Link}
                        to={{
                            pathname: '/review',
                            search: stringify({
                                filter: JSON.stringify({ id: record.id })
                            })
                        }}
                        alignItems="flex-start"
                    >
                        <ListItemAvatar>
                            <ReferenceField
                                record={record}
                                source="ownerId"
                                reference="user"
                                link={false}
                            >
                                <FunctionField
                                    render={(customer: User) => {
                                        return customer.image ? (
                                            <Avatar
                                                src={`${customer.image}?size=32x32`}
                                                sx={{
                                                    bgcolor: 'background.paper',
                                                }}
                                                alt={`${customer.name} ${customer.nickName}`}
                                            />
                                        ) : (
                                            <Avatar />
                                        )
                                    }}
                                />
                            </ReferenceField>
                        </ListItemAvatar>

                        <ListItemText
                            primary={<Rating value={record.rating} readOnly />}
                            secondary={record.content}
                            sx={{
                                overflowY: 'hidden',
                                height: '4em',
                                display: '-webkit-box',
                                WebkitLineClamp: 2,
                                WebkitBoxOrient: 'vertical',
                                paddingRight: 0,
                            }}
                        />
                    </ListItem>
                ))}
            </List>
            <Box flexGrow={1}>&nbsp;</Box>
            <Button
                sx={{ borderRadius: 0 }}
                component={Link}
                to="/reviews"
                size="small"
                color="primary"
            >
                <Box p={1} sx={{ color: 'primary.main' }}>
                    To reviews table
                </Box>
            </Button>
        </CardWithIcon>
    );
};

export default PendingReviews;
