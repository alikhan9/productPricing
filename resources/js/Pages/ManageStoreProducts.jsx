import { Box, Button, Input, TextField, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import React, { useState } from 'react'
import ManageProduct from './ManageStoreProducts/ManageProduct';
import { router } from '@inertiajs/react';
import HandleStoreProduct from './ManageStoreProducts/HandleStoreProduct';

export default function ManageStoreProducts({ store, products, storeProducts }) {

    const handleChange = (valueStoreProducts) => {
        router.get(`/stores/${store.id}/products`, { storeProducts: valueStoreProducts ? 1 : 0 }, {
            preserveState: true
        });
    };



    const addProductToStore = (productId, price) => {
        router.post(`/stores/${store.id}/products/${productId}`, { price });
    }

    const removeProductFromStore = productId => {
        router.delete(`/stores/${store.id}/products/${productId}`);
    }

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant='h3'>{store.name} / {store.city} / {store.address}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'end', gap: 1 }}>
                <Button variant='contained' color='success' onClick={() => handleChange(true)} sx={{ opacity: storeProducts ? 1 : .25 }} >Produits Magazin</Button>
                <Button onClick={() => handleChange(false)} variant='contained' color='secondary' sx={{ opacity: !storeProducts ? 1 : .25 }} >Produits Généraux</Button>
            </Box>


            <TextField variant='filled' sx={{ float: 'right', my: 2, color: 'white' }} color='warning' size='small' label="Rechercher..."  />

            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField label="Outlined secondary" color="secondary" focused disableUnderline />
                <TextField label="Filled success" variant="filled" color="success" focused />
                <TextField
                    label="Standard warning"
                    variant="standard"
                    color="warning"
                    focused
                />
            </Box>



            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', mt: 2, position: 'relative', bgcolor: 'tertiary.main', overflow: 'hidden', "&>*": { width: '100%', display: 'flex', p: 2, justifyContent: 'center', border: 1 } }}>
                <Typography>Nom</Typography>
                <Typography>Image</Typography>
                <Typography>Prix</Typography>
                <Typography>Status</Typography>
            </Box>
            {!storeProducts ?
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {products.map((p, index) => {
                        return <ManageProduct removeProductFromStore={removeProductFromStore} addProductToStore={addProductToStore} key={index} product={p} />
                    })}
                </Box>
                :
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    {products.map((p, index) => {
                        return <HandleStoreProduct removeProductFromStore={removeProductFromStore} key={index} storeProduct={p} />
                    })}
                </Box>
            }
        </Box>
    )
}
