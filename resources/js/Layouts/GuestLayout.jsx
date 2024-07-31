import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NavLink from '@/Components/NavLink';

export default function Guest({ children }) {
    return (
        <Box sx={{ bgcolor: 'primary.main', height: '100vh', overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
            <AppBar position="relative">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2, display: { md: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        <NavLink href='/'>Home</NavLink>
                    </Typography>
                    <NavLink href='/login'>Login</NavLink>
                    <NavLink href='/register'>Register</NavLink>
                </Toolbar>
            </AppBar>
            <Box sx={{ height: '100%' }}>
                {children}
            </Box>
        </Box>

    );
}

