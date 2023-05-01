import React from 'react'
import { CreateButton, ExportButton, FilterButton, TopToolbar } from 'react-admin'

type Props = {
    isFilter?: boolean
}

export default function ListActions({ isFilter = false }: Props) {
    return (
        <TopToolbar>
            {isFilter && <FilterButton />}
            <CreateButton />
            <ExportButton />
        </TopToolbar>
    )
}