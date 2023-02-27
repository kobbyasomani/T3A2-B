import { useCallback } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useGlobalState } from "../../utils/globalStateContext";
import baseURL from "../../utils/baseUrl";

import {
    AppBar,
    Toolbar,
    Button,
    Container
} from "@mui/material";
// import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';


const NavBar = () => {
    const { store, dispatch } = useGlobalState();
    const navigate = useNavigate();

    const handleLogout = useCallback(async () => {
        fetch(`${baseURL}/user/auth?logout=true`, {
            credentials: "include"
        });
        dispatch({
            type: "logout",
        });
        navigate("/");
    }, [dispatch, navigate]);

    const navItems = [
        {
            name: "Home",
            to: store.isAuth && store.selectedPatient ? "/calendar"
                : store.isAuth && !store.selectedPatient ? "/"
                    : "/"
        },
        {
            name: "About",
            to: "/about"
        },
        {
            name: "Help",
            to: "/help"
        }
    ]

    return (
        <AppBar id="nav-main" position="static">
            <Container>
                <Toolbar>
                    {navItems.map((item, index) => (
                        <Button
                            component={RouterLink}
                            to={item.to}
                            key={index}
                            color="inherit">
                            {item.name}
                        </Button>
                    ))}
                    {store.isAuth ? (
                        <Button id="logout"
                            startIcon={<LogoutIcon />}
                            color="inherit"
                            aria-label="log out"
                            size="small"
                            onClick={handleLogout}
                            sx={{ ml: "auto" }}>
                            Log out
                        </Button>
                    ) : (
                        // <Button startIcon={<LoginIcon />}
                        //     color="inherit"
                        //     sx={{ ml: "auto" }}
                        //     onClick={() => navigate("/login")}>
                        //     Log in
                        // </Button>
                        null
                    )
                    }
                </Toolbar>
            </Container>
        </AppBar >
    );
}

export default NavBar