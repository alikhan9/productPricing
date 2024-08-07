import { router } from '@inertiajs/react';
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material';
import React from 'react'

export default function OptimalPricing({ products }) {


    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));
    


    function groupBy(arr, property) {
        if (!arr)
            return {};
        return arr?.reduce(function (memo, x) {
            if (!memo[x[property]]) { memo[x[property]] = []; }
            memo[x[property]].push(x);
            return memo;
        }, {});
    }
    var groupedData = groupBy(products, 'store.id');



    const totalPriceForStore = products => {
        return products.reduce((a, v) => a = a + (v['product.price'] * v['product.quantity']), 0)

    }

    const goBack = () => {
        router.get('/baskets');
    }

    return (
        <Box>
            <Button onClick={() => goBack()} variant='outlined' sx={{ mt: 2, width: 150 }} color='info'>Retour</Button>

            {Object.entries(groupedData).map(([storeId, items]) => (
                <Box sx={{ mt: 4 }} key={storeId}>
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Box>
                                <img className='w-[45px] h-[45px]' src={items[0]['store.image']} alt="image produit" />
                            </Box>
                            <Typography variant={matches ? 'h5' : 'h3'}>{items[0]['store.name']}</Typography>
                            <Typography variant={matches ? 'h5' : 'h3'}>/ {items[0]['store.city']}</Typography>
                            <Typography variant={matches ? 'h5' : 'h3'}>/ {items[0]['store.address']}</Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                        <Box sx={{ display: 'flex' }}>
                            <Box sx={{ borderRight: 1, borderColor: 'white', px: 1 }}>
                                <img className='w-[75px] h-[75px] min-w-[75px]' src={items[0]['store.image']} alt="image produit" />
                            </Box>
                            <Box sx={{ border: 1, px: 1, borderColor: 'white' }}>
                                <Typography variant='h5'>{items[0]['store.name']}</Typography>
                                <Typography>{items[0]['store.city']}</Typography>
                                <Typography>{items[0]['store.address']}</Typography>
                            </Box>
                        </Box>

                    </Box>

                    <Box>
                        <Typography sx={{ float: 'right', my: 1 }}>Prix Total du magasin : {totalPriceForStore(items).toFixed(2)} €</Typography>
                    </Box>

                    <Box sx={{ overflow: 'auto', width: '100%', bgcolor: 'tertiary.main', mt: 2 }}>
                        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', position: 'relative', bgcolor: 'tertiary.main', "&>*": { width: '100%', minWidth: 120, display: 'flex', fontSize: { xs: 10, md: 16 }, p: 2, justifyContent: 'center', border: 1 } }}>
                            <Typography>Nom</Typography>
                            <Typography>Image</Typography>
                            <Typography>Prix</Typography>
                            <Typography>Quantité</Typography>
                            <Typography>Prix total</Typography>
                        </Box>
                        {
                            items.map((p, index) => {
                                return (
                                    <Box key={index} sx={{ width: '100%', display: 'flex', position: 'relative', bgcolor: 'tertiary.main', "&>*": { width: '100%', minWidth: 120, display: 'flex', p: 1, height: 120, justifyContent: 'center', fontSize: { xs: 10, md: 16 }, alignItems: 'center', border: 1, borderColor: 'white', wordBreak: "break-word" } }}>
                                        <Typography>{p['product.name']}</Typography>
                                        <Box>
                                            <img className='w-[45px] h-[45px]' src={p['product.image']} alt="image produit" />
                                        </Box>
                                        <Typography>{p['product.price']} €</Typography>
                                        <Typography>{p['product.quantity']}</Typography>
                                        <Typography>{(p['product.quantity'] * p['product.price']).toFixed(2)} €</Typography>
                                    </Box>
                                );
                            })
                        }
                    </Box>
                </Box>
            ))
            }
        </Box >
    )
}
