import Filters from '@/components/Filters';
import Login from "@/components/Login";
import Products from '@/components/Products';
import Order from '@/components/Order';
import Previews from '@/components/Previews';
import User from '@/components/User';
import { DataProvider } from "@/providers";
import { authProvider } from "@/providers/authProvider";
import { Admin, Resource } from 'react-admin';
import Dashboard from '@/components/Dashboard';

// const dataProvider = FilterProvider

const AdminPage = () => (
    <Admin
        dashboard={Dashboard}
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
            {...User}
        />
        <Resource
            name="review"
            {...Previews}
        />
        <Resource
            name="order"
            {...Order}
        />
    </Admin>
);

export default AdminPage;