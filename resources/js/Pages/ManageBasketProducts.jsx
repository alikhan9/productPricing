import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { router } from '@inertiajs/react';
import HandlebasketProduct from './ManageBasketProducts/HandleBasketProduct';
import { useDebounce } from 'use-debounce';
import BasketProduct from './ManageBasketProducts/BasketProduct';

export default function ManageBasketProducts({ basket, products, basketProducts }) {

    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);

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
            <Typography variant='h3'>{basket.name} / {basket.city} / {basket.address}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
                <Button variant='contained' color='success' onClick={() => handleChange(true)} sx={{ opacity: basketProducts ? 1 : .25 }} >Produits Magazin</Button>
                <Button onClick={() => handleChange(false)} variant='contained' color='secondary' sx={{ opacity: !basketProducts ? 1 : .25 }} >Produits Généraux</Button>
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



            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', mt: 2, position: 'relative', bgcolor: 'tertiary.main', overflow: 'hidden', "&>*": { width: '100%', display: 'flex', p: 2, justifyContent: 'center', border: 1 } }}>
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
    )
}
