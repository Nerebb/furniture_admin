import React from 'react'
import { Rating } from '@mui/material'
import { useRecordContext } from 'react-admin'
import { ProductCard } from '../../../../@type'

type Props = {}

export default function ProductRating({ }: Props) {
    const record = useRecordContext<ProductCard>()
    return (
        <Rating value={record.avgRating} readOnly />
    )
}

ProductRating.defaultProps = {
    label: 'Rating',
    source: 'avgRating'
}