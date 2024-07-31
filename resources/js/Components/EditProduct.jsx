import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextInput from './TextInput';
import InputLabel from './InputLabel';
import { useForm } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import InputError from './InputError';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import PrimaryButton from './PrimaryButton';
import axios from 'axios';



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

export default function EditProduct({ product, open, handleClose }) {

    const { data, setData, put, processing, errors, reset } = useForm({ id: product.id, name: product.name, description: product.description ? product.description : '', image: null });

    const [parent] = useAutoAnimate()
    const [previewUrl, setPreviewUrl] = useState('');
    const submit = (e) => {
        e.preventDefault();

        // put(`/products/${product.id}`, {
        //     onSuccess: () => handleClose(),
        //     data: {...data}
        // });
        console.log(data);
        axios.put(`/products/${product.id}`, { ...data })
    };

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            // Create a local URL for the file
            let localUrl = URL.createObjectURL(img);
            // Update the state with the new file and the local URL for preview
            setData('image', e.target.files[0])
            setPreviewUrl(localUrl);
        }
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
                        <div className="mt-4">
                            <InputLabel htmlFor="description" value="Description (optionnelle)" />
                            <TextInput
                                id="description"
                                type="text"
                                name="description"
                                value={data.description}
                                className="mt-1 block w-full"
                                autoComplete="description"
                                onChange={(e) => setData('description', e.target.value)}
                            />

                            <InputError message={errors.description} className="mt-2" />
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
                            />
                            <InputError message={errors.image} className="mt-2" />
                            <div className='flex justify-center mt-2'>
                                <img className='max-w-[200px] max-h-[200px]' src={previewUrl ? previewUrl : product.image} alt="Preview" />
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
