import {
    Autocomplete,
    Button,
    CircularProgress,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
    Typography
} from '@mui/material';
import { AutocompleteInput, GetListParams, Link, NumberInput, useGetList, useGetMany, useGetOne, useRecordContext } from 'react-admin';

import { fCurrency } from '@/utils/numberal';
import { JsonColor, NewOrderItem, ProductCard, ResponseOrder } from '../../../@type';
import EmptyRecord from './EmptyRecord';
import { Product } from '@prisma/client';
import { Dispatch, Fragment, SetStateAction, useState } from 'react';
import { CreateOrder } from '../Order';

type Props = {
    newItems: NewOrderItem[]
    setNewItems: Dispatch<Partial<CreateOrder>>
}
const CreateOrderProducts = ({ newItems, setNewItems }: Props) => {
    const [test, setTest] = useState<string | undefined>("")
    const [searchParams, setSearchParams] = useState<Partial<GetListParams>>({ filter: { name: "" }, pagination: { page: 1, perPage: 10 } })
    const { data: ProductList, isLoading } = useGetList<ProductCard>('products', searchParams)
    if (!ProductList) return <>EMPTYLIST</>
    return (
        <>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Product name</TableCell>
                        <TableCell align='center'>Color</TableCell>
                        <TableCell align='center'>Quantities</TableCell>
                        <TableCell align='right'>Unit price</TableCell>
                        <TableCell align='right'>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {[
                        {
                            productId: test,
                            color: '',
                            quantities: 1,
                        }].map(row => (
                            <Fragment key={row.productId}>
                                <TableRow>
                                    <TableCell padding="none">
                                        <Autocomplete
                                            options={ProductList.map(i => i.name)}
                                            value={test}
                                            onChange={(e, v) => { setTest(ProductList.find(i => i.name === v)!.id) }}
                                            renderInput={(params) => (
                                                <TextField
                                                    {...params}
                                                    label="Product ID"
                                                    variant='outlined'
                                                    InputProps={{
                                                        ...params.InputProps,
                                                        endAdornment: (
                                                            <Fragment>
                                                                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                                                                {params.InputProps.endAdornment}
                                                            </Fragment>
                                                        ),
                                                    }}
                                                />
                                            )}
                                        />
                                    </TableCell>
                                    <CusTableRow productId={row.productId} />
                                </TableRow>
                            </Fragment>
                        ))}
                </TableBody>
            </Table>
        </>
    );
};



export default CreateOrderProducts;

type TableRowProps = {
    product: ProductCard
} & Props

const CusTableRow = ({ newItems, setNewItems, product }: TableRowProps) => {
    // const [id, setId] = useState<string | undefined>(productId)
    // const [quantities, setQuantities] = useState<number>(0)
    return (
        <>
            <TableCell align='center' padding='none'>
                <Autocomplete
                    options={product.colors}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Product Color"
                            variant='outlined'
                            InputProps={{
                                ...params.InputProps,
                                endAdornment: (
                                    <Fragment>
                                        {params.InputProps.endAdornment}
                                    </Fragment>
                                ),
                            }}
                        />
                    )}
                />
            </TableCell>
            <TableCell align='center' padding="none">
                {/* {props.quantities} */}
                <NumberInput
                    source=''
                    onChange={(e) => setQuantities(e.target.value)}
                />
            </TableCell>
            <TableCell align='right' padding="none">
                <Typography>{fCurrency(item.price)}</Typography>
            </TableCell>
            <TableCell align='right' padding="none">
                <Typography>{fCurrency(item.price * quantities)}</Typography>
                {/* {fCurrency(item.price * props.quantities)} */}
            </TableCell>
        </>
    )
}