import { CreateColorSchemaValidate, CreateFilterSchemaValidate } from "@/utils/schemaValidate";
import { yupResolver } from "@hookform/resolvers/yup";
import { Create, SimpleForm, TextInput, useResourceContext } from "react-admin";
import * as Yup from 'yup'

const ColorSchema = Yup.object().shape(CreateColorSchemaValidate).required()
const FilterSchema = Yup.object().shape(CreateFilterSchemaValidate).required()
const FilterCreate = () => {
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

export default FilterCreate