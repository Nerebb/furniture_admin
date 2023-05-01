import { CreateFilterSchemaValidate } from "@/utils/schemaValidate";
import * as React from "react";
import { List, Datagrid, TextField, EditButton, DeleteButton, Edit, SimpleForm, TextInput, Create, ValidateForm, Error, Title, useResourceContext } from 'react-admin';
import * as Yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup';
import EmptyRecord from "./customs/EmptyRecord";


export const FilterList = () => (
    <List>
        <Datagrid
            empty={<EmptyRecord />}
            sx={{
                ".column-label": { width: "60%" }
            }}
        >
            <TextField source="id" />
            <TextField source="label" />
            <div className="space-x-5 whitespace-nowrap">
                <EditButton sx={{ maxWidth: "100px" }} />
                <DeleteButton sx={{ maxWidth: '100px' }} />
            </div>
        </Datagrid>
    </List>
)

const ColorSchema = Yup.object().shape({ ...CreateFilterSchemaValidate }).required()
const FilterSchema = Yup.object().shape(CreateFilterSchemaValidate).required()
export const FilterCreate = () => {
    const resource = useResourceContext();
    const schema = resource === 'color' ? ColorSchema : FilterSchema
    return (
        <Create
            title={'Create new'}
            sx={{ maxWidth: "400px" }}
        >
            <SimpleForm
                resolver={yupResolver(schema)}
            >
                <TextInput label="Id" source="id" sx={{ width: "100%" }} />
                <TextInput label="Label name" source="label" sx={{ width: "100%" }} />
            </SimpleForm>
        </Create>
    )
}

export const FilterEdit = () => {
    const resource = useResourceContext();
    const schema = resource === 'color' ? ColorSchema : FilterSchema

    return (
        <Edit
            title={'Create new'}
            sx={{
                maxWidth: "400px",
                margin: "auto"
            }}
        >
            <SimpleForm
                resolver={yupResolver(schema)}
            >
                <TextInput disabled label="Id" source="id" />
                <TextInput label="Color name" source="label" />
            </SimpleForm>
        </Edit>
    )
}