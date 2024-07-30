import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { Box, Typography } from '@mui/material';

export default function Home({ auth }) {
    return (
        <Box>
            <Head title="Dashboard" />
            <Typography>Dashboard</Typography>
        </Box>

    );
}
