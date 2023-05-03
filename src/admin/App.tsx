import { FilterCreate, FilterEdit, FilterList } from "@/components/Filters";
import Login from "@/components/Login";
import { OrderList } from "@/components/Order";
import OrderCreate from "@/components/OrderCreate";
import { ProductCreate, ProductEdit, ProductList } from "@/components/Products";
import { ReviewCreate, ReviewEdit, ReviewList } from "@/components/Reviews";
import { UserCreate, UserEdit, UserList } from "@/components/User";
import { DataProvider } from "@/providers";
import { authProvider } from "@/providers/authProvider";
import { Admin, EditGuesser, ListGuesser, Resource } from 'react-admin';


// const dataProvider = FilterProvider
const FilterTables = ['color', 'category', 'room']
const App = () => (
    <Admin
        loginPage={<Login />}
        dataProvider={DataProvider}
        authProvider={authProvider}
    >
        {FilterTables.map(table => (
            <Resource
                key={`${table}`}
                name={table}
                list={FilterList}
                create={FilterCreate}
                edit={FilterEdit}
            />
        ))}
        <Resource
            name="products"
            list={ProductList}
            edit={ProductEdit}
            create={ProductCreate}
        />
        <Resource
            name="user"
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
        />
        <Resource
            name="review"
            list={ReviewList}
            create={ReviewCreate}
            edit={ReviewEdit}
        />
        <Resource
            name="order"
            list={OrderList}
            create={OrderCreate}
        />
    </Admin>
);

export default App;