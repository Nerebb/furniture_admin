import { Datagrid, DeleteButton, EditButton, List, TextField, TextInput } from "react-admin";
import EmptyRecord from "../customs/EmptyRecord";
import ListActions from "../customs/ListActions";

const filters = [
    <TextInput key={`filters-1`} source="id" alwaysOn />,
    <TextInput key={`filters-2`} source="label" alwaysOn />,
]

const FilterList = () => (
    <List
        filters={filters}
        actions={<ListActions isFilter isCreate />}
    >
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

export default FilterList