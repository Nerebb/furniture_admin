import React from 'react'
import { Avatar, Box, Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { Button, DateField, DeleteButton, Edit, EditBase, EditButton, NumberField, NumberInput, RadioButtonGroupInput, ReferenceField, SelectInput, SimpleForm, TextField, TextInput, TopToolbar, required, useEditContext, useGetOne, useRecordContext } from 'react-admin';
import { ResponseOrder } from '../../../../@type';
import { User } from '@prisma/client';
import OrderedProducts from '../custom/OrderedProducts';
import { useRouter } from 'next/router';
import OrderedProductTable from '../custom/OrderedProductTable';
import BasicInfo from './BasicInfo';
import OrderedItem from './OrderedItem';
import { OrderEditActions } from './OrderEditActions';
import { orderStatusCheckboxes } from '..';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { UpdateOrderSchemaValidate } from '@/utils/schemaValidate';

type Props = {}

export default function OrderEdit({ }: Props) {

    return (
        <Edit
            sx={{
                maxWidth: 800,
                marginX: 'auto'
            }}
        >
            <SimpleForm
                resolver={yupResolver(Yup.object(UpdateOrderSchemaValidate))}
            >
                <Stack gap={1}>
                    {/* UserInfo */}
                    <BasicInfo />

                    {/* Extra info */}
                    <RadioButtonGroupInput
                        source="status"
                        choices={orderStatusCheckboxes}
                        optionText='label'
                        required={true}
                        sx={{
                            "#status": {
                                "label": {
                                    "span:last-child": { ':first-letter': { textTransform: "capitalize" } }
                                }
                            }
                        }}
                    />
                    <Stack direction={'row'} gap={1}>
                        <NumberInput source="shippingFee" options={{ style: 'currency', currency: 'VND' }} min={0} />
                        <NumberInput source="subTotal" options={{ style: 'currency', currency: 'VND' }} min={0} />
                        <NumberInput source="total" options={{ style: 'currency', currency: 'VND' }} min={0} />
                    </Stack>

                    {/* OrderTable */}
                    <OrderedItem />
                </Stack>
            </SimpleForm>
        </Edit>
    )
}