import { RichTextInput } from "ra-input-rich-text"
import { AutocompleteInput, Create, NumberInput, ReferenceInput, SimpleForm } from "react-admin"
import { Stack } from '@mui/material'
import { yupResolver } from "@hookform/resolvers/yup"
import { CreateProductReviewSchemaValidate } from "@/utils/schemaValidate"
import * as Yup from 'yup'
const ReviewCreate = () => {
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

export default ReviewCreate