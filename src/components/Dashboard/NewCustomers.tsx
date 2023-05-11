import * as React from 'react';
import {
    Avatar,
    Box,
    Button,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
} from '@mui/material';
import CustomerIcon from '@mui/icons-material/PersonAdd';
import { Link } from 'react-router-dom';
import { useTranslate, useGetList } from 'react-admin';
import { subDays } from 'date-fns';

import CardWithIcon from './CardWithIcon';
import { User } from '@prisma/client';
import { stringify } from 'querystring';

const NewCustomers = () => {
    const translate = useTranslate();

    const aMonthAgo = subDays(new Date(), 30);
    aMonthAgo.setDate(aMonthAgo.getDate() - 30);
    aMonthAgo.setHours(0);
    aMonthAgo.setMinutes(0);
    aMonthAgo.setSeconds(0);
    aMonthAgo.setMilliseconds(0);

    const { isLoading, data: visitors } = useGetList<User>('user', {
        filter: {
            createdDate: aMonthAgo,
            deleted: null,
        },
        sort: { field: 'updatedAt', order: 'DESC' },
        pagination: { page: 1, perPage: 100 },
    });

    const nb = visitors ? visitors.length : 0;
    return (
        <CardWithIcon
            to="/user"
            icon={CustomerIcon}
            title={"Monthly new customer"}
            subtitle={nb}
        >
            <List sx={{ display: isLoading ? 'none' : 'block' }}>
                {visitors
                    ? visitors.map((record: User) => (
                        <ListItem
                            button
                            to={`user/${record.id}`}
                            component={Link}
                            key={record.id}
                        >
                            <ListItemAvatar>
                                {record.image ? (
                                    <Avatar
                                        src={`${record.image}`}

                                        alt={`${record.name} ${record.nickName}`}
                                    />
                                ) : (
                                    <Avatar />
                                )}
                            </ListItemAvatar>
                            <ListItemText
                                primary={record.name ? `${record.name} (${record.nickName})` : record.email}
                            />
                        </ListItem>
                    ))
                    : null}
            </List>
            <Box flexGrow={1}>&nbsp;</Box>
            <Button
                sx={{ borderRadius: 0 }}
                component={Link}
                to="/user"
                size="small"
                color="primary"
            >
                <Box p={1} sx={{ color: 'primary.main' }}>
                    To user table
                </Box>
            </Button>
        </CardWithIcon>
    );
};

export default NewCustomers;
