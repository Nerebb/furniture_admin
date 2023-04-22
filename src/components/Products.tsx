import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, Create, ValidateForm, Error, Title, useResourceContext, DateField, NumberField, ReferenceArrayField, ReferenceField, SingleFieldList, ChipField, ReferenceArrayFieldProps, useRecordContext, useDataProvider } from 'react-admin';
import { CustomEmpty } from "./Filters";
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';

const ProductDetail = () => {
    const record = useRecordContext()
    const DataProvider = useDataProvider()
    // const color = DataProvider.
    return (
        <>
            <CustomRefArrayField label="Colors" source="colors" reference="color" />
            <CustomRefArrayField label="Categories" source="cateIds" reference="category" />
            <CustomRefArrayField label="Rooms" source="roomIds" reference="room" />
        </>
    )
}

const CustomRefArrayField = (props: ReferenceArrayFieldProps) => (
    <ReferenceArrayField
        sx={{
            minWidth: "200px",
            maxWidth: "500px",
            ".MuiChip-label::first-letter": {
                textTransform: "capitalize"
            },
        }}
        {...props}
    >
        <SingleFieldList>
            <ChipField source="label" />
        </SingleFieldList>
    </ReferenceArrayField>
)

export const ProductList = () => (
    <List>
        <Datagrid
            empty={<CustomEmpty />}
            expand={<ProductDetail />}
        >
            <TextField source="id" minWidth={300} />
            <TextField source="name" />
            <NumberField source="available" textAlign='center' />
            {/* <TextField source="description" /> */}
            {/* <CustomRefArrayField label="Colors" source="colors" reference="color" />
            <CustomRefArrayField label="Categories" source="cateIds" reference="category" />
            <CustomRefArrayField label="Rooms" source="roomIds" reference="room" /> */}

            {/* <TextField source="colors" /> */}
            <NumberField source="price" options={{ style: 'currency', currency: 'VND' }} />
            {/* <ReferenceField source="creatorId" reference="Creator" /> */}
            <NumberField label="Product rating" source="avgRating" textAlign='center' />
            <NumberField label="Rated users" source="totalRating" textAlign='center' />
            <NumberField source="totalSale" />
            <DateField source="createdDate" showDate showTime />
            <DateField source="updatedAt" showDate showTime />
            {/* <TextField source="updatedDate" /> */}
            <div>
                <EditButton sx={{ maxWidth: "min-content" }} />
                <DeleteButton sx={{ maxWidth: "min-content" }} />
            </div>
        </Datagrid>
    </List>
)

// const EditSchema = Yup.object()
// export const ProductEdit = () => (
//     <Edit
//         title={'Create new product'}
//         sx={{ maxWidth: "400px" }}
//     >
//         <SimpleForm
//         // resolver={yupResolver(EditSchema)}
//         >
//             <TextInput disabled label="Id" source="id" />
//             <TextInput label="Product name" source="name" />
//         </SimpleForm>
//     </Edit>
// )