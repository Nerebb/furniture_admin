import FilterIcon from '@mui/icons-material/People';

import FilterList from './FilterList';
import FilterCreate from './FilterCreate';
import FilterEdit from './FilterEdit';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import ClassOutlinedIcon from '@mui/icons-material/ClassOutlined';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';

const defaultProvider = {
    list: FilterList,
    create: FilterCreate,
    edit: FilterEdit,
    // icon: FilterIcon,
};

const Filters = [
    {
        name: 'color',
        resource: {
            ...defaultProvider,
            icon: ColorLensOutlinedIcon,
        },
    },
    {
        name: 'category',
        resource: {
            ...defaultProvider,
            icon: ClassOutlinedIcon,
        },
    },
    {
        name: 'room',
        resource: {
            ...defaultProvider,
            icon: MeetingRoomOutlinedIcon,
        },
    },
]

export default Filters;
