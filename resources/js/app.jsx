import './bootstrap';
import '../css/app.css';

import { createRoot } from 'react-dom/client';
import { createInertiaApp } from '@inertiajs/react';
import { createTheme, ThemeProvider } from '@mui/material';
import Authenticated from './Layouts/AuthenticatedLayout';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

const theme = createTheme({
    palette: {
        primary: {
            main: "hsl(222,40%,11%)",
            button: 'hsl(211,89%,51%)'
        },
        secondary: {
            main: "hsl(222,40%,21%)",
            button: 'hsl(211,100%,20%)',
            text: "white",
        },
        tertiary: {
            main: "hsl(222,40%,25%)",
            text: "white",
            hover: "hsl(222,40%,30%)"
        }

    },
    typography: {
        allVariants: {
            color: 'white'
        },
        h1: {
            fontSize: "2.5rem",
            fontWeight: 600
        },
        h2: {
            fontSize: "1.75rem",
            fontWeight: 600
        },
        h1: {
            fontSize: "1.5rem",
            fontWeight: 600
        },
    },

    components: {
        MuiLink: {
            styleOverrides: {
                root: {
                    textDecoration: 'none',
                    '&:hover': {
                        cursor: 'pointer',
                        color: 'hsl(191, 22%, 86%)',
                    },
                    paddingRight: 4,
                    paddingLeft: 4,
                }
            }
        },
    }
});

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: name => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true })
        let page = pages[`./Pages/${name}.jsx`]
        page.default.layout = page.default.layout || (page => <Authenticated children={page} />)
        return page
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ThemeProvider theme={theme}>
                <App style={{ height: '100vh' }} {...props} />
            </ThemeProvider>
        );
    },
    progress: {
        color: '#4B5563',
    },
});
