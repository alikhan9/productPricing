import { Box, Button, Typography } from '@mui/material'
import React from 'react'

export default function Store({ store }) {
    return (
        <Box sx={{ width: '100%', display: 'flex', position: 'relative', bgcolor: 'tertiary.main', overflow: 'hidden', "&>*": { width: '100%', display: 'flex', p: 1, height: 120, justifyContent: 'center', alignItems:'center' ,border: 1, borderColor: 'white' } }}>
            <Typography>{store.name}</Typography>
            <Box>
                <img src={store.image} alt="image..." />
            </Box>
            <Typography> {store.city}</Typography>
            <Typography> {store.address}</Typography>
            <Box>
                <Button variant='outlined' color='info'>Modifier</Button>
            </Box>
            <Box>
                <Button variant='outlined' color='warning'>Supprimer</Button>
            </Box>
        </Box >
    )
}
