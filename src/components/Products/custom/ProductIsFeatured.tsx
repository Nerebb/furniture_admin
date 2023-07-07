import React from 'react'
import { useRecordContext } from 'react-admin'
import { Chip } from '@mui/material'
import { ProductCard } from '../../../../@type'

type Props = {}

export default function ProductIsFeatured({ }: Props) {
    const record = useRecordContext<ProductCard>()

    return (
        <Chip />
    )
}