import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { router, useForm } from '@inertiajs/react';
import CloseIcon from '@mui/icons-material/Close';
import { useAutoAnimate } from '@formkit/auto-animate/react'
import TextInput from '@/Components/TextInput';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Checkbox, FormControl, InputLabel, ListItemText, MenuItem, OutlinedInput, Select, useMediaQuery, useTheme } from '@mui/material';


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


export default function CreateOptimalBasket({ basket, handleOpen, handleClose, open }) {


    const { get, processing } = useForm({
        name: '',
    });

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const [parent, enableAnimations] = useAutoAnimate();
    const [shops, setShops] = useState(null);

    const [selectedShops, setSelectedShops] = useState([]);
    const [selectedShopsIds, setSelectedShopsIds] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;

        // Split the value into an array of names
        const namesArray = typeof value === 'string' ? value.split(',') : value;

        // Find the corresponding shop objects in the shops array and extract their IDs
        const selectedShopsObjects = namesArray.map((name) =>
            shops.find((shop) => shop.name === name)
        );

        // Extract the IDs from the found shop objects
        const selectedShopsIds = selectedShopsObjects.map(shopObject => shopObject.id);

        // Optionally, keep track of the names as well
        const selectedShopsNames = namesArray;

        // Set the state with both names and IDs
        setSelectedShops(selectedShopsNames); // Assuming this was meant to hold names
        setSelectedShopsIds(selectedShopsIds); // New state variable for holding IDs
    };

    useEffect(() => {
        getShops();
    }, [basket])

    const submit = (e) => {
        e.preventDefault();
        router.get(`/baskets/${basket.id}/optimal-pricing`, { ids: selectedShopsIds })
    };

    const generateOptimalPricing = () => {
        router.get(`/baskets/${basket.id}/optimal-pricing`)
    }

    const getShops = () => {
        axios.get('/stores/get').then(response => {
            setShops(response.data);
        });

    }

    const MenuProps = {
        PaperProps: {
            sx: {
                maxHeight: 400,
                overflowY: 'auto',
                bgcolor: 'tertiary.main',
                '.MuiCheckbox-root': {
                    color: 'white',
                },
                color: 'white',
            },
        },
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
                            <Typography variant={matches ? 'h5' : 'h3'}>Paramètres pour la génération</Typography>
                            <CloseIcon onClick={handleClose} sx={{ fontSize: 25, color: 'red', border: 1, borderRadius: 1, ":hover": { cursor: 'pointer' } }} />
                        </Box>
                        <FormControl sx={{ my: 2, width: '100%' }}>
                            <InputLabel sx={{
                                color: 'white', '&.Mui-focused': {
                                    color: 'white', // Change color to white when focused/minimized
                                }
                            }} id="demo-multiple-checkbox-label">Magasins</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={selectedShops}
                                onChange={handleChange}
                                input={
                                    <OutlinedInput
                                        label="Magasins"
                                        sx={{
                                            color: 'white',
                                        }}
                                    />
                                }
                                renderValue={(selected) => selected.join(', ')}
                                MenuProps={MenuProps}
                            >
                                {shops && shops.map((store, index) => (
                                    <MenuItem key={index} value={store.name}>
                                        <Checkbox
                                            checked={selectedShops.indexOf(store.id) > -1}
                                            sx={{
                                                color: 'white', // Changes the color of the checkbox itself
                                                '&.Mui-checked': {
                                                    color: 'white', // Ensures the checked state also uses white color
                                                    ":focus": {
                                                        color: 'white'
                                                    }
                                                },
                                            }}
                                        />
                                        <ListItemText primary={store.name} />
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
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
