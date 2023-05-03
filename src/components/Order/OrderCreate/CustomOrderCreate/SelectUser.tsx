import { UserOrderInfo, useCreateOrderContext } from '@/context/CreateOrderProvider'
import { Autocomplete, Button, Stack, TextField } from '@mui/material'
import { User } from '@prisma/client'
import React, { useMemo, useReducer, useState } from 'react'
import { GetListParams, useGetList } from 'react-admin'

type Props = {}

export default function SelectUser({ }: Props) {
    const { newOrder, setNewOrder } = useCreateOrderContext()
    const [UserOptions, setUserOptions] = useState<User['name'][]>([])
    const [UserParams, setUserParams] = useState<Partial<GetListParams>>({
        filter: { name: undefined },
        pagination: { page: 1, perPage: 10 }
    })
    const UsersList = useGetList<User>(
        'user',
        UserParams,
        {
            onSuccess: (res) => setUserOptions(res.data.map(i => {
                if (i.nickName) return i.nickName
                if (i.name) return i.name
                return i.id
            }))
        }
    )

    return (
        <Stack
            gap={1}
        >
            {/* UserInfo */}
            <Autocomplete
                disablePortal
                onChange={(event, newValue) => {
                    if (newValue && UsersList.data) {
                        const selected = UsersList.data.find(user => user.name === newValue || user.nickName === newValue)
                        if (!selected) return setNewOrder({ userId: undefined })
                        setNewOrder({ userId: selected.id, billingAddress: selected.address ?? undefined, })
                    }
                }}
                onInputChange={(event, newInputValue) => {
                    setUserParams({ ...UserParams, filter: newInputValue })
                    setNewOrder({ userId: undefined })
                }}
                options={UserOptions}
                sx={{ minWidth: 300, maxWidth: 450, flexGrow: 1 }}
                renderInput={(params) => <TextField {...params} label="Order Owner name" variant='outlined' />}
            />
            {newOrder.userId && (
                <Stack gap={1}>
                    <TextField
                        label="Billing address"
                        variant="outlined"
                        defaultValue={newOrder.billingAddress}
                        onChange={(e) => setNewOrder({ billingAddress: e.target.value })}
                        sx={{ flexGrow: 1 }}
                    />
                    <TextField
                        label="Shipping address"
                        variant="outlined"
                        onChange={(e) => setNewOrder({ shippingAddress: e.target.value })}
                        sx={{ flexGrow: 1 }}
                    />
                </Stack>
            )}
        </Stack>
    )
}