import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { useSpring, animated } from '@react-spring/web'

export default function ManageStoreProduct({ product, isProductPartOfStore, addProductToStore, removeProductFromStore }) {

    const [price, setPrice] = useState(null);

    const [springProps, api] = useSpring(() => ({
        backgroundColor: 'hsl(222,40%,25%)',
        config: { duration: 200 },
    }));

    const handleNoPrice = () => {
        api.start({ from: { backgroundColor: 'hsl(222,40%,25%)' }, to: { backgroundColor: '#f00' } });
        setTimeout(() => {
            api.start({ from: { backgroundColor: '#f00' }, to: { backgroundColor: 'hsl(222,40%,25%)' } });
        }, 500);
    };

    const tryToStoreProduct = () => {
        if (price === null || price < 0) {
            handleNoPrice();
            return;
        }
        addProductToStore(product.id, price);
    }

    return (
        <Box
            sx={{ width: '100%', height: 120, color: 'white', display: 'flex', position: 'relative', bgcolor: 'tertiary.main', overflow: 'hidden', "&>*": { width: '100%', display: 'flex', p: 1, height: 120, justifyContent: 'center', alignItems: 'center', border: 1, borderColor: 'white' } }}>

            <Typography sx={{ textAlign: 'center', p: 1, fontSize: 13, minHeight: 40, width: '100%', borderBottom: 1 }}>{product.name}
            </Typography>
            <Box>
                <img src={product.image} alt="image" />
            </Box>

            <animated.div style={springProps}>
                <input placeholder='Prix' onChange={(e) => setPrice(e.target.value)} type='number' min="0" className='px-2 py-1 text-white focus:ring-0 text-center bg-transparent border-white  border-t-0 border-r-0 border-l-0 border-b'></input>
            </animated.div>

            <Box>
                <Button onClick={() => removeProductFromStore(product.id)} variant="outlined" color='warning'>Retirer</Button>
            </Box>
        </Box >
    )
}
