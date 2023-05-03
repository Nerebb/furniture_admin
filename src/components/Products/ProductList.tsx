import { Box } from '@mui/material';
import { BooleanInput, Datagrid, DateField, DeleteButton, EditButton, List, NumberField, TextField, TextInput } from 'react-admin';
import ListActions from '../customs/ListActions';
import ProductDetail from './custom/ProductDetail';
import { productFilters } from '.';



const ProductList = () => (
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

export default ProductList