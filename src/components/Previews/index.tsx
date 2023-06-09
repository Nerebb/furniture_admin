import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { BooleanInput, DateInput, NumberInput, TextInput } from 'react-admin';
import ReviewList from './PreviewList';
import ReviewEdit from './ReviewEdit';

export const ReviewFilters = [
    <BooleanInput key={`ReviewFilter-isPending`} source="isPending" alwaysOn />,
    <TextInput key={`ReviewFilter-id`} label="Filter by id" source="id" alwaysOn />,
    <TextInput key={`ReviewFilter-ownerId`} label="Filter by ownerId" source="ownerId" alwaysOn />,
    <TextInput key={`ReviewFilter-productId`} label="Filter by productId" source="productId" alwaysOn />,
    <NumberInput key={`ReviewFilter-totalLike`} label="Filter by totalLike" source="totalLike" />,
    <NumberInput key={`ReviewFilter-rating`} label="Filter by rating" source="rating" />,
    <DateInput key={`ReviewFilter-createdDate`} label="Filter by createdDate" source="createdDate" />,
    <DateInput key={`ReviewFilter-updatedAt`} label="Filter by updatedAt" source="updatedAt" />,
]

const resource = {
    list: ReviewList,
    edit: ReviewEdit,
    icon: BorderColorOutlinedIcon,
};

export default resource;
