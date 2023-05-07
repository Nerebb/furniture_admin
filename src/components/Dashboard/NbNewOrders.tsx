import * as React from 'react';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import CardWithIcon from './CardWithIcon';

interface Props {
    value?: number;
}

const NbNewOrders = (props: Props) => {
    const { value } = props;
    return (
        <CardWithIcon
            to="/order"
            icon={ShoppingCartIcon}
            title={'Monthly new orders'}
            subtitle={value}
        />
    );
};

export default NbNewOrders;
