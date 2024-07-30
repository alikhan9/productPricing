import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NavLink from '@/Components/NavLink';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';


export default function Authenticated({ children }) {

    return (
        <Box sx={{ bgcolor: 'primary.main', height: '100vh', overflow:'auto' }}>
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
                    News
                </Typography>
                <NavLink href='/profile'><SettingsIcon /></NavLink>
                <NavLink href='/logout' method='post'><LogoutIcon/></NavLink>
            </Toolbar>
        </AppBar>
        <Box sx={{ height: '100%' }}>
            {children}
        </Box>
    </Box>
    );
}
