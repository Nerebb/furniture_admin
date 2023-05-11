import React from 'react'
import { DeleteButton, SaveButton, Toolbar, ToolbarProps, useNotify, useRecordContext, useRedirect, useUpdate } from 'react-admin'
import { Stack } from '@mui/material'
import { ResponseReview } from '../../../../@type';

type Props = {}

export default function PreviewEditToolBar() {
    const record = useRecordContext<ResponseReview>();
    return (
        <Toolbar >
            <Stack direction={'row'} gap={2}>
                {record.isPending ? (
                    <SaveButton label='Approve' alwaysEnable />
                ) : (
                    <SaveButton />
                )}
                <DeleteButton />
            </Stack>
        </Toolbar>
    )
}