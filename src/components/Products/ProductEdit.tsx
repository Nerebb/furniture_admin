import { AutocompleteInput, BooleanInput, Edit, NumberInput, ReferenceArrayInput, ReferenceInput, SelectArrayInput, SimpleForm, TextInput } from "react-admin"
import { Box, Card, CardActions, CardContent, Grid, Rating, Stack, Typography } from '@mui/material';
import { ProductUpdateSchemaValidate } from "@/utils/schemaValidate";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import CreateModal from "../customs/CreateModal";
import { RichTextInput } from "ra-input-rich-text";
import { selectArrayRef } from ".";

const ProductEdit = () => {

    return (
        <Edit
            title={'Edit product'}
            sx={{
                maxWidth: "850px",
                margin: 'auto',
                "#description": {
                    minHeight: "200px"
                }
            }}
        >
            <SimpleForm
                resolver={yupResolver(Yup.object(ProductUpdateSchemaValidate))}
            >
                <Stack direction='row' gap={2} justifyContent='space-between' width={"100%"}>
                    <TextInput disabled label="Id" source="id" sx={{ flexGrow: 1 }} />
                    <ReferenceInput source="creatorId" reference='user' >
                        <AutocompleteInput optionText='name' filterToQuery={(value) => ({ name: value })} />
                    </ReferenceInput>
                    <BooleanInput source="isFeatureProduct" />
                </Stack>
                <Stack direction='row' gap={2} width={"100%"}>
                    <TextInput label="Product name" source="name" sx={{ flexGrow: 1 }} />
                    <NumberInput
                        label="Price (VND)"
                        source="price"
                        options={{ style: 'currency', currency: 'VND' }}
                        sx={{ flexGrow: 1 }}
                    />
                    <NumberInput source="available" sx={{ flexGrow: 1 }} />
                </Stack>
                {selectArrayRef.map(field => (
                    <Grid item xs={4} key={`NewProduct-${field.source}`}>
                        <ReferenceArrayInput
                            source={field.source}
                            reference={field.reference}
                        >
                            <SelectArrayInput
                                label={field.label}
                                optionValue={field.optionValue}
                                optionText={field.optionText}
                                sx={{ textTransform: "capitalize", width: "100%" }}
                                create={<CreateModal reference={field.reference} />}
                            />
                        </ReferenceArrayInput>
                    </Grid>
                ))}
                <RichTextInput
                    source="description"
                    minWidth={"100%"}
                />
            </SimpleForm>
        </Edit>
    )
}

export default ProductEdit