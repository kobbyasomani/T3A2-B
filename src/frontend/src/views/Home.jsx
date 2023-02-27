import { useMemo, useNavigate } from "react";
import { useGlobalState } from "../utils/globalStateContext";
import { Outlet, Link } from "react-router-dom";
import Form from "../components/forms/Form";
import { useHandleForm } from "../utils/formUtils";

import { TextField, Typography } from "@mui/material";
import { ButtonPrimary } from "../components/root/Buttons";

export default function Login() {
    // console.log("rendering Home");

    // Get the global state and set form state
    const { store, dispatch } = useGlobalState();

    // Set the initial form state
    const initialState = useMemo(() => {
        return {
            inputs: {
                email: "",
                password: "",
            },
            errors: []
        }
    }, [])
    const [form, setForm] = useHandleForm(initialState);

    const setUser = () => {
        // console.log(`setting user ${form.inputs.email}...`)
        dispatch({
            type: "login",
            data: form.inputs.email
        });
        // navigate("/select-patient");
    }

    return store.isAuth ? (
        <Outlet />
    ) : (
        <>
            <Typography variant="h1">CareSync</Typography>
            <Typography variant="h2">Easy care work scheduling and shift notes.</Typography>
            <Form
                form={form}
                setForm={setForm}
                legend="Sign in"
                buttonText="Log in"
                buttonVariant="outlined"
                postURL="/user/login"
                callback={setUser}
            >
                {/* <label htmlFor="email">Email address</label> */}
                <TextField
                    label="Email address"
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@provider.com"
                    required
                    mui="TextField" />
                {/* <label htmlFor="password">Password</label> */}
                <TextField
                    label="Password"
                    id="password"
                    type="password"
                    name="password"
                    placeholder="**********"
                    required
                    mui="TextField" />
            </Form>
            <Typography variant="h2" style={{ textAlign: "center" }}>Need an account?</Typography>
            <Link to="/register" className="button-link">
                <ButtonPrimary>
                    Sign up
                </ButtonPrimary>
            </Link>
        </>
    );
}