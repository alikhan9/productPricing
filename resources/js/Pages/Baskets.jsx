import React, { useState } from 'react'
import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { Head } from '@inertiajs/react';
import CreateBasket from './Baskets/CreateBasket';
import Basket from './Baskets/Basket';
import EditBasket from './Baskets/EditBasket';
import CreateOptimalBasket from './Baskets/CreateOptimalBasket';


export default function Baskets({ baskets }) {



  const [basketToEdit, setBasketToEdit] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [openOptimal, setOpenOptimal] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpenEditBasket = (basket) => {
    setBasketToEdit({ ...basket });
    setOpenEdit(true)
  };

  const handleOpenCreateOptimalBasket = (basket) => {
    setBasketToEdit({ ...basket });
    setOpenOptimal(true);
  }

  const closeCreateOptimal = () => {
    setOpenOptimal(false);
  }
  const handleClose = () => setOpenEdit(false);

  return (
    <Box sx={{ py: 4 }}>
      <Head title="Panier" />
      {basketToEdit ?
        <EditBasket basket={basketToEdit} open={openEdit} handleClose={handleClose} />
        : null
      }
      <CreateOptimalBasket open={openOptimal} handleClose={closeCreateOptimal} />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant={matches ? 'h5' : 'h1'} sx={{ py: 2 }}>Paniers</Typography>
        <CreateBasket />
      </Box>


      <Box sx={{ overflow: 'auto', width: '100%', bgcolor: 'tertiary.main', mt: 2 }}>
        <Box sx={{ width: '100%', display: 'flex', position: 'relative', bgcolor: 'tertiary.main', "&>*": { width: '100%', minWidth: 120, display: 'flex', p: 1, height: 120, justifyContent: 'center', alignItems: 'center', border: 1, borderColor: 'white', fontSize: { xs: 10, md: 16 }, textAlign: 'center' } }}>
          <Typography>Nom</Typography>
          <Typography>Produits</Typography>
          <Typography>Générer liste optimale</Typography>
          <Typography>Modifier</Typography>
          <Typography>Supprimer</Typography>
        </Box>
        {baskets.map((b, index) => {
          return <Basket key={index} handleOpenCreateOptimalBasket={handleOpenCreateOptimalBasket} handleOpenEditBasket={handleOpenEditBasket} basket={b} />
        })}
      </Box>

    </Box>
  )
}
