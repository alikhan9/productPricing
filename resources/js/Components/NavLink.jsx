import { router } from "@inertiajs/react";
import { Link } from "@mui/material";

export default function NavLink({ href, children, method = 'get', hover = true, textBlack = false }) {

    const goTo = () => {
        router.visit(href, { method: method });
    };

    return (
        <Link sx={{ "&:hover": hover ? {} : { color: "black" }, display: 'flex', gap: 1, alignItems: 'center', color: textBlack ? 'black' : 'white' }} color="inherit" onClick={goTo}>{children}</Link>
    );
}
