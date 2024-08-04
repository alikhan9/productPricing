import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NavLink from '@/Components/NavLink';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import { usePage } from '@inertiajs/react';
import { CircularProgress, Container } from '@mui/material';
import { AddShoppingCart } from '@mui/icons-material';
import Backdrop from '@mui/material/Backdrop';


export default function Authenticated({ children }) {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <Box sx={{ bgcolor: 'primary.main', height: '100vh', overflow: 'auto' }}>
            <AppBar position="relative">
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', py: 1 }}>
                    <Typography variant="h6" component="div">
                        <NavLink href='/' method='get'>Home</NavLink>
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <NavLink href='/stores' method='get'><StoreMallDirectoryIcon sx={{ fontSize: 30 }} /><span className='hidden md:block'>Magasins</span></NavLink>
                        <NavLink href='/products' method='get'><MenuBookIcon sx={{ fontSize: 30 }} /><span className='hidden md:block'>Produits</span></NavLink>
                        <NavLink href='/baskets' method='get'><AddShoppingCart sx={{ fontSize: 30 }} /><span className='hidden md:block'>Courses</span></NavLink>
                        <Button
                            id="basic-button"
                            aria-controls={open ? 'basic-menu' : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? 'true' : undefined}
                            onClick={handleClick}
                        >
                            <Box sx={{ width: 50, height: 50, borderRadius: '100%', overflow: 'hidden' }}>
                                <img src={usePage().props.auth.user.avatar} alt="avatar" />
                            </Box>
                        </Button>

                        <Menu
                            id="basic-menu"
                            sx={{ transform: 'translate(-10px,10px)' }}

                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>
                                <NavLink textBlack onClick={handleClose} hover={false} href='/profile'><SettingsIcon />Paramètres</NavLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <NavLink textBlack href='/logout' hover={false} method='post'><LogoutIcon />Déconnexion</NavLink>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container sx={{ mb: 5 }}>
                {children}
            </Container>
        </Box>
    );
}
