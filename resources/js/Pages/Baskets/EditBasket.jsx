import React from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextInput from '../../Components/TextInput';
import InputLabel from '../../Components/InputLabel';
import { useForm } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import InputError from '../../Components/InputError';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import PrimaryButton from '../../Components/PrimaryButton';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', md: 500 },
    bgcolor: 'secondary.main',
    border: 'none',
    p: 4,
    borderRadius: 2
};

export default function EditBasket({ basket, open, handleClose }) {

    const { data, setData, put, processing, errors, reset } = useForm({ ...basket });

    const [parent] = useAutoAnimate()


    const submit = (e) => {
        e.preventDefault();
        put(`/baskets/${basket.id}`, {
            onSuccess: () => handleClose(),
        });
    };

    return (
        <div ref={parent}>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <form onSubmit={submit}>

                    <Box sx={style}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography variant='h5'>Création de nouveau produit</Typography>
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
