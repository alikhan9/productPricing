import Product from '@/Components/Product';
import styled from '@emotion/styled';
import { Head } from '@inertiajs/react';
import { Box, Grid, Paper, Typography } from '@mui/material';
import CreateProduct from '@/Components/CreateProduct';



const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: 'secondary.text',
}));

export default function Products() {

    const product = {
        name: 'Tomate',
        price: null,
        description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborumnumquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiumoptio, eaque rerum! Provident similique accusantium nemo autem. Veritatisobcaecati tenetur iure eius earum ut molestias architecto voluptate aliquamnihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat.',
        image: null
    };

    const products_static = [{ ...product }];


    return (
        <Box sx={{ py: 4, }}>
            <Head title="Dashboard" />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h1' sx={{ py: 2 }}>Products</Typography>
                <CreateProduct />
            </Box>

            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {products_static.map((p, index) => {
                    return <Grid item xs={2} sm={4} key={index}>
                        <Item sx={{ bgcolor: 'secondary.main' }}>
                            <Product product={p} />
                        </Item>
                    </Grid>
                })}
            </Grid>
        </Box>

    );
}