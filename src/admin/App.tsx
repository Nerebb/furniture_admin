import { FilterCreate, FilterEdit, FilterList } from "@/components/Filters";
import { ProductList } from "@/components/Products";
import { DataProvider } from "@/providers";
import FilterProvider from "@/providers/filterProvider";
import { Admin, ListGuesser, Resource } from 'react-admin';


// const dataProvider = FilterProvider
const FilterTables = ['color', 'category', 'room']
const App = () => (
    <Admin
        dataProvider={DataProvider}
    >
        {
            FilterTables.map(table => (
                <Resource
                    key={`${table}`}
                    name={table}
                    list={FilterList}
                    create={FilterCreate}
                    edit={FilterEdit}
                />
            ))
        }
        <Resource name="products" list={ProductList} />
    </Admin>
);

export default App;