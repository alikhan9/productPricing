import { router } from '@inertiajs/react'
import { Box, Button, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSpring, animated } from '@react-spring/web'



export default function Store({ store }) {

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

    const deleteStore = () => {
        router.delete(`/stores/${store.id}`, {
            onSuccess: () => {
                setShowDelete(false);
            }
        })
    }

    return (
        <Box sx={{ width: '100%', display: 'flex', position: 'relative', bgcolor: 'tertiary.main', overflow: 'hidden', "&>*": { width: '100%', display: 'flex', p: 1, height: 120, justifyContent: 'center', alignItems: 'center', border: 1, borderColor: 'white' } }}>
            <Typography>{store.name}</Typography>
            <Box>
                <img src={store.image} alt="image..." />
            </Box>
            <Typography> {store.city}</Typography>
            <Typography> {store.address}</Typography>
            <Box>
                <Button variant='outlined' color='info'>Modifier</Button>
            </Box>
            <Box sx={{ position: 'relative' }}>
                {showDelete ? <animated.div
                    style={{
                        ...springs
                    }}
                ><Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>

                        <Button onClick={() => toggleShowDelete()} variant='outlined' color='success'>Annuler</Button>
                        <Button onClick={() => deleteStore()} variant='outlined' color='warning'>Confirmer</Button>
                    </Box>
                </animated.div>
                    :
                    <Button onClick={() => toggleShowDelete()} variant='outlined' color='warning'>Supprimer</Button>
                }

            </Box>
        </Box >
    )
}
