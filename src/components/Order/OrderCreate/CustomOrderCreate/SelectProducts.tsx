import { useCreateOrderContext } from '@/context/CreateOrderProvider'
import { AddProductToNewOrderSchemaValidate } from '@/utils/schemaValidate'
import { Autocomplete, Button, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import { useMemo, useState } from 'react'
import { GetListParams, useGetList } from 'react-admin'
import * as Yup from 'yup'
import { NewOrderItem, ProductCard } from '../../../../../@type'
import CusSelectInput from './CustomMUI/CusSelectInput'

type Props = {}

export default function SelectProducts({ }: Props) {
    const [ProductOptions, setProductOptions] = useState<ProductCard['name'][]>([])
    const [ProductParams, setProductParams] = useState<Partial<GetListParams>>({
        filter: { name: undefined },
        pagination: { page: 1, perPage: 10 }
    })
    const [error, setError] = useState<string | undefined>(undefined)
    const ProductList = useGetList<ProductCard>(
        'products',
        ProductParams,
        {
            onSuccess: (res) => setProductOptions(res.data.map(i => i.name))
        }
    )
    const [selectedProduct, setSelectedProduct] = useState<Partial<NewOrderItem>>()

    const { newOrder, setNewOrder } = useCreateOrderContext()

    const selectedProductInfo = useMemo(() => {
        if (!selectedProduct?.productId
            || !ProductList.data
            || !ProductList.data.length
        ) return

        const selectProduct = ProductList.data.find(i => i.id === selectedProduct.productId)
        if (selectProduct) setSelectedProduct(prev => ({ ...prev, name: selectProduct.name, salePrice: selectProduct.price }))
        return selectProduct
    }, [selectedProduct?.productId, ProductList.data])

    function handleChooseProduct() {
        try {
            const schema = Yup.object(AddProductToNewOrderSchemaValidate)
            const validated = schema.validateSync(selectedProduct)

            if (newOrder.products) {
                const checkProduct = newOrder.products.find(product => (product.productId === validated.productId && product.color === validated.color))
                if (checkProduct) throw new Error("Product already in cart")
                setError(undefined)
                return setNewOrder({ products: [...newOrder.products, validated] })
            }

            setError(undefined)
            return setNewOrder({ products: [validated] })
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <Stack

        >
            {/* Products */}
            <Stack
                // direction='row'
                gap={2}
            >
                <Autocomplete
                    disablePortal
                    onChange={(event, newValue) => {
                        if (newValue) {
                            const selected = ProductList.data?.find(i => i.name === newValue)
                            if (!selected) return setSelectedProduct(undefined)
                            return setSelectedProduct({ productId: selected.id })
                        }
                    }}
                    onInputChange={(event, newInputValue) => {
                        setProductParams({ ...ProductParams, filter: newInputValue })
                        setSelectedProduct(undefined)
                    }}
                    options={ProductOptions}
                    sx={{ minWidth: 300, maxWidth: 450, flexGrow: 2 }}
                    renderInput={(params) => <TextField {...params} label="Select product" variant='outlined' />}
                />
                {selectedProductInfo && (
                    <Stack
                        direction='row'
                        gap={1}
                        sx={{ flexGrow: 1 }}
                    >
                        {/* Color */}
                        <CusSelectInput
                            choices={selectedProductInfo?.colors.map(i => ({ id: i, label: i }))}
                            inputLabel='Product colors'
                            onChange={(e: SelectChangeEvent) => setSelectedProduct({ ...selectedProduct, color: e.target.value })}
                            sx={{ flexGrow: 1 }}
                        />

                        <TextField
                            type="number"
                            inputMode='numeric'
                            label="Sale price"
                            variant="outlined"
                            defaultValue={selectedProduct?.salePrice}
                            onChange={(e) => setSelectedProduct({ ...selectedProduct, salePrice: Number(e.target.value) })}
                            sx={{ flexGrow: 1 }}
                        />

                        {/* Quantities */}
                        <TextField
                            type="number"
                            inputMode='numeric'
                            label="Quantities"
                            variant="outlined"
                            onChange={(e) => setSelectedProduct({ ...selectedProduct, quantities: Number(e.target.value) })}
                            sx={{ flexGrow: 1 }}
                        />
                    </Stack>
                )}
            </Stack>
            {error && <Typography sx={{ color: "#FD8A8A" }}>{error}</Typography>}
            {selectedProduct && <Button onClick={handleChooseProduct}>Add product</Button>}
        </Stack>
    )
}