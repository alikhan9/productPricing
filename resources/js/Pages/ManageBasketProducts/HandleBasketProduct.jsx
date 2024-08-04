import Typography from '@mui/material/Typography';
import { Box, Button, useMediaQuery, useTheme } from '@mui/material';

export default function HandleBasketProduct({ basketProduct, removeProductFromBasket }) {

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box
            sx={{ width: '100%', display: 'flex', position: 'relative', bgcolor: 'tertiary.main', "&>*": { width: '100%', minWidth: 120, display: 'flex', p: 1, height: 120, justifyContent: 'center', alignItems: 'center', border: 1, borderColor: 'white', fontSize: { xs: 10, md: 16 }, textAlign: 'center', wordBreak: "break-word" } }}>

            <Typography sx={{ textAlign: 'center', p: 1, fontSize: 13, minHeight: 40, width: '100%', borderBottom: 1 }}>{basketProduct.product.name}
            </Typography>
            <Box>
                <img src={basketProduct.product.image} alt="image" />
            </Box>

            <Typography>{basketProduct.quantity}</Typography>

            <Box>
                <Button onClick={() => removeProductFromBasket(basketProduct.product.id)} size={matches ? 'small' : 'medium'} variant="outlined" color='warning'>Retirer</Button>
            </Box>
        </Box >
    )
}
