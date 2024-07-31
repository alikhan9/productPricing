import Product from '@/Components/Product';
import styled from '@emotion/styled';
import { Head } from '@inertiajs/react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import CreateProduct from '@/Components/CreateProduct';


export default function Products({ products }) {


    return (
        <Box sx={{ py: 4, }}>
            <Head title="Dashboard" />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h1' sx={{ py: 2 }}>Produits</Typography>
                <CreateProduct />
            </Box>

            <Box sx={{ display: 'flex', gap:2 }}>
                {products.map((p, index) => {
                    return <Product key={index} product={p} />
                })}
            </Box>
        </Box>

    );
}