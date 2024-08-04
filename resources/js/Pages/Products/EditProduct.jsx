import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextInput from '../../Components/TextInput';
import InputLabel from '../../Components/InputLabel';
import { router, useForm } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import InputError from '../../Components/InputError';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import PrimaryButton from '../../Components/PrimaryButton';
import axios from 'axios';
import { Button } from '@mui/material';



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

export default function EditProduct({ product, open, handleClose }) {

    const { data, setData, post, processing, errors, reset } = useForm({ ...product });

    const [parent] = useAutoAnimate()
    const [image, setImage] = useState();
    const [previewUrl, setPreviewUrl] = useState('');

    const submit = (e) => {
        e.preventDefault();

        if (image) {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });

            formData.append('newImage', image);

            router.post(`/products/${product.id}`, formData, {
                onSuccess: () => {
                    handleClose();
                },
                onError: error => {
                    console.log(error);
                    // setData('error', error);

                }
            });
            return;
        }

        post(`/products/${product.id}`, {
            onSuccess: () => handleClose(),
        });
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            // Create a local URL for the file
            let localUrl = URL.createObjectURL(img);
            // Update the state with the new file and the local URL for preview
            setImage(e.target.files[0])
            setPreviewUrl(localUrl);
        }
    };

    const deleteProduct = () => {
        router.delete(`/products/${product.id}`, {
            onSuccess: () => {
                handleClose();
                reset();
            }
        })
    }

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
                        <div className="mt-4">
                            <InputLabel htmlFor="image">Image</InputLabel>
                            <TextInput
                                id="image"
                                multiple accept="image/*"
                                type="file"
                                name="image"
                                className="mt-1 block w-full"
                                onChange={handleImageChange}
                                capture
                            />
                            <InputError message={errors.image} className="mt-2" />
                            <div className='flex justify-center mt-2'>
                                <img className='max-w-[200px] max-h-[200px]' src={previewUrl ? previewUrl : product.image} alt="Preview" />
                            </div>
                        </div>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button onClick={() => deleteProduct()} color='error' variant='contained'>Supprimer</Button>
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
