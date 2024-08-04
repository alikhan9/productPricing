import { Head } from '@inertiajs/react';
import { Box, Input, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useDebounce } from 'use-debounce';

export default function Home({ products }) {
    function groupBy(arr, property) {
        if (!arr)
            return {};
        return arr?.reduce(function (memo, x) {
            if (!memo[x[property]]) { memo[x[property]] = []; }
            memo[x[property]].push(x);
            return memo;
        }, {});
    }
    var groupedProducts = groupBy(products, 'product.id');



    const [search, setSearch] = useState('');
    const debouncedSearch = useDebounce(search, 300);

    const getfilteredProducts = () => {
        if (debouncedSearch[0] === '')
            return Object.values(groupedProducts);
        return Object.values(groupedProducts).filter(product => {
            return product[0]['product.name'].toLowerCase().includes(debouncedSearch[0].toLowerCase());
        });
    }

    return (
        <Box>
            <Head title="Dashboard" />
            <Typography variant='h3' sx={{ my: 2 }}>Comparaisons générales</Typography>
            <Box component="form" noValidate>
                <TextField
                    className='noSelect'
                    variant='filled'
                    onChange={(e) => setSearch(e.target.value)}
                    sx={{
                        float: 'right',
                        my: 2,
                        '& .MuiInputBase-input': {
                            color: 'white', // Ensures the text color inside the TextField is white
                        },
                    }}
                    InputLabelProps={{
                        style: { color: 'white' },
                    }}
                    size='small'
                    label="Rechercher..."
                />
            </Box>

            <Box sx={{ mt: 10 }}>
                {getfilteredProducts().map((product, index) => {
                    return (
                        <Box sx={{ my: 2, borderBottom: 1, pb: 2, borderColor: 'blueviolet', borderStyle: 'dashed' }} key={index}>
                            <Box sx={{ display: 'inline-flex', gap: 2, alignItems: 'center', width: 200, borderRadius: 2 }}>
                                <Box>
                                    <img className='rounded-md' src={product[0]['product.image']} alt="" />
                                </Box>
                                <Typography>{product[0]['product.name']}</Typography>
                            </Box>
                            <Box sx={{ mb: 2, overflow: 'auto', bgcolor: 'tertiary.main' }}>
                                {product.map((p, index2) => {
                                    return (
                                        <Box sx={{ width: '100%', display: 'flex', position: 'relative', bgcolor: 'tertiary.main', "&>*": { width: '100%', minWidth: 120, display: 'flex', p: 1, height: 120, justifyContent: 'center', alignItems: 'center', border: 1, borderColor: 'white', fontSize: { xs: 10, md: 16 }, textAlign: 'center', wordBreak: "break-word" } }} key={index2}>
                                            <Box>
                                                <img src={p['store.image']} alt="image" />
                                            </Box>
                                            <Typography>{p['store.name']}</Typography>
                                            <Typography>{p['store.city']}</Typography>
                                            <Typography>{p['store.address']}</Typography>
                                            <Typography>{p['product.price']} €</Typography>
                                        </Box>
                                    )
                                })}
                            </Box>
                        </Box>
                    )
                })}
            </Box>
        </Box>

    );
}
