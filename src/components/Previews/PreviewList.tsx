import { Box } from "@mui/material"
import { User } from "@prisma/client"
import { BooleanField, Button, ChipField, Datagrid, DateField, DeleteButton, EditButton, FunctionField, List, NumberField, ReferenceField, ReferenceOneField, TextField, useDataProvider, useNotify } from "react-admin"
import { ReviewFilters } from "."
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ListActions from "../customs/ListActions"
import ReviewEdit from "./ReviewEdit"
import { useMutation } from "@tanstack/react-query";
import { ProductCard, UpdateReview } from "../../../@type";
import { error } from "console";
import PendingChip from "./customs/PendingChip";

const ReviewList = () => {
    const DataProvider = useDataProvider()
    const notify = useNotify()
    const { mutate: mutatePending } = useMutation({
        mutationKey: ['MutatePending'],
        mutationFn: ({ prevData, isPending }: { prevData: UpdateReview, isPending: boolean }) => DataProvider.update('review', { id: prevData.id, data: { isPending }, previousData: prevData }),
        onSuccess: () => {
            notify("Preview has been approved", { type: 'success' })
        },
        onError: (error: any) => {
            notify(error.message || "ApproveReview: Unknown error", { type: 'error' })
        }
    })
    return (
        <List
            filters={ReviewFilters}
            actions={<ListActions isFilter />}
        >
            <Datagrid
                rowClick="expand"
                expand={<ReviewEdit />}
            >
                <TextField source="id" />
                <ReferenceField source="ownerId" reference='user' sx={{ textTransform: "capitalize" }}>
                    <FunctionField render={(record: User) => record && `${record.name} (${record.nickName})`} />
                </ReferenceField>
                <ReferenceField source="productId" reference="products">
                    <FunctionField render={(record: ProductCard) => record && `${record.name}`} />
                </ReferenceField>
                <NumberField source="totalLike" textAlign="center" />
                <NumberField source="rating" textAlign="center" />
                <DateField source="createdDate" />
                <DateField source="updatedAt" />
                <PendingChip />
                <Box>
                    <DeleteButton />
                </Box>
            </Datagrid>
        </List>
    )
}

export default ReviewList