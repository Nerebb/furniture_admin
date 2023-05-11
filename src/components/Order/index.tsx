import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import OrderList from './OrderList';
import OrderCreate from './OrderCreate';
import { BooleanInput, DateInput, NumberInput, SelectInput, TextInput } from 'react-admin';
import { Status } from '@prisma/client';
import OrderEdit from './OrderEdit';

const OrderStatus = ['completed', 'orderCanceled', 'pendingPayment', 'processingOrder', 'shipping'] satisfies Status[]
export const orderStatusCheckboxes = OrderStatus.map(i => ({ id: i, label: i }))


export const orderFilters = [
    <TextInput key={`filter-id`} label="Filter by id" source="id" alwaysOn />,
    <TextInput key={`filter-OwnerId`} label="Filter by OwnerId" source="ownerId" alwaysOn />,
    <SelectInput key={`filter-status`} label='Order status' source='status' choices={orderStatusCheckboxes} optionText='label' alwaysOn />,
    <NumberInput key={`filter-ShippingFee`} label="Shipping fee" source='shippingFee' options={{ style: 'currency', currency: 'VND' }} />,
    <NumberInput key={`filter-SubTotal`} label="Subtotal" source='subTotal' options={{ style: 'currency', currency: 'VND' }} />,
    <NumberInput key={`filter-Total`} label="Total" source='total' options={{ style: 'currency', currency: 'VND' }} />,
    <DateInput key={`filter-createdDate`} label="Filter by created date" source="createdDate" />,
    <DateInput key={`filter-updatedDate`} label="Filter by updated date" source="updatedAt" />,
];

const resource = {
    list: OrderList,
    create: OrderCreate,
    edit: OrderEdit,
    icon: ListAltOutlinedIcon,
};

export default resource;
