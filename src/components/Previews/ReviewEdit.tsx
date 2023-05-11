import { RichTextInput } from "ra-input-rich-text";
import { AutocompleteInput, BooleanInput, Edit, NumberInput, ReferenceInput, SimpleForm, useRecordContext, useResourceContext } from "react-admin";
import { Stack } from '@mui/material'
import { yupResolver } from "@hookform/resolvers/yup";
import { UpdateProductReviewSchemaValidate } from "@/utils/schemaValidate";
import * as Yup from 'yup'
import PreviewEditToolBar from "./customs/PreviewEditToolBar";

const ReviewEdit = () => {
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
                toolbar={<PreviewEditToolBar />}
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

export default ReviewEdit
