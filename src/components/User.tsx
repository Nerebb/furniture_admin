import { Avatar, Box, Card, CardContent, Stack, Typography } from "@mui/material"
import { Gender, Role, User } from "@prisma/client"
import { BooleanField, BooleanInput, CheckboxGroupInput, Create, Datagrid, DateField, DateInput, DeleteButton, Edit, EditButton, EmailField, List, NumberInput, SelectArrayInput, SelectInput, SimpleForm, TextField, TextInput, TopToolbar, required, useEditContext, useNotify, useRecordContext } from "react-admin"
import CreateModal from "./customs/CreateModal"
import { yupResolver } from "@hookform/resolvers/yup"
import * as Yup from 'yup'
import { UserCreateSchemaValidate, UserEditSchemaValidate } from "@/utils/schemaValidate"
import ListActions from "./customs/ListActions"

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

export const genderOptions = ['male', 'female', 'others'] satisfies Gender[]
export const roleOptions = ['admin', 'creator', 'customer', 'shiper'] satisfies Role[]

const genderCheckboxes = genderOptions.map(i => ({ id: i, label: i }))
const roleCheckboxes = roleOptions.map(i => ({ id: i, label: i }))

const UserDetail = () => {
    const record = useRecordContext<User>()
    return (
        <Card
            sx={{ maxWidth: 800, margin: 'auto' }}
        >
            <CardContent>
                <Stack gap={1}>
                    {/* BasicInfo */}
                    <Stack direction='row' justifyContent='space-between' >
                        <Box>
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {record.id}
                            </Typography>
                            <Stack
                                direction='row'
                                gap={1}
                            >
                                {record.image ? (
                                    <Avatar alt={record.name || ""} src={record.image[0]} />
                                ) : (
                                    <Avatar sx={{ width: 30, height: 30, fontSize: 20 }}>{record.name?.substring(0, 1).toUpperCase() || "N"}</Avatar>
                                )}
                                <Typography variant="h5" sx={{ ":first-letter": { textTransform: 'capitalize' } }}>{record.name} ({record.nickName})</Typography>
                            </Stack>
                        </Box>
                        <Box>
                            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                Phone number: {record.phoneNumber}
                            </Typography>
                            <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
                                Birthday:
                                <DateField source="birthDay" fontSize={16} />
                            </Typography>
                        </Box>
                        <Box>
                            {UserVerification.map(i => (
                                <Stack key={`${i.id}`} direction='row' alignItems='center' justifyContent='space-between'>
                                    <Typography>{`${i.label}:`}</Typography>
                                    {record[i.reference] ? (
                                        <DateField source={i.reference} showDate showTime={false} />
                                    ) : (
                                        <BooleanField source={i.reference} looseValue />
                                    )}
                                </Stack>
                            ))}
                        </Box>
                    </Stack>
                    <Typography>Address: {record.address}</Typography>
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

const userFilters = [
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

export const UserList = () => {
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

export const UserEdit = () => {
    return (
        <Edit
            sx={{
                minWidth: "650px",
                margin: "auto"
            }}
        >
            <SimpleForm
                resolver={yupResolver(Yup.object(UserEditSchemaValidate))}
            >
                <Typography variant="h6">Edit User :
                    <TextField variant="h6" source="id" marginLeft={1} />
                </Typography>
                <Stack direction='row' justifyContent='space-between' width={"100%"}>
                    <Stack flexGrow={1} maxWidth={380}>
                        <TextInput label="User name" source="name" sx={{ flexGrow: 1 }} validate={required()} />
                        <TextInput label="User nickname" source="nickName" sx={{ flexGrow: 1 }} />

                        <TextInput type="email" label="User email" source="email" />
                        <TextInput label="User address" source="address" />

                        <DateInput label="User birthday" source="birthDay" />
                        <NumberInput source="phoneNumber" />
                    </Stack>

                    <Stack>
                        <BooleanInput source="userVerified" />
                        <BooleanInput source="emailVerified" />
                        <BooleanInput source="deleted" />
                        <SelectInput
                            source="gender"
                            choices={genderCheckboxes}
                            optionValue="id"
                            optionText='label'
                            validate={required()}
                        />

                        <SelectInput
                            source="role"
                            choices={roleCheckboxes}
                            optionValue="id"
                            optionText='label'
                            validate={required()}
                        />
                    </Stack>
                </Stack>
            </SimpleForm>
        </Edit>
    )
}

export const UserCreate = () => {
    return (
        <Create
            sx={{
                minWidth: "650px",
                margin: "auto"
            }}
        >
            <SimpleForm
                resolver={yupResolver(Yup.object(UserCreateSchemaValidate))}
            >
                <Typography variant="h6">Create New User :
                    <TextField variant="h6" source="id" marginLeft={1} />
                </Typography>
                <Stack direction='row' justifyContent='space-between' width={"100%"}>
                    <Stack flexGrow={1} maxWidth={380}>
                        <TextInput label="Login Id" source="loginId" validate={required()} />
                        <TextInput label="Password" source="password" validate={required()} />
                        <TextInput label="Password confirm" source="confirmPassword" validate={required()} />

                        <TextInput label="User name" source="name" sx={{ flexGrow: 1 }} validate={required()} />
                        <TextInput label="User nickname" source="nickName" sx={{ flexGrow: 1 }} />

                        <TextInput type="email" label="User email" source="email" validate={required()} />
                        <TextInput label="User address" source="address" validate={required()} />

                        <DateInput label="User birthday" source="birthDay" validate={required()} />
                        <NumberInput source="phoneNumber" validate={required()} />
                    </Stack>

                    <Stack>
                        <BooleanInput source="userVerified" />
                        <BooleanInput source="emailVerified" />
                        <BooleanInput source="deleted" />
                        <SelectInput
                            source="gender"
                            choices={genderCheckboxes}
                            optionValue="id"
                            optionText='label'
                            validate={required()}
                        />

                        <SelectInput
                            source="role"
                            choices={roleCheckboxes}
                            optionValue="id"
                            optionText='label'
                            validate={required()}
                        />
                    </Stack>
                </Stack>
            </SimpleForm>
        </Create>
    )
}