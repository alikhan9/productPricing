import React, { lazy, useState } from 'react'
import CreateStore from './Stores/CreateStore';
import { Box, Typography } from '@mui/material';
import { Head } from '@inertiajs/react';
import Store from './Stores/Store';
import EditStore from './Stores/EditStore';

// const EditStore = lazy(() => import('./Stores/EditStore'));

export default function Stores({ stores }) {


    const [storeToEdit, setStoreToEdit] = useState(null);
    const [openEdit, setOpenEdit] = useState(false);

    const handleOpenEditStore = (store) => {
        setStoreToEdit({ ...store });
        setOpenEdit(true)
    };
    const handleClose = () => setOpenEdit(false);

    return (
        <Box sx={{ py: 4, overflow: 'none' }}>
            <Head title="Magasin" />
            {storeToEdit ?
                <EditStore store={storeToEdit} open={openEdit} handleClose={handleClose} />
                : null
            }
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant='h1' sx={{ py: 2 }}>Magasins</Typography>
                <CreateStore />
            </Box>

            <Box sx={{ overflow: 'auto', width: '100%', bgcolor: 'tertiary.main', mt: 2 }}>
                <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', position: 'relative', bgcolor: 'tertiary.main', "&>*": { width: '100%', minWidth: 120, display: 'flex', p: 2, justifyContent: 'center', border: 1 } }}>
                    <Typography>Nom</Typography>
                    <Typography>Logo</Typography>
                    <Typography>Ville</Typography>
                    <Typography>Adresse</Typography>
                    <Typography>Produits</Typography>
                    <Typography>Modifier</Typography>
                    <Typography>Supprimer</Typography>
                </Box>
                {stores.map((p, index) => {
                    return <Store key={index} handleOpenEditStore={handleOpenEditStore} store={p} />
                })}
            </Box>
        </Box>
    )
}
