import { CreateOrderProvider } from "@/context/CreateOrderProvider"
import { Card } from '@mui/material'
import CustomOrderCreate from "./CustomOrderCreate"

const OrderCreate = () => {
    return (
        <Card
            sx={{
                minWidth: 800,
                marginX: 'auto',
                padding: 3,
                marginTop: 3,
            }}
        >
            <CreateOrderProvider>
                <CustomOrderCreate />
            </CreateOrderProvider>
        </Card>
    )
}

export default OrderCreate