import { Head } from '@inertiajs/react';
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Product from './Products/Product';
import CreateProduct from './Products/CreateProduct';


export default function Index({ products }) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ py: 4, overflow: 'hidden' }}>
            <Head title="Dashboard" />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant={matches ? 'h5' : 'h1'} sx={{ py: 2 }}>Produits</Typography>
                <CreateProduct />
            </Box>

            <Box sx={{ display: 'grid', mt: 2, gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 2 }}>
                {products.map((p, index) => {
                    return <Product key={index} product={p} />
                })}
            </Box>
        </Box>
    );
}