import { useMediaQuery, Card, CardContent, Theme } from '@mui/material'
import { Title, useGetList } from 'react-admin'
import MonthlyRevenue from './MonthlyRevenue'
import { useMemo, CSSProperties } from 'react';
import { ResponseOrder } from '../../../@type';
import Welcome from './Welcome';
import NbNewOrders from './HighestOrder';
import NewCustomers from './NewCustomers';
import OrderChart from './OrderChart';
import PendingOrders from './PendingOrders';
import PendingReviews from './PendingReviews';
import HighestOrder from './HighestOrder';

interface OrderStats {
    revenue: number;
    highestOrder: { id: string, total: number };
    pendingOrders: ResponseOrder[];
}

interface State {
    highestOrder?: { id: string, total: number };
    pendingOrders?: ResponseOrder[];
    recentOrders?: ResponseOrder[];
    revenue?: string;
}

const styles = {
    flex: { display: 'flex' },
    flexColumn: { display: 'flex', flexDirection: 'column' },
    leftCol: { flex: 1, marginRight: '0.5em' },
    rightCol: { flex: 1, marginLeft: '0.5em' },
    singleCol: { marginTop: '1em', marginBottom: '1em' },
};

const Spacer = () => <span style={{ width: '1em' }} />;
const VerticalSpacer = () => <span style={{ height: '1em' }} />;

export default function Dashboard() {
    const { data: orders } = useGetList<ResponseOrder>('order')

    const isXSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('sm')
    );
    const isSmall = useMediaQuery((theme: Theme) =>
        theme.breakpoints.down('lg'))

    const aggregation = useMemo<State>(() => {
        if (!orders) return {};
        const aggregations = orders
            .filter(order => order.status !== 'orderCanceled')
            .reduce(
                (stats: OrderStats, order) => {
                    if (order.status !== 'orderCanceled') {
                        stats.revenue += Number(order.total);
                    }
                    if (order.status !== 'completed') {
                        stats.pendingOrders.push(order);
                    }
                    if (Number(order.total) > stats.highestOrder.total) {
                        stats.highestOrder = { id: order.id, total: Number(order.total) }
                    }
                    return stats;
                },
                {
                    revenue: 0,
                    highestOrder: { id: '', total: 0 },
                    pendingOrders: [],
                }
            );
        return {
            recentOrders: orders,
            revenue: aggregations.revenue.toLocaleString(undefined, {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
            }),
            highestOrder: aggregations.highestOrder,
            pendingOrders: aggregations.pendingOrders,
        };
    }, [orders]);

    const { highestOrder, pendingOrders, revenue, recentOrders } = aggregation;


    return isXSmall ? (
        <div>
            <div style={styles.flexColumn as CSSProperties}>
                <Welcome />
                <MonthlyRevenue value={revenue} />
                <VerticalSpacer />
                <HighestOrder value={highestOrder} />
                <VerticalSpacer />
                <PendingOrders orders={pendingOrders} />
            </div>
        </div>
    ) : isSmall ? (
        <div style={styles.flexColumn as CSSProperties}>
            <div style={styles.singleCol}>
                <Welcome />
            </div>
            <div style={styles.flex}>
                <MonthlyRevenue value={revenue} />
                <Spacer />
                <HighestOrder value={highestOrder} />
            </div>
            <div style={styles.singleCol}>
                <OrderChart orders={recentOrders} />
            </div>
            <div style={styles.singleCol}>
                <PendingOrders orders={pendingOrders} />
            </div>
        </div>
    ) : (
        <>
            <Welcome />
            <div style={styles.flex}>
                <div style={styles.leftCol}>
                    <div style={styles.flex}>
                        <MonthlyRevenue value={revenue} />
                        <Spacer />
                        <HighestOrder value={highestOrder} />
                    </div>
                    <div style={styles.singleCol}>
                        <OrderChart orders={recentOrders} />
                    </div>
                    <div style={styles.singleCol}>
                        <PendingOrders orders={pendingOrders} />
                    </div>
                </div>
                <div style={styles.rightCol}>
                    <div style={styles.flex}>
                        <PendingReviews />
                        <Spacer />
                        <NewCustomers />
                    </div>
                </div>
            </div>
        </>
    );
}