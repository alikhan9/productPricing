import { Box, Typography } from '@mui/material';
import React from 'react'

export default function OptimalPricing({ products }) {

    const groupedData = products.reduce((acc, item) => {
        const key = item.store_id;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {});


    const totalPriceForStore = products => {
        return products.reduce((a, v) => a = a + (v.price * v.quantity), 0)

    }


    return (
        <Box>
            {Object.entries(groupedData).map(([storeId, items]) => (
                <Box sx={{ mt: 4 }} key={storeId}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Box>
                                <img className='w-[45px] h-[45px]' src={items[0].store.image} alt="image produit" />
                            </Box>
                            <Typography variant='h3'>{items[0].store.name}</Typography>
                            <Typography variant='h3'>/ {items[0].store.city}</Typography>
                            <Typography variant='h3'>/ {items[0].store.address}</Typography>
                        </Box>
                        <Box>
                            <Typography>Prix Total du magasin : {totalPriceForStore(items).toFixed(2)} €</Typography>
                        </Box>
                    </Box>
                    <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', mt: 2, position: 'relative', bgcolor: 'tertiary.main', overflow: 'hidden', "&>*": { width: '100%', display: 'flex', p: 2, justifyContent: 'center', border: 1 } }}>
                        <Typography>Nom</Typography>
                        <Typography>Image</Typography>
                        <Typography>Prix</Typography>
                        <Typography>Quantité</Typography>
                        <Typography>Prix total</Typography>
                    </Box>
                    {
                        items.map((p,index) => {
                            return (
                                <Box key={index} sx={{ width: '100%', display: 'flex', position: 'relative', bgcolor: 'tertiary.main', overflow: 'hidden', "&>*": { width: '100%', display: 'flex', p: 1, height: 50, justifyContent: 'center', alignItems: 'center', border: 1, borderColor: 'white' } }}>
                                    <Typography>{p.product.name}</Typography>
                                    <Box>
                                        <img className='w-[45px] h-[45px]' src={p.product.image} alt="image produit" />
                                    </Box>
                                    <Typography>{p.price} €</Typography>
                                    <Typography>{p.quantity}</Typography>
                                    <Typography>{(p.quantity * p.price).toFixed(2)} €</Typography>
                                </Box>
                            );
                        })
                    }
                </Box>
            ))};
        </Box>
    )
}
