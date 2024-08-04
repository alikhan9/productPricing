import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useForm } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { useMediaQuery, useTheme } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100%', md: 500 },
    height: '100%',
    bgcolor: 'secondary.main',
    border: 'none',
    p: 4,
    borderRadius: { md: 2 },
    overflow: 'auto',
};

export default function CreateBasket() {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const [parent, enableAnimations] = useAutoAnimate()


    const submit = (e) => {
        e.preventDefault();

        post(route('baskets.store'), {
            onSuccess: () => {
                handleClose();
                reset();
            },
        });
    };

    return (
        <div ref={parent}>
            <Box onClick={handleOpen} sx={{
                display: 'flex', alignItems: 'center', gap: 1, border: 1, borderRadius: 2, px: 2, py: 1, borderStyle: 'dashed', borderColor: 'secondary.main', ":hover": { bgcolor: 'tertiary.main', cursor: 'pointer', transform: 'scale(1.02)', transition: '0.1s' }
            }}>
                <Typography sx={{ fontSize: { sm: 14, md: 20 } }}>Créer Panier</Typography>
                <AddBoxIcon sx={{ fontSize: { sm: 30, md: 40 }, color: 'white' }} />
            </Box>

            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form onSubmit={submit}>

                    <Box sx={style}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant={matches ? 'h5' : 'h3'}>Création d'un nouveau panier</Typography>
                            <CloseIcon onClick={handleClose} sx={{ fontSize: 25, color: 'red', border: 1, borderRadius: 1, ":hover": { cursor: 'pointer' } }} />
                        </Box>
                        <div className="mt-4">
                            <InputLabel htmlFor="name" value="Nom" />
                            <TextInput
                                id="name"
                                type="text"
                                name="name"
                                value={data.name}
                                className="mt-1 block w-full"
                                autoComplete="name"
                                onChange={(e) => setData('name', e.target.value)}
                                required
                            />

                            <InputError message={errors.name} className="mt-2" />
                        </div>
                        <Box sx={{ display: 'flex', justifyContent: 'end', mt: 2 }}>
                            <PrimaryButton disabled={processing}>
                                Valider
                            </PrimaryButton>
                        </Box>
                    </Box>
                </form>
            </Modal>
        </div>
    )
}
