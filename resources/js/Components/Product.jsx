import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import Backdrop from '@mui/material/Backdrop';
import EditProduct from './EditProduct';

export default function Product({ product }) {

    const [show, setShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    const handleOpen = () => setOpenEdit(true);
    const handleClose = () => setOpenEdit(false);

    const showDetails = () => {
        setShow(true);
        setOpen(true);
    }

    const hideDetails = () => {
        setShow(false);
        setOpen(false);
    }

    return (
        <div>
            <EditProduct product={product} open={openEdit} handleClose={handleClose} />
            <Box onMouseOver={() => showDetails()}
                onMouseOut={() => hideDetails()}
                sx={{ width: 100, position: 'relative', bgcolor: 'tertiary.main', borderRadius: 3, overflow: 'hidden' }}>

                {show &&
                    <Backdrop open={open}
                        sx={{ position: 'absolute', minHeight: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2, zIndex: 10 }}>
                        <Button variant='contained' onClick={() => handleOpen()}><ModeEditIcon /></Button>
                    </Backdrop>
                }
                <img src={product.image} alt="image" />
                <Typography sx={{ textAlign: 'center', p: 1 }}>{product.name}</Typography>
                <Typography>{product.description}</Typography>
            </Box >
        </div>
    )
}
