import { Box } from "@mui/material"
import { User } from "@prisma/client"
import { BooleanField, Datagrid, DateField, DeleteButton, FunctionField, List, NumberField, ReferenceField, TextField } from "react-admin"
import { ReviewFilters } from "."
import ListActions from "../customs/ListActions"
import ReviewEdit from "./ReviewEdit"

const ReviewList = () => {
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
                <ReferenceField source="productId" reference="products" />
                <NumberField source="totalLike" textAlign="center" />
                <NumberField source="rating" textAlign="center" />
                <DateField source="createdDate" />
                <DateField source="updatedAt" />
                <BooleanField source="isPending" />
                <Box>
                    <DeleteButton />
                </Box>
            </Datagrid>
        </List>
    )
}

export default ReviewList