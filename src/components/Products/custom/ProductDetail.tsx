import { Card, CardContent, Grid, Rating, Stack, Typography } from '@mui/material';
import { DeleteButton, EditButton, TopToolbar, useRecordContext } from 'react-admin';
import { ProductCard } from '../../../../@type';
import RefColor from './RefColor';
import RefArrayField from './RefArrayField';

const ProductDetail = () => {
    const record = useRecordContext<ProductCard>()

    return (
        <Card sx={{ maxWidth: 800, margin: 'auto' }}>
            <CardContent>
                <Stack gap={1}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            {/* BasicInfo */}
                            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                {record.id}
                            </Typography>
                            <Typography variant="h5" component="div" sx={{ ":first-letter": { textTransform: 'capitalize' } }}>
                                {record.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} />
                        <Grid item xs={4}>
                            {/* Rating */}
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Typography sx={{ fontWeight: "bold" }}>Rating:</Typography>
                                <Stack direction='row'>
                                    <Rating value={record.avgRating} readOnly />
                                    <Typography>{`(${record.totalRating})`}</Typography>
                                </Stack>
                            </Stack>

                            {/* Comments */}
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Typography sx={{ fontWeight: "bold" }}>Total comments: </Typography>
                                <Typography>{record.totalComments || 0}</Typography>
                            </Stack>

                            {/* Ordered */}
                            <Stack direction='row' justifyContent='space-between' alignItems='center'>
                                <Typography sx={{ fontWeight: "bold" }}>Total ordered: </Typography>
                                <Typography>{record.totalSale}</Typography>
                            </Stack>
                        </Grid>
                    </Grid>

                    {/* Reference table */}
                    <Grid container gap={1}>
                        {/* Color */}
                        <Grid item xs={12}><RefColor source='color' params={{ ids: record.colors }} /></Grid>

                        {/* Rooms */}
                        <Grid item xs={12} container alignItems={'center'}>
                            <Grid item xs={1}><Typography>Rooms :</Typography></Grid>
                            <Grid item ><RefArrayField source="roomIds" reference="room" /></Grid>
                        </Grid>

                        {/* Categories */}
                        <Grid item xs={12} container alignItems={'start'}>
                            <Typography>Categories :</Typography>
                            <RefArrayField source="cateIds" reference="category" />
                        </Grid>
                    </Grid>

                    <Typography variant="body2">
                        {record.description}
                    </Typography>

                    {/* Actions */}
                    <TopToolbar>
                        <EditButton />
                        <DeleteButton />
                    </TopToolbar>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default ProductDetail