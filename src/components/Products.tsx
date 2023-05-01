import { Product } from '@/providers/productProvider';
import { ProductCreateSchemaValidate, ProductUpdateSchemaValidate } from '@/utils/schemaValidate';
import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Card, CardActions, CardContent, Grid, Rating, Stack, Typography } from '@mui/material';
import { RichTextInput } from 'ra-input-rich-text';
import { AutocompleteInput, BooleanInput, ChipField, Create, Datagrid, DateField, DeleteButton, Edit, EditButton, List, NumberField, NumberInput, ReferenceArrayField, ReferenceArrayFieldProps, ReferenceArrayInput, ReferenceInput, SelectArrayInput, SimpleForm, SingleFieldList, TextField, TextInput, TopToolbar, useRecordContext } from 'react-admin';
import * as Yup from 'yup';
import CreateModal from './customs/CreateModal';
import { CustomRefColor } from './customs/CustomRefColor';
import ListActions from './customs/ListActions';


const CustomRefArrayField = (props: ReferenceArrayFieldProps) => {
    return (
        <ReferenceArrayField
            sx={{
                minWidth: "200px",
                maxWidth: "500px",
                ".MuiChip-label::first-letter": {
                    textTransform: "capitalize"
                },
            }}
            emptyText='No record found'
            {...props}
        >
            <SingleFieldList>
                <ChipField source='label' size='small' />
            </SingleFieldList>
        </ReferenceArrayField>
    )
}

const ProductDetail = () => {
    const record = useRecordContext<Product>()

    return (
        <Card sx={{ maxWidth: 800, margin: 'auto' }}>
            <CardContent>
                <Stack gap={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            {/* BasicInfo */}
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {record.id}
                            </Typography>
                            <Typography variant="h5" component="div" sx={{ ":first-letter": { textTransform: 'capitalize' } }}>
                                {record.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} />
                        <Grid item xs={4}>
                            {/* Rating */}
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Typography sx={{ fontWeight: "bold" }}>Rating:</Typography>
                                <Stack direction='row'>
                                    <Rating value={record.avgRating} readOnly />
                                    <Typography>{`(${record.totalRating})`}</Typography>
                                </Stack>
                            </Stack>

                            {/* Comments */}
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Typography sx={{ fontWeight: "bold" }}>Total comments: </Typography>
                                <Typography>{record.totalComments || 0}</Typography>
                            </Stack>

                            {/* Ordered */}
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Typography sx={{ fontWeight: "bold" }}>Total ordered: </Typography>
                                <Typography>{record.totalSale}</Typography>
                            </Stack>
                        </Grid>
                    </Grid>

                    {/* Reference table */}
                    <Grid container gap={1}>
                        {/* Color */}
                        <Grid item xs={12}><CustomRefColor source='color' params={{ ids: record.colors }} /></Grid>

                        {/* Rooms */}
                        <Grid item xs={12} container alignItems={'center'}>
                            <Grid item xs={1}><Typography>Rooms :</Typography></Grid>
                            <Grid item ><CustomRefArrayField source="roomIds" reference="room" /></Grid>
                        </Grid>

                        {/* Categories */}
                        <Grid item xs={12} container alignItems={'start'}>
                            <Typography>Categories :</Typography>
                            <CustomRefArrayField source="cateIds" reference="category" />
                        </Grid>
                    </Grid>

                    <Typography variant="body2">
                        {record.description}
                    </Typography>

                    {/* Actions */}
                    <TopToolbar>
                        <EditButton />
                        <DeleteButton />
                    </TopToolbar>
                </Stack>
            </CardContent>
        </Card>
    )
}

const productFilters = [
    <BooleanInput key={`filter-featured`} label="Featured product" source="isFeatureProduct" alwaysOn />,
    <TextInput key={`filter-name`} label="Filter by name" source="name" alwaysOn />,
    <TextInput key={`filter-rating`} label="Filter by rating" source="avgRating" alwaysOn />,
];
export const ProductList = () => (
    <List
        filters={productFilters}
        actions={<ListActions isFilter />}
    >
        <Datagrid
            expand={<ProductDetail />}
            rowClick='expand'
        >
            <TextField source="id" minWidth={300} />
            <TextField source="name" />
            <NumberField source="available" textAlign='center' />
            <NumberField source="price" options={{ style: 'currency', currency: 'VND' }} />
            <NumberField label="Product rating" source="avgRating" textAlign='center' />
            <NumberField label="Rated users" source="totalRating" textAlign='center' />
            <NumberField source="totalSale" textAlign='center' />
            <DateField source="createdDate" showDate textAlign='center' />
            <DateField source="updatedAt" showDate textAlign='center' />
            <Box>
                <EditButton />
                <DeleteButton />
            </Box>
        </Datagrid>
    </List>
)

export const ProductEdit = () => {

    return (
        <Edit
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
                resolver={yupResolver(Yup.object(ProductUpdateSchemaValidate))}
            >
                <Stack direction='row' gap={2} justifyContent='space-between' width={"100%"}>
                    <TextInput disabled label="Id" source="id" sx={{ flexGrow: 1 }} />
                    <ReferenceInput source="creatorId" reference='user' >
                        <AutocompleteInput optionText='name' />
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

const selectArrayRef = [
    {
        source: "colors",
        reference: "color",
        optionValue: "id",
        optionText: "label"
    },
    {
        label: "Categories",
        source: "cateIds",
        reference: "category",
        optionValue: "id",
        optionText: "label"
    },
    {
        label: "Rooms",
        source: "roomIds",
        reference: "room",
        optionValue: "id",
        optionText: "label"
    },
]
export const ProductCreate = () => {
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

