import React from 'react'
import CreateStore from './Stores/CreateStore';
import { Box, Typography } from '@mui/material';
import { Head } from '@inertiajs/react';
import Store from './Stores/Store';

export default function Stores({ stores }) {

    return (
        <Box sx={{ py: 4, }}>
            <Head title="Magasin" />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h1' sx={{ py: 2 }}>Magasins</Typography>
                <CreateStore />
            </Box>

            <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', mt: 2, position: 'relative', bgcolor: 'tertiary.main', overflow: 'hidden', "&>*": { width: '100%', display: 'flex', p: 2, justifyContent: 'center', border: 1 } }}>
                <Typography>Nom</Typography>
                <Typography>Logo</Typography>
                <Typography>Ville</Typography>
                <Typography>Adresse</Typography>
                <Typography>Produits</Typography>
                <Typography>Modifier</Typography>
                <Typography>Supprimer</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                {stores.map((p, index) => {
                    return <Store key={index} store={p} />
                })}
            </Box>
        </Box>
    )
}
