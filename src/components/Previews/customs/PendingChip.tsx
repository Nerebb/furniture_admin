import React from 'react'
import { FieldProps, useRecordContext } from 'react-admin'
import { ResponseReview } from '../../../../@type'
import { Chip } from '@mui/material'

type Props = {}

export default function PendingChip({ }: FieldProps & Props) {
    const record = useRecordContext<ResponseReview>()
    const pending = record.isPending ?? true
    return (
        <Chip
            label={pending ? 'Waiting' : "Approved"}
            size='small'
            sx={{
                fontWeight: "400",
                color: pending ? "#404040" : "#3C71A0",
                bgcolor: pending ? "#BABABA" : "#D2E1EE",
                ":hover": {
                    bgcolor: `#${record.id}80`
                }
            }}
        />
    )
}

PendingChip.defaultProps = {
    label: 'Status',
    source: 'isPending',
}

