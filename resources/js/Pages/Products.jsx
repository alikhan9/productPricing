import { Head } from '@inertiajs/react';
import { Box, Typography } from '@mui/material';
import Product from './Products/Product';
import CreateProduct from './Products/CreateProduct';


export default function Index({ products }) {
    return (
        <Box sx={{ py: 4, }}>
            <Head title="Dashboard" />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h1' sx={{ py: 2 }}>Produits</Typography>
                <CreateProduct />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
                {products.map((p, index) => {
                    return <Product key={index} product={p} />
                })}
            </Box>
        </Box>
    );
}