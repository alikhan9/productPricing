import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import { useSpring, animated } from '@react-spring/web'

export default function BasketProduct({ product, addProductToBasket }) {

    const [quantity, setQuantity] = useState(null);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const [springProps, api] = useSpring(() => ({
        backgroundColor: 'hsl(222,40%,25%)',
        config: { duration: 200 },
    }));

    const handleNoQuantity = () => {
        api.start({ from: { backgroundColor: 'hsl(222,40%,25%)' }, to: { backgroundColor: '#f00' } });
        setTimeout(() => {
            api.start({ from: { backgroundColor: '#f00' }, to: { backgroundColor: 'hsl(222,40%,25%)' } });
        }, 500);
    };

    const tryToAddProductToBasket = () => {
        if (quantity === null || quantity < 0) {
            handleNoQuantity();
            return;
        }
        addProductToBasket(product.id, quantity);
        setQuantity(null);
    }

    return (
        <Box
            sx={{ width: '100%', display: 'flex', position: 'relative', bgcolor: 'tertiary.main', "&>*": { width: '100%', minWidth: 120, display: 'flex', p: 1, height: 120, justifyContent: 'center', alignItems: 'center', border: 1, borderColor: 'white', fontSize: { xs: 10, md: 16 }, textAlign: 'center', wordBreak: "break-word" } }}>

            <Typography sx={{ textAlign: 'center', p: 1, fontSize: 13, minHeight: 40, width: '100%', borderBottom: 1 }}>{product.name}
            </Typography>
            <Box>
                <img src={product.image} alt="image" />
            </Box>


            <animated.div style={springProps}>
                <input placeholder='Quantité' onChange={(e) => setQuantity(e.target.value)} type='number' min="0" className='px-2 py-1 text-white w-full focus:ring-0 text-center bg-transparent border-white  border-t-0 border-r-0 border-l-0 border-b'></input>
            </animated.div>

            <Box>
                <Button onClick={() => { tryToAddProductToBasket() }} size={matches ? 'small' : 'medium'} variant="contained" color='success'>Ajouter</Button>
            </Box>
        </Box >
    )
}   
