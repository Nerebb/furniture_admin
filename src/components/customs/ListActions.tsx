import React from 'react'
import { CreateButton, ExportButton, FilterButton, TopToolbar } from 'react-admin'

type Props = {
    isFilter?: boolean
    isCreate?: boolean
}

export default function ListActions({ isFilter = false, isCreate = false }: Props) {
    return (
        <TopToolbar>
            {isFilter && <FilterButton />}
            {isCreate && <CreateButton />}
            <ExportButton />
        </TopToolbar>
    )
}