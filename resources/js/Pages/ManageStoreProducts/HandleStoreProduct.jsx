import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { useSpring, animated } from '@react-spring/web'

export default function HandleStoreProduct({ storeProduct, removeProductFromStore }) {

    return (
        <Box
            sx={{ width: '100%', height: 120, color: 'white', display: 'flex', position: 'relative', bgcolor: 'tertiary.main', overflow: 'hidden', "&>*": { width: '100%', display: 'flex', p: 1, height: 120, justifyContent: 'center', alignItems: 'center', border: 1, borderColor: 'white' } }}>

            <Typography sx={{ textAlign: 'center', p: 1, fontSize: 13, minHeight: 40, width: '100%', borderBottom: 1 }}>{storeProduct.product.name}
            </Typography>
            <Box>
                <img src={storeProduct.product.image} alt="image" />
            </Box>

            <Typography>{storeProduct.price}</Typography>

            <Box>
                <Button onClick={() => removeProductFromStore(storeProduct.product.id)} variant="outlined" color='warning'>Retirer</Button>
            </Box>
        </Box >
    )
}
