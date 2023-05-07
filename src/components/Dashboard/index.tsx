import { useMediaQuery, Card, CardContent, Theme } from '@mui/material'
import { Title, useGetList } from 'react-admin'
import MonthlyRevenue from './MonthlyRevenue'
import { useMemo, CSSProperties } from 'react';
import { ResponseOrder } from '../../../@type';
import Welcome from './Welcome';
import NbNewOrders from './NbNewOrders';
import NewCustomers from './NewCustomers';
import OrderChart from './OrderChart';
import PendingOrders from './PendingOrders';
import PendingReviews from './PendingReviews';

interface OrderStats {
    revenue: number;
    nbNewOrders: number;
    pendingOrders: ResponseOrder[];
}

interface State {
    nbNewOrders?: number;
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
                        stats.nbNewOrders++;
                    }
                    if (order.status === 'completed') {
                        stats.pendingOrders.push(order);
                    }
                    return stats;
                },
                {
                    revenue: 0,
                    nbNewOrders: 0,
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
            nbNewOrders: aggregations.nbNewOrders,
            pendingOrders: aggregations.pendingOrders,
        };
    }, [orders]);

    const { nbNewOrders, pendingOrders, revenue, recentOrders } = aggregation;


    // return isXSmall ? (
    //     <div>
    //         <div style={styles.flexColumn as CSSProperties}>
    //             <Welcome />
    //             <MonthlyRevenue value={revenue} />
    //             <VerticalSpacer />
    //             <NbNewOrders value={nbNewOrders} />
    //             <VerticalSpacer />
    //             <PendingOrders orders={pendingOrders} />
    //         </div>
    //     </div>
    // ) : isSmall ? (
    //     <div style={styles.flexColumn as CSSProperties}>
    //         <div style={styles.singleCol}>
    //             <Welcome />
    //         </div>
    //         <div style={styles.flex}>
    //             <MonthlyRevenue value={revenue} />
    //             <Spacer />
    //             <NbNewOrders value={nbNewOrders} />
    //         </div>
    //         <div style={styles.singleCol}>
    //             <OrderChart orders={recentOrders} />
    //         </div>
    //         <div style={styles.singleCol}>
    //             <PendingOrders orders={pendingOrders} />
    //         </div>
    //     </div>
    // ) : 
    return (
        <>
            <Welcome />
            <div style={styles.flex}>
                <div style={styles.leftCol}>
                    <div style={styles.flex}>
                        <MonthlyRevenue value={revenue} />
                        <Spacer />
                        <NbNewOrders value={nbNewOrders} />
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