import Guest from '@/Layouts/GuestLayout';
import { Link, Head } from '@inertiajs/react';
import { Container } from '@mui/material';
import { dark } from '@mui/material/styles/createPalette';

export default function Welcome() {


    return (
        <>
            <Head title="Welcome" />
            <Container color="inherit">
                Eh
            </Container>
        </>
    );
}

Welcome.layout = page => <Guest children={page} title="Welcome" />
