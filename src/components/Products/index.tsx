import ChairOutlinedIcon from '@mui/icons-material/ChairOutlined';
import ProductList from './ProductList';
import ProductCreate from './ProductCreate';
import ProductEdit from './ProductEdit';
import { BooleanInput, TextInput } from 'react-admin';

export const selectArrayRef = [
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

export const productFilters = [
    <BooleanInput key={`filter-featured`} label="Featured product" source="isFeatureProduct" alwaysOn defaultValue={false} />,
    <TextInput key={`filter-name`} label="Filter by name" source="name" alwaysOn />,
    <TextInput key={`filter-rating`} label="Filter by rating" source="avgRating" alwaysOn />,
];

const resource = {
    list: ProductList,
    create: ProductCreate,
    edit: ProductEdit,
    icon: ChairOutlinedIcon,
};

export default resource;
