import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';


export default function Product({product}) {
    return (
        <Card sx={{ maxWidth: 345, bgcolor: 'tertiary.main' }}>
            <CardMedia
                sx={{ height: 140 }}
                image="https://picsum.photos/200"
                title="green iguana"
            />
            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {product.name}
                </Typography>
                <Typography variant="body2" color="text.terciary">
                    {product.description}
                </Typography>
            </CardContent>
            <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
                <Box>
                    <Button sx={{ mx: 1, color: "primary.button", ":hover": { borderColor: "secondary.button" }, borderColor: 'primary.button' }} variant="outlined" size="small">Edit</Button>
                    <Button variant="outlined" color="error" size="small">Delete</Button>
                </Box>
            </CardActions>
        </Card>
    )
}
