import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { TextField, useMediaQuery, useTheme } from '@mui/material';
import { useForm } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '100%', md: 500 },
    height: { xs: '100%', md: 'auto' },
    bgcolor: 'secondary.main',
    border: 'none',
    p: 4,
    borderRadius: { md: 2 },
    overflow: 'auto',
};

export default function CreateProduct() {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        image: null,
    });

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const [parent, enableAnimations] = useAutoAnimate()
    const [previewUrl, setPreviewUrl] = useState('');


    const submit = (e) => {
        e.preventDefault();

        post(route('products.store'), {
            onSuccess: () => {
                handleClose();
                reset();
                setPreviewUrl('');
            },
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            // Create a local URL for the file
            let localUrl = URL.createObjectURL(img);
            // Update the state with the new file and the local URL for preview
            setData(prevState => ({
                ...prevState,
                image: img
            }));
            setPreviewUrl(localUrl);
        }
    };

    return (
        <div ref={parent}>
            <Box onClick={handleOpen} sx={{
                display: 'flex', alignItems: 'center', gap: 1, border: 1, borderRadius: 2, px: 2, py: 1, borderStyle: 'dashed', borderColor: 'secondary.main', ":hover": { bgcolor: 'tertiary.main', cursor: 'pointer', transform: 'scale(1.02)', transition: '0.1s' }
            }}>
                <Typography sx={{ fontSize: { xs: 14, md: 20 } }}>Créer Produit</Typography>
                <AddBoxIcon sx={{ fontSize: { xs: 30, md: 40 }, color: 'white' }} />
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
                        <div className="mt-4">
                            <InputLabel htmlFor="image">Image</InputLabel>
                            <TextInput
                                id="image"
                                multiple accept="image/*"
                                type="file"
                                name="image"
                                className="mt-1 block w-full"
                                onChange={handleImageChange}
                                required
                            />
                            <InputError message={errors.image} className="mt-2" />
                            <div className='flex justify-center mt-2'>
                                {previewUrl && (
                                    <img className='max-w-[200px] max-h-[200px]' src={previewUrl} alt="Preview" />
                                )}
                            </div>
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
