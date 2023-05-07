import * as React from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from 'recharts';
import { useTranslate } from 'react-admin';
import { subDays, addDays } from 'date-fns';
import { ResponseOrder } from '../../../@type';
import dateFormat from '@/utils/dateFormat';
import { fCurrency } from '@/utils/numberal';


const lastDay = new Date();
const lastMonthDays = Array.from({ length: 30 }, (_, i) => subDays(lastDay, i));
const aMonthAgo = subDays(new Date(), 30);

const dateFormatter = (date: number): string =>
    new Date(date).toLocaleDateString();

const aggregateOrdersByDay = (orders: ResponseOrder[]): { [key: string]: number } =>
    orders
        .filter((order: ResponseOrder) => order.status !== 'orderCanceled')
        .reduce((acc, curr) => {
            const day = dateFormat(curr.createdDate);
            if (!acc[day]) {
                acc[day] = 0;
            }
            acc[day] += Number(curr.total);
            return acc;
        }, {} as { [key: string]: number });

const getRevenuePerDay = (orders: ResponseOrder[]): TotalByDay[] => {
    const daysWithRevenue = aggregateOrdersByDay(orders);
    return lastMonthDays.map(date => ({
        date: date.getTime(),
        total: daysWithRevenue[dateFormat(date)] || 0,
    }));
};

const OrderChart = (props: { orders?: ResponseOrder[] }) => {
    const { orders } = props;
    const translate = useTranslate();
    if (!orders) return null;

    return (
        <Card>
            <CardHeader title={'Monthly income'} />
            <CardContent>
                <div style={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                        <AreaChart data={getRevenuePerDay(orders)}>
                            <defs>
                                <linearGradient
                                    id="colorUv"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="5%"
                                        stopColor="#8884d8"
                                        stopOpacity={0.8}
                                    />
                                    <stop
                                        offset="95%"
                                        stopColor="#8884d8"
                                        stopOpacity={0}
                                    />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="date"
                                name="Date"
                                type="number"
                                scale="time"
                                domain={[
                                    addDays(aMonthAgo, 1).getTime(),
                                    new Date().getTime(),
                                ]}
                                tickFormatter={dateFormatter}
                            />
                            <YAxis dataKey="total" name="Revenue" unit="đ" />
                            <CartesianGrid strokeDasharray="3 3" />
                            <Tooltip
                                cursor={{ strokeDasharray: '3 3' }}
                                formatter={(value: any) => fCurrency(value)}
                                labelFormatter={(label: any) =>
                                    dateFormatter(label)
                                }
                            />
                            <Area
                                type="monotone"
                                dataKey="total"
                                stroke="#8884d8"
                                strokeWidth={2}
                                fill="url(#colorUv)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

interface TotalByDay {
    date: number;
    total: number;
}

export default OrderChart;
