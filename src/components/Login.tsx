import { LoginSchemaValidate } from '@/utils/schemaValidate';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Stack } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useLogin, useNotify } from 'react-admin';
import * as Yup from 'yup';


function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href={process.env.NEXT_PUBLIC_BASE_URL}>
                Nereb furniture
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

type LoginForm = {
    loginId?: string,
    password?: string,
    error?: string,
    isLoading?: boolean,
}
const theme = createTheme();
const initState = {
    loginId: undefined,
    password: undefined,
    error: undefined,
    isLoading: false,
} satisfies LoginForm
const schema = Yup.object(LoginSchemaValidate)

export default function Login() {
    const login = useLogin()
    const notify = useNotify()
    const [state, dispatch] = React.useReducer((prev: LoginForm, next: LoginForm): LoginForm => {
        try {
            const { loginId, password } = { ...prev, ...next }
            if (!loginId) throw new Error("LoginId required")
            if (!password) throw new Error("Password required")

            if (loginId.length > 20) throw new Error("LoginId must lesser than 20 characters")

            return { ...prev, ...next, error: undefined }
        } catch (error: any) {
            return { ...prev, ...next, error: error.message }
        }
    }, initState)
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        dispatch({ isLoading: true })
        await new Promise(v => setTimeout(v, 1000))//Debounce

        if (state.error) return

        login({ loginId: state.loginId, password: state.password }).catch((err) =>
            notify(err)
        )

        dispatch({ isLoading: false })
    };

    return (
        <ThemeProvider theme={theme}>
            <Container
                component="main"
                maxWidth="xs"
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    minHeight: "100vh",
                    flexDirection: "column",
                }}
            >
                <CssBaseline />
                <Stack
                    alignItems='center'
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="loginId"
                            label="Login ID"
                            name="loginId"
                            autoFocus
                            onChange={(e) => dispatch({ loginId: e.target.value })}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            onChange={(e) => dispatch({ password: e.target.value })}
                        />
                        {state.error && <Typography fontWeight={'600'} color={"#FD8A8A"}>{state.error}</Typography>}
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Remember me"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign In
                        </Button>
                        {/* <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid> */}
                    </Box>
                </Stack>
                <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    );
}