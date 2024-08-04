import { Box, Button, Input, TextField, ToggleButton, ToggleButtonGroup, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react'
import ManageProduct from './ManageStoreProducts/ManageProduct';
import { router } from '@inertiajs/react';
import HandleStoreProduct from './ManageStoreProducts/HandleStoreProduct';
import { useDebounce } from 'use-debounce';

export default function ManageStoreProducts({ store, products, storeProducts }) {


    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const handleChange = (valueStoreProducts) => {
        router.get(`/stores/${store.id}/products`, { storeProducts: valueStoreProducts ? 1 : 0 }, {
            preserveState: true
        });
    };

    const getfilteredProducts = () => {
        if (debouncedSearch[0] === '')
            return products;
        if (storeProducts)
            return products.filter(p => p.product.name.toLowerCase().includes(debouncedSearch[0].toLowerCase()));
        else
            return products.filter(p => p.name.toLowerCase().includes(debouncedSearch[0].toLowerCase()));
    }



    const addProductToStore = (productId, price) => {
        router.post(`/stores/${store.id}/products/${productId}`, { price });
    }

    const removeProductFromStore = productId => {
        router.delete(`/stores/${store.id}/products/${productId}`);
    }

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant={matches ? 'h5' : 'h3'}>{store.name} / {store.city} / {store.address}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1, mt: { xs: 2, sm: 0 } }}>
                <Button size={matches ? 'small' : 'medium'} variant='contained' color='success' onClick={() => handleChange(true)} sx={{ opacity: storeProducts ? 1 : .25 }} >Produits Magazin</Button>
                <Button size={matches ? 'small' : 'medium'} onClick={() => handleChange(false)} variant='contained' color='secondary' sx={{ opacity: !storeProducts ? 1 : .25 }} >Produits Généraux</Button>
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
                    <Typography>Prix</Typography>
                    <Typography>Status</Typography>
                </Box>
                {!storeProducts ?
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {getfilteredProducts().map((p, index) => {
                            return <ManageProduct removeProductFromStore={removeProductFromStore} addProductToStore={addProductToStore} key={index} product={p} />
                        })}
                    </Box>
                    :
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        {getfilteredProducts().map((p, index) => {
                            return <HandleStoreProduct removeProductFromStore={removeProductFromStore} key={index} storeProduct={p} />
                        })}
                    </Box>
                }
            </Box>
        </Box>
    )
}
