import { router } from '@inertiajs/react'
import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'



export default function Basket({ basket, handleOpenEditBasket }) {

    const [showDelete, setShowDelete] = useState(false);

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

    const deleteBasket = () => {
        router.delete(`/baskets/${basket.id}`, {
            onSuccess: () => {
                setShowDelete(false);
            }
        })
    }

    const goToManageProducts = () => {
        router.get(`/baskets/${basket.id}/products`)
    }

    const generateOptimalPricing = () => {
        router.get(`/baskets/${basket.id}/optimal-pricing`)
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', position: 'relative', bgcolor: 'tertiary.main', overflow: 'hidden', "&>*": { width: '100%', display: 'flex', p: 1, height: 120, justifyContent: 'center', alignItems: 'center', border: 1, borderColor: 'white' } }}>
            <Typography>{basket?.name}</Typography>
            <Box>
                <Button onClick={() => goToManageProducts()} variant='outlined' color='success'>Produits</Button>
            </Box>
            <Box>
                <Button onClick={() => generateOptimalPricing()} variant='outlined' color='error'>Générer</Button>
            </Box>
            <Box>
                <Button onClick={() => handleOpenEditBasket(basket)} variant='outlined' color='info'>Modifier</Button>
            </Box>
            <Box sx={{ position: 'relative' }}>
                {showDelete ? <animated.div
                    style={{
                        ...springs
                    }}
                ><Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

                        <Button onClick={() => toggleShowDelete()} variant='outlined' color='success'>Annuler</Button>
                        <Button onClick={() => deleteBasket()} variant='outlined' color='warning'>Confirmer</Button>
                    </Box>
                </animated.div>
                    :
                    <Button onClick={() => toggleShowDelete()} variant='outlined' color='warning'>Supprimer</Button>
                }

            </Box>
        </Box >
    )
}
