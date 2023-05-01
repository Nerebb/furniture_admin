import { CreateProductReviewSchemaValidate, UpdateProductReviewSchemaValidate } from "@/utils/schemaValidate"
import { yupResolver } from "@hookform/resolvers/yup"
import { Box, Stack } from "@mui/material"
import { User } from "@prisma/client"
import { RichTextInput } from "ra-input-rich-text"
import { AutocompleteInput, Create, Datagrid, DateField, DateInput, DeleteButton, Edit, FunctionField, List, NumberField, NumberInput, ReferenceField, ReferenceInput, SimpleForm, TextField, TextInput, useRecordContext, useResourceContext } from "react-admin"
import * as Yup from 'yup'
import ListActions from "./customs/ListActions"

const ReviewFilters = [
    <TextInput key={`ReviewFilter-id`} label="Search by id" source="id" alwaysOn />,
    <TextInput key={`ReviewFilter-ownerId`} label="Search by ownerId" source="ownerId" alwaysOn />,
    <TextInput key={`ReviewFilter-productId`} label="Search by productId" source="productId" alwaysOn />,
    <NumberInput key={`ReviewFilter-totalLike`} label="Search by totalLike" source="totalLike" />,
    <NumberInput key={`ReviewFilter-rating`} label="Search by rating" source="rating" />,
    <DateInput key={`ReviewFilter-createdDate`} label="Search by createdDate" source="createdDate" />,
    <DateInput key={`ReviewFilter-updatedAt`} label="Search by updatedAt" source="updatedAt" />,
]

export const ReviewList = () => {
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
                <Box>
                    <DeleteButton />
                </Box>
            </Datagrid>
        </List>
    )
}

export const ReviewEdit = () => {
    const record = useRecordContext();
    const resource = useResourceContext();
    return (
        <Edit
            resource={resource}
            id={record.id}
            title=" "
            sx={{
                maxWidth: "850px",
                margin: 'auto',
                "#content": {
                    minHeight: "200px"
                },
            }}
        >
            <SimpleForm
                resolver={yupResolver(Yup.object(UpdateProductReviewSchemaValidate))}
            >
                <Stack direction='row' gap={2}>
                    <ReferenceInput source="ownerId" reference="user" >
                        <AutocompleteInput optionText='name' />
                    </ReferenceInput>
                    <NumberInput source="rating" min={0} max={5} />
                </Stack>
                <RichTextInput source="content" />
            </SimpleForm>
        </Edit>
    )
}


export const ReviewCreate = () => {
    return (
        <Create
            sx={{
                maxWidth: "850px",
                margin: 'auto',
                "#content": {
                    minHeight: "200px"
                },
            }}
        >
            <SimpleForm
                resolver={yupResolver(Yup.object(CreateProductReviewSchemaValidate))}
            >
                <Stack direction='row' gap={2}>
                    <ReferenceInput source="productId" reference="products">
                        <AutocompleteInput optionText='id' />
                    </ReferenceInput>
                    <NumberInput source="rating" min={0} max={5} />
                </Stack>
                <RichTextInput source="content" />
            </SimpleForm>
        </Create>
    )
}