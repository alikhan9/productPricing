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
import { cities } from './Cities.js';



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

export default function EditStore({ store, open, handleClose }) {

    const { data, setData, post, processing, errors, reset } = useForm({ ...store });

    const [parent] = useAutoAnimate()
    const [image, setImage] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [shownCities, setShownCities] = useState(null);

    const submit = (e) => {
        e.preventDefault();
        if (image) {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                formData.append(key, value);
            });

            formData.append('newImage', image);

            router.post(`/stores/${store.id}`, formData, {
                onSuccess: () => {
                    handleClose();
                },
                onError: error => {
                    // TODO: Handle errors
                    console.log(error);
                }
            });
            return;
        }
        post(`/stores/${store.id}`, {
            onSuccess: () => handleClose(),
        });
    };

    const setCity = (city) => {
        setData('city', city);
        setShownCities(null);
    }

    const handleCities = (e) => {
        const searchValue = e.target.value;
        if (searchValue === '')
            setShownCities(null)
        else
            setShownCities(cities.filter(c => c.includes(searchValue)));
        setData('city', searchValue)
    }

    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];
            // Create a local URL for the file
            let localUrl = URL.createObjectURL(img);
            // Update the state with the new file and the local URL for preview
            setImage(e.target.files[0]);
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
                            <Typography variant='h5' sx={{ width: { xs: '80%', sm: '100%' } }}>Création de nouveau produit</Typography>
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
                            <InputLabel htmlFor="city" value="Ville" />
                            <Box sx={{ position: 'relative' }}>
                                <TextInput
                                    id="city"
                                    type="text"
                                    name="city"
                                    value={data.city}
                                    className="mt-1 block w-full relative"
                                    autoComplete="city"
                                    onChange={(e) => handleCities(e)}
                                    required
                                />
                                {shownCities &&
                                    <Box sx={{ position: 'absolute', bgcolor: 'tertiary.main', overflow: 'auto', width: '100%', mt: 2, maxHeight: 140, borderRadius: 2, zIndex: 10 }}>
                                        {shownCities.map((city, index) => <Typography onClick={() => setCity(city)} sx={{ p: 1, ":hover": { cursor: 'pointer', bgcolor: 'tertiary.hover' } }} key={index}>{city}</Typography>)}
                                    </Box>
                                }
                            </Box>
                            <InputError message={errors.city} className="mt-2" />
                        </div>
                        <div className="mt-4">
                            <InputLabel htmlFor="address" value="Adresse" />
                            <TextInput
                                id="address"
                                type="text"
                                name="address"
                                value={data.address}
                                className="mt-1 block w-full"
                                autoComplete="address"
                                onChange={(e) => setData('address', e.target.value)}
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
                            />
                            <InputError message={errors.image} className="mt-2" />
                            <div className='flex justify-center mt-2'>
                                <img className='max-w-[200px] max-h-[200px]' src={previewUrl ? previewUrl : store?.image} alt="Preview" />
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
