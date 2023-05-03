import { AutocompleteInput, BooleanInput, Create, Edit, NumberInput, ReferenceArrayInput, ReferenceInput, SelectArrayInput, SimpleForm, TextInput } from "react-admin"
import { Box, Card, CardActions, CardContent, Grid, Rating, Stack, Typography } from '@mui/material';
import { ProductCreateSchemaValidate, ProductUpdateSchemaValidate } from "@/utils/schemaValidate";
import * as Yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup";
import CreateModal from "../customs/CreateModal";
import { RichTextInput } from "ra-input-rich-text";
import { selectArrayRef } from ".";


const ProductCreate = () => {
    return (
        <Create
            title={'Create new product'}
            sx={{
                maxWidth: "850px",
                margin: 'auto',
                "#description": {
                    minHeight: "200px"
                }
            }}
        >
            <SimpleForm
                resolver={yupResolver(Yup.object(ProductCreateSchemaValidate))}
            >
                <Stack direction='row' gap={2} width={"100%"} justifyContent='space-between'>
                    <TextInput label="Product name" source="name" sx={{ minWidth: "350px" }} />
                    <BooleanInput source="isFeatureProduct" />
                </Stack>
                <Stack direction='row' gap={2} width={"100%"}>
                    <NumberInput
                        label="Price (VND)"
                        source="price"
                        options={{ style: 'currency', currency: 'VND' }}
                        sx={{ flexGrow: 1 }}
                    />
                    <NumberInput source="available" sx={{ flexGrow: 1 }} />
                </Stack>
                {/* <ReferenceInput source="creatorId" reference='user'/> */}
                <Grid container width={"100%"} spacing={1}>
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
                </Grid>
                <RichTextInput
                    source="description"
                />
            </SimpleForm>
        </Create>
    )
}

export default ProductCreate