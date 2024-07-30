import { router } from "@inertiajs/react";
import { Link } from "@mui/material";

export default function NavLink({ href, children, method = 'get' }) {

    const goTo = () => {
        router.visit(href, {method: method});
    };

    return (
        <Link color="inherit" onClick={goTo}>{children}</Link>
    );
}
