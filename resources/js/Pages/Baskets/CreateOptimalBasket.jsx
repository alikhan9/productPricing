import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { useForm } from '@inertiajs/react';
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

export default function CreateOptimalBasket({ basket, handleOpen, handleClose, open }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
    });


    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('sm'));

    const [parent, enableAnimations] = useAutoAnimate();
    const [shops, setShops] = useState([]);

    const [personName, setPersonName] = useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };


    const submit = (e) => {
        e.preventDefault();

        post(route('baskets.store'), {
            onSuccess: () => {
                handleClose();
                reset();
            },
        });
    };

    const generateOptimalPricing = () => {
        router.get(`/baskets/${basket.id}/optimal-pricing`)
    }

    const getShops = () => {
        axios.get('/stores/get').then(response => {
            console.log(response);
            
            setShops(response.data);
        });

        return shops;
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
                color: 'white'
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
                        <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel sx={{
                                color: 'white', '&.Mui-focused': {
                                    color: 'white', // Change color to white when focused/minimized
                                }
                            }} id="demo-multiple-checkbox-label">Magasins</InputLabel>
                            <Select
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={personName}
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
                                {getShops()?.map((store, index) => (
                                    <MenuItem key={index} value={store.name}>
                                        <Checkbox
                                            checked={personName.indexOf(name) > -1}
                                            sx={{
                                                color: 'white', // Changes the color of the checkbox itself
                                                '&.Mui-checked': {
                                                    color: 'white', // Ensures the checked state also uses white color
                                                },
                                            }}
                                        />
                                        <ListItemText primary={name} />
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
