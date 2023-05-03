import { CreateColorSchemaValidate, CreateFilterSchemaValidate } from "@/utils/schemaValidate";
import { yupResolver } from "@hookform/resolvers/yup";
import { Edit, SimpleForm, TextInput, useResourceContext } from "react-admin";
import * as Yup from 'yup'

const ColorSchema = Yup.object().shape(CreateColorSchemaValidate).required()
const FilterSchema = Yup.object().shape(CreateFilterSchemaValidate).required()
const FilterEdit = () => {
    const resource = useResourceContext();
    console.log("🚀 ~ file: Filters.tsx:49 ~ FilterEdit ~ resource:", resource)
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

export default FilterEdit