import { BooleanField, Datagrid, DateField, DeleteButton, EditButton, EmailField, List, TextField } from "react-admin"
import ListActions from "../customs/ListActions"
import { userFilters } from "."
import UserDetail from "./custom/UserDetail"
import { Box } from '@mui/material'
const UserList = () => {
    return (
        <List
            filters={userFilters}
            actions={<ListActions isFilter />}
        >
            <Datagrid
                expand={<UserDetail />}
                rowClick="expand"
            >
                <TextField source="id" />
                <TextField source="name" />
                <TextField source="nickName" />
                <EmailField source="email" />
                <TextField source="role" />
                <DateField source="createdDate" textAlign="center" />
                <DateField source="updatedAt" textAlign="center" />
                <BooleanField source="userVerified" emptyText="No" looseValue textAlign="center" />
                <BooleanField source="emailVerified" emptyText="No" looseValue textAlign="center" />
                <BooleanField className="asdzxncsndcnsdfsd" source="deleted" emptyText="None" looseValue textAlign="center" />
                <Box>
                    <EditButton />
                    <DeleteButton />
                </Box>
            </Datagrid>
        </List>
    )
}

export default UserList