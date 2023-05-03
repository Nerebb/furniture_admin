import { UserCreateSchemaValidate } from "@/utils/schemaValidate"
import { yupResolver } from "@hookform/resolvers/yup"
import { Stack, Typography } from "@mui/material"
import { BooleanInput, Create, DateInput, NumberInput, SelectInput, SimpleForm, TextField, TextInput, required } from "react-admin"
import * as Yup from 'yup'
import { genderCheckboxes, roleCheckboxes } from "."
const UserCreate = () => {
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

export default UserCreate