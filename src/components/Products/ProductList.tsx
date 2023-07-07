import { Box, Rating } from '@mui/material';
import { DatagridConfigurable, DateField, DeleteButton, EditButton, FieldProps, List, NumberField, TextField, useRecordContext } from 'react-admin';
import { productFilters } from '.';
import ListActions from '../customs/ListActions';
import ProductDetail from './custom/ProductDetail';
import { ProductCard, ResponseReview } from '../../../@type';
import ProductRating from './custom/ProductRating';
import PendingChip from '../Previews/customs/PendingChip';

const ProductList = () => (
    <List
        filters={productFilters}
        actions={<ListActions isFilter isCreate />}
    >
        <DatagridConfigurable
            expand={<ProductDetail />}
            omit={['id']}
            rowClick='expand'
        >
            <TextField source="id" minWidth={300} />
            <TextField source="name" />
            <NumberField source="available" textAlign='center' />
            <NumberField source="price" options={{ style: 'currency', currency: 'VND' }} />
            {/* <NumberField label="Product rating" source="avgRating" textAlign='center' /> */}
            <ProductRating />
            <PendingChip />
            <NumberField label="Rated users" source="totalRating" textAlign='center' />
            <NumberField source="totalSale" textAlign='center' />
            <DateField source="createdDate" showDate textAlign='center' />
            <DateField source="updatedAt" showDate textAlign='center' />
            <Box>
                <EditButton />
                <DeleteButton />
            </Box>
        </DatagridConfigurable>
    </List>
)

export default ProductList