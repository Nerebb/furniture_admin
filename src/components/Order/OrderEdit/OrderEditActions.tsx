import * as React from "react";
import Button from '@mui/material/Button';
import { TopToolbar, ListButton, ShowButton, Edit } from 'react-admin';

function customAction() {

}

export const OrderEditActions = () => (
    <TopToolbar>
        <ShowButton />
        {/* Add your custom actions */}
        <ListButton />
        <Button color="primary" onClick={customAction}>Custom Action</Button>
    </TopToolbar>
);