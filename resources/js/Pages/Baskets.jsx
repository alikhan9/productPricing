import React, { useState } from 'react'
import { Box, Typography } from '@mui/material';
import { Head } from '@inertiajs/react';
import CreateBasket from './Baskets/CreateBasket';
import Basket from './Baskets/Basket';
import EditBasket from './Baskets/EditBasket';


export default function Baskets({ baskets }) {



  const [basketToEdit, setBasketToEdit] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEditBasket = (basket) => {
    setBasketToEdit({ ...basket });
    setOpenEdit(true)
  };
  const handleClose = () => setOpenEdit(false);

  return (
    <Box sx={{ py: 4, }}>
      <Head title="Panier" />
      {basketToEdit ?
        <EditBasket basket={basketToEdit} open={openEdit} handleClose={handleClose} />
        : null
      }
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant='h1' sx={{ py: 2 }}>Paniers</Typography>
        <CreateBasket />
      </Box>

      <Box sx={{ width: '100%', display: 'flex', alignItems: 'center', mt: 2, position: 'relative', bgcolor: 'tertiary.main', overflow: 'hidden', "&>*": { width: '100%', display: 'flex', p: 2, justifyContent: 'center', border: 1 } }}>
        <Typography>Nom</Typography>
        <Typography>Produits</Typography>
        <Typography>Générer liste optimale</Typography>
        <Typography>Modifier</Typography>
        <Typography>Supprimer</Typography>
      </Box>

      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        {baskets.map((b, index) => {
          return <Basket key={index} handleOpenEditBasket={handleOpenEditBasket} basket={b} />
        })}
      </Box>
    </Box>
  )
}
