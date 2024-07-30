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
import { Container } from '@mui/material';


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
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div">
                        <NavLink href='/' method='get'>Home</NavLink>
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <NavLink href='/stores' method='get'><StoreMallDirectoryIcon sx={{ fontSize: 30 }} />Stores</NavLink>
                        <NavLink href='/products' method='get'><MenuBookIcon sx={{ fontSize: 30 }} />Products</NavLink>
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
                                <NavLink onClick={handleClose} hover={false} href='/profile'><SettingsIcon />Settings</NavLink>
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                <NavLink href='/logout' hover={false} method='post'><LogoutIcon />Logout</NavLink>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Toolbar>
            </AppBar>
            <Container sx={{ height: '100%' }}>
                {children}
            </Container>
        </Box>
    );
}
