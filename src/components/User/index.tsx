import { Gender, Role, User } from "@prisma/client"
import { DateInput, SelectInput, TextInput } from 'react-admin'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import UserCreate from "./UserCreate";
import UserList from "./UserList";
import UserEdit from "./UserEdit";


const genderOptions = ['male', 'female', 'others'] satisfies Gender[]
const roleOptions = ['admin', 'creator', 'customer', 'shiper'] satisfies Role[]

export const UserVerification = [
    {
        id: 0,
        label: "User verified date",
        reference: "userVerified",
    },
    {
        id: 1,
        label: "Email verified date",
        reference: "emailVerified"
    },
    {
        id: 2,
        label: "Deleted date",
        reference: "deleted",
    }
] satisfies {
    id: number,
    label: string,
    reference: keyof User
}[]
export const genderCheckboxes = genderOptions.map(i => ({ id: i, label: i }))
export const roleCheckboxes = roleOptions.map(i => ({ id: i, label: i }))
export const userFilters = [
    <TextInput key={`userFilter-1`} label="Filter by Id" source="id" alwaysOn />,
    <TextInput key={`userFilter-2`} label="Filter by name" source="name" alwaysOn />,
    <TextInput key={`userFilter-3`} label="Filter by Nickname" source="nickName" />,
    <TextInput key={`userFilter-4`} label="Filter by email" source="email" type='email' />,
    <SelectInput key={`userFilter-5`} label="Filter by Role" source="role" choices={roleCheckboxes} optionText='label' />,
    <SelectInput key={`userFilter-6`} label="Filter by Gender" source="gender" choices={genderCheckboxes} optionText='label' />,
    <DateInput key={`userFilter-7`} label="Filter by Createdate" source="createdDate" />,
    <DateInput key={`userFilter-8`} label="Filter by UpdatedAt" source="updatedAt" />,
    <DateInput key={`userFilter-9`} label="Filter by Verified user" source="userVerified" />,
    <DateInput key={`userFilter-10`} label="Filter by Verified email" source="emailVerified" />,
    <DateInput key={`userFilter-11`} label="Filter by deleted user" source="deleted" />,
]
const resource = {
    create: UserCreate,
    list: UserList,
    edit: UserEdit,
    icon: PersonOutlineOutlinedIcon,
}

export default resource