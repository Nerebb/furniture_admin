import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import CardWithIcon from './CardWithIcon';
import { fCurrency } from '@/utils/numberal';

interface Props {
    value?: { id: string, total: number };
}

const HighestOrder = (props: Props) => {
    const { value } = props;
    return (
        <CardWithIcon
            to={`/order/${value?.id}`}
            icon={ShoppingCartIcon}
            title={'Highest order of the month'}
            subtitle={fCurrency(value?.total || 0)}
        />
    );
};

export default HighestOrder;
