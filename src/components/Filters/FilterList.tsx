import { Datagrid, DeleteButton, EditButton, List, TextField } from "react-admin";
import EmptyRecord from "../customs/EmptyRecord";
const FilterList = () => (
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

export default FilterList