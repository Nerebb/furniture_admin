import { Filter } from "@/providers/filterProvider"
import { Chip, Stack, Typography } from "@mui/material"
import { useRouter } from "next/router"
import { GetManyParams, useGetMany } from "react-admin"

const ColoredChip = ({ resource, record }: { resource: string, record: Filter }) => {
    const router = useRouter()
    return <Chip
        label={record.label.match(/[^\s]+/)}
        size='small'
        sx={{
            fontWeight: "400",
            color: `#${record.id}`,
            bgcolor: `#${record.id}40`,
            ":hover": {
                bgcolor: `#${record.id}80`
            }
        }}
        onClick={() => router.push(`/${resource}/${record.id}`)}
    />
}

export const CustomRefColor = ({ source, params }: { source: string, params: Partial<GetManyParams> }) => {
    const { data: records } = useGetMany<Filter>(source, params)
    if (!records || !records.length) return <Typography>No color registered</Typography>
    return (
        <Stack direction='row' alignItems='center' spacing={1}>
            <Typography >Colors: </Typography>
            {records.map(i => (<ColoredChip key={`${i.label}-${i.id}`} resource={source} record={i} />))}
        </Stack>
    )
}
