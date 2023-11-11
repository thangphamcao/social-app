import { Box, FormControl, Typography, TextField, Button, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router-dom';
import { loginStart, loginFailure, loginSuccess } from '../../redux/UserSlice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { logIn } from '../../utils';
import { useMutation } from 'react-query';
import { IInputLogin } from '../../interface';

function Login() {
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const [input, setInput] = useState<IInputLogin>({
        email: '',
        password: '',
    });

    const { mutate: handleSignIn } = useMutation({
        mutationFn: () => logIn(input),
        onSuccess: (res) => {
            const data = {
                id: res.user.id,
                displayName: res.user.displayName,
                email: res.user.email,
                isAdmin: res.user.isAdmin,
                accessToken: res.accessToken,
                avatar: res.user.avatar,
            };
            dispatch(loginSuccess(data));
            navigate('/');
        },
    });

    const signIn = async () => {
        try {
            dispatch(loginStart());
            handleSignIn();
        } catch (err) {
            if (err instanceof Error) {
                dispatch(loginFailure(err.message));
            }
        }
    };

    const handlePressKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
        try {
            if (e.key === 'Enter') {
                dispatch(loginStart());
                handleSignIn();
            }
        } catch (err) {
            if (err instanceof Error) {
                dispatch(loginFailure(err.message));
            }
        }
    };

    const hanleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        const keyInput = event.target.name;
        const valueInput = event.target.value;
        setInput({ ...input, [keyInput]: valueInput });
    };

    const hanldeMoveToSignUp = () => {
        navigate('/signup');
    };

    const breakpoints = {
        flexDirection: { xs: 'column', sm: 'column', md: 'row', lg: 'row' },
        width: {
            xs: '400px',
            sm: '520px',
            md: '768px',
            lg: '768px',
        },
    };

    const breakpointsDisplay = {
        display: {
            xs: 'none',
            sm: 'flex',
            md: 'flex',
            lg: 'flex',
        },
    };

    return (
        <Box
            className="container-full flex justify-center items-center"
            sx={{
                backgroundImage:
                    'url(https://w0.peakpx.com/wallpaper/165/747/HD-wallpaper-beautiful-landscape-digital-art.jpg)',
                height: '100vh',

                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
            }}
        >
            <Box
                width={768}
                sx={[{ backgroundColor: 'white' }, breakpoints]}
                className="flex justify-center rounded-l-2xl rounded-r-2xl "
            >
                <Box className="flex-1 flex justify-center py-8">
                    <Box>
                        <Box>
                            <Typography
                                fontWeight={700}
                                fontSize={25}
                                className="text-center"
                                sx={{ color: '#800080' }}
                            >
                                LOGIN
                            </Typography>
                        </Box>
                        <Box>
                            <FormControl>
                                <Box>
                                    <TextField
                                        required
                                        type="email"
                                        name="email"
                                        label="Email"
                                        variant="standard"
                                        sx={{ width: '250px' }}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => hanleInput(event)}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        required
                                        name="password"
                                        label="Password"
                                        variant="standard"
                                        type="password"
                                        sx={{ width: '250px' }}
                                        onChange={(event: React.ChangeEvent<HTMLInputElement>) => hanleInput(event)}
                                        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handlePressKey(e)}
                                    />
                                </Box>
                                <Box className="text-right mt-2">
                                    <Typography fontSize={13}>Forgot password?</Typography>
                                </Box>
                                <Box className="text-center p-3 my-4">
                                    <Button
                                        className="w-44"
                                        sx={{
                                            backgroundColor: '#A700CC',
                                            borderRadius: '16px',
                                            fontWeight: '700',
                                            ':hover': {
                                                backgroundColor: '#DA70D6',
                                            },
                                        }}
                                        variant="contained"
                                        onClick={signIn}
                                    >
                                        Login
                                    </Button>
                                </Box>
                                <Box className="text-center">
                                    <Typography fontSize={13}>Or use your account</Typography>
                                </Box>
                                <Box className="text-center">
                                    <IconButton>
                                        <FacebookIcon></FacebookIcon>
                                    </IconButton>
                                    <IconButton>
                                        <GoogleIcon></GoogleIcon>
                                    </IconButton>
                                </Box>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>

                <Box
                    className="flex-1 flex justify-center  rounded-r-2xl"
                    sx={[
                        {
                            backgroundImage:
                                'url(https://w0.peakpx.com/wallpaper/165/747/HD-wallpaper-beautiful-landscape-digital-art.jpg)',

                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'cover',
                        },
                        breakpointsDisplay,
                    ]}
                >
                    <Box className="flex justify-center flex-col items-center">
                        <Box width={250} className="text-white text-center ">
                            <Typography fontWeight={700} fontSize={30}>
                                Let's make some friend now
                            </Typography>
                        </Box>
                        <Box className="text-center text-white mb-6 " width={250}>
                            <Typography fontSize={13}>
                                If you don't have an account yet, join us and make some friend
                            </Typography>
                        </Box>
                        <Box className="text-center py-2">
                            <Button
                                variant="contained"
                                className="w-44"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    backgroundColor: 'rgba(255,255,225,0.2)',
                                    color: 'white',
                                    borderRadius: '16px',
                                    fontWeight: '700',
                                    ':hover': {
                                        backgroundColor: '#BF40BF',
                                    },
                                }}
                                onClick={hanldeMoveToSignUp}
                            >
                                Sign Up
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

export default Login;
