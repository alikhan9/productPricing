import { router } from '@inertiajs/react'
import { Box, Button, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'



export default function Store({ store, handleOpenEditStore }) {

    const [showDelete, setShowDelete] = useState(false);

    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down('md'));

    const [springs, api] = useSpring(() => ({
        from: { x: 0 },
    }))

    const startAnimation = () => {
        api.start({
            from: {
                y: -100,
            },
            to: {
                y: 0,
            },
        })
    }

    const toggleShowDelete = () => {
        startAnimation()
        setShowDelete(!showDelete)
    }

    const deleteStore = () => {
        router.delete(`/stores/${store.id}`, {
            onSuccess: () => {
                setShowDelete(false);
            }
        })
    }

    const goToManageProducts = () => {
        router.get(`/stores/${store.id}/products`)
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', position: 'relative', bgcolor: 'tertiary.main', "&>*": { width: '100%', minWidth: 120, display: 'flex', p: 1, height: 120, justifyContent: 'center', fontSize: { xs: 10, md: 16 }, alignItems: 'center', border: 1, borderColor: 'white', wordBreak: "break-word" } }}>
            <Typography>{store.name}</Typography>
            <Box>
                <img src={store.image} alt="image..." />
            </Box>
            <Typography> {store.city}</Typography>
            <Typography> {store.address}</Typography>
            <Box>
                <Button size={matches ? 'small' : 'medium'} onClick={() => goToManageProducts()} variant='outlined' color='success'>Produits</Button>
            </Box>
            <Box>
                <Button size={matches ? 'small' : 'medium'} onClick={() => handleOpenEditStore(store)} variant='outlined' color='info'>Modifier</Button>
            </Box>
            <Box sx={{ position: 'relative' }}>
                {showDelete ? <animated.div
                    style={{
                        ...springs
                    }}
                ><Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

                        <Button size={matches ? 'small' : 'medium'} onClick={() => toggleShowDelete()} variant='outlined' color='success'>Annuler</Button>
                        <Button size={matches ? 'small' : 'medium'} onClick={() => deleteStore()} variant='outlined' color='warning'>Confirmer</Button>
                    </Box>
                </animated.div>
                    :
                    <Button size={matches ? 'small' : 'medium'} onClick={() => toggleShowDelete()} variant='outlined' color='warning'>Supprimer</Button>
                }

            </Box>
        </Box >
    )
}
