import { router } from "@inertiajs/react";
import { Link } from "@mui/material";

export default function NavLink({ href, children, method = 'get', hover = true }) {

    const goTo = () => {
        router.visit(href, { method: method });
    };

    return (
        <Link sx={{ "&:hover": hover ? {} : { color: "inherit" },display:'flex',gap:1, alignItems:'center' }} color="inherit" onClick={goTo}>{children}</Link>
    );
}
