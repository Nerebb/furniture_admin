import Filters from '@/components/Filters';
import Login from "@/components/Login";
import Products from '@/components/Products';
import Order from '@/components/Order';
import Reviews from '@/components/Previews';
import { UserCreate, UserEdit, UserList } from "@/components/User";
import { DataProvider } from "@/providers";
import { authProvider } from "@/providers/authProvider";
import { Admin, Resource } from 'react-admin';


// const dataProvider = FilterProvider

const App = () => (
    <Admin
        loginPage={<Login />}
        dataProvider={DataProvider}
        authProvider={authProvider}
    >
        {Filters.map(table => (
            <Resource
                key={`${table.name}`}
                name={table.name}
                {...table.resource}
            />
        ))}
        <Resource
            name="products"
            {...Products}
        />
        <Resource
            name="user"
            list={UserList}
            edit={UserEdit}
            create={UserCreate}
        />
        <Resource
            name="review"
            {...Reviews}
        />
        <Resource
            name="order"
            {...Order}
        />
    </Admin>
);

export default App;