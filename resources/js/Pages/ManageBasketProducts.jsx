import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { router } from '@inertiajs/react';
import HandlebasketProduct from './ManageBasketProducts/HandleBasketProduct';
import { useDebounce } from 'use-debounce';
import BasketProduct from './ManageBasketProducts/BasketProduct';

export default function ManageBasketProducts({ basket, products, basketProducts }) {

    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const handleChange = (valuebasketProducts) => {
        router.get(`/baskets/${basket.id}/products`, { basketProducts: valuebasketProducts ? 1 : 0 }, {
            preserveState: true
        });
    };


    const getfilteredProducts = () => {
        if (debouncedSearch[0] === '')
            return products;
        if (basketProducts)
            return products.filter(p => p.product.name.toLowerCase().includes(debouncedSearch[0].toLowerCase()));
        else
            return products.filter(p => p.name.toLowerCase().includes(debouncedSearch[0].toLowerCase()));
    }



    const addProductToBasket = (productId, quantity) => {
        router.post(`/baskets/${basket.id}/products/${productId}`, { quantity });
    }

    const removeProductFromBasket = productId => {
        router.delete(`/baskets/${basket.id}/products/${productId}`);
    }

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant={matches ? 'h5' : 'h3'}>{basket.name}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1, mt: { xs: 2, sm: 0 } }}>
                <Button variant='contained' size={matches ? 'small' : 'medium'} color='success' onClick={() => handleChange(true)} sx={{ opacity: basketProducts ? 1 : .25 }} >Produits Magazin</Button>
                <Button onClick={() => handleChange(false)} size={matches ? 'small' : 'medium'} variant='contained' color='secondary' sx={{ opacity: !basketProducts ? 1 : .25 }} >Produits Généraux</Button>
            </Box>


            <Box component="form" noValidate>
                <TextField
                    className='noSelect'
                    variant='filled'
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{
                        float: 'right',
                        my: 2,
                        '& .MuiInputBase-input': {
                            color: 'white', // Ensures the text color inside the TextField is white
                        },
                    }}
                    InputLabelProps={{
                        style: { color: 'white' },
                    }}
                    size='small'
                    label="Rechercher..."
                />
            </Box>


            <Box sx={{ overflow: 'auto', width: '100%', bgcolor: 'tertiary.main', mt: 2 }}>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', position: 'relative', bgcolor: 'tertiary.main', "&>*": { width: '100%', minWidth: 120, display: 'flex', fontSize: { xs: 10, md: 16 }, p: 2, justifyContent: 'center', border: 1 } }}>
                    <Typography>Nom</Typography>
                    <Typography>Image</Typography>
                    <Typography>Quantité</Typography>
                    <Typography>Status</Typography>
                </Box>
                {!basketProducts ?
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {getfilteredProducts().map((p, index) => {
                            return <BasketProduct addProductToBasket={addProductToBasket} key={index} product={p} />
                        })}
                    </Box>
                    :
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {getfilteredProducts().map((p, index) => {
                            return <HandlebasketProduct removeProductFromBasket={removeProductFromBasket} key={index} basketProduct={p} />
                        })}
                    </Box>
                }
            </Box>
        </Box>
    )
}
