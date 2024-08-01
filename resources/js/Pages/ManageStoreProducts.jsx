import { Box, Typography } from '@mui/material';
import React from 'react'
import ManageProduct from './ManageStoreProducts/ManageProduct';
import { router } from '@inertiajs/react';

export default function ManageStoreProducts({ store, products, availableProducts }) {

    console.log(products);

    const isProductPartOfStore = (productId) => {
        if (products.filter(p => p.product_id === productId).length > 0)
            return true;
        return false;
    }

    const addProductToStore = (productId, price) => {
        router.post(`/stores/${store.id}/products/${productId}`, { price });
    }

    const removeProductFromStore = productId => {
        router.delete(`/stores/${store.id}/products/${productId}`);
    }

    return (
        <Box sx={{ mt: 2 }}>
            <Typography variant='h3'>{store.name} / {store.city} / {store.address} / Produits</Typography>


            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', mt: 2, position: 'relative', bgcolor: 'tertiary.main', overflow: 'hidden', "&>*": { width: '100%', display: 'flex', p: 2, justifyContent: 'center', border: 1 } }}>
                <Typography>Nom</Typography>
                <Typography>Image</Typography>
                <Typography>Prix</Typography>
                <Typography>Status</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {availableProducts.map((p, index) => {
                    return <ManageProduct removeProductFromStore={removeProductFromStore} addProductToStore={addProductToStore} key={index} isProductPartOfStore={isProductPartOfStore} product={p} />
                })}
            </Box>
        </Box>
    )
}
