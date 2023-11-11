import { Box, FormControl, Typography, TextField, Button, IconButton } from '@mui/material';

import FacebookIcon from '@mui/icons-material/Facebook';
import GoogleIcon from '@mui/icons-material/Google';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signUpStart, signUpSuccess, signUpFailure } from '../../redux/UserSlice';
import { useMutation } from 'react-query';
import { signUp } from '../../utils';
import { RootState } from '../../redux/store';

function SignUp() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const state = useSelector((state: RootState) => state.user);
    useEffect(() => {
        if (state.user) {
            navigate('/');
        }
    }, [navigate, state]);

    const [input, setInput] = useState({
        name: '',
        email: '',
        password: '',
        rePassword: '',
    });

    const { mutate: handleSignUp } = useMutation({
        mutationKey: 'signUp',
        mutationFn: () => signUp(input),
        onSuccess: () => {
            dispatch(signUpSuccess());
            setInput({
                name: '',
                email: '',
                password: '',
                rePassword: '',
            });
            navigate('/login');
        },
    });

    const breakpoints = {
        flexDirection: { xs: 'column', sm: 'column-reverse', md: 'row', lg: 'row' },
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
    const handleMoveToLogin = () => {
        navigate('/login');
    };

    const checkHandleSignIn = (password: string, repassword: string) => {
        if (password === '' || repassword === '' || input.email === '' || input.name === '') {
            return false;
        }
        if (password === repassword) {
            return true;
        }
        console.log(false);

        return false;
    };

    const handleSignIn = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        const inputKey = e.target.name;

        setInput({ ...input, [inputKey]: inputValue });
    };

    const handleSubmitSignUp = async () => {
        try {
            dispatch(signUpStart());
            if (checkHandleSignIn(input.password, input.rePassword)) {
                handleSignUp();
            }
        } catch (error) {
            if (error instanceof Error) {
                dispatch(signUpFailure(error.message));
            }
        }
    };

    const handlePressKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
        try {
            if (e.key === 'Enter') {
                dispatch(signUpStart());
                if (checkHandleSignIn(input.password, input.rePassword)) {
                    handleSignUp();
                }
            }
        } catch (err) {
            if (err instanceof Error) {
                dispatch(signUpFailure(err.message));
            }
        }
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
                <Box
                    className="flex-1 flex justify-center  rounded-l-2xl"
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
                                Hallo my friends!
                            </Typography>
                        </Box>
                        <Box className="text-center text-white mb-6 " width={250}>
                            <Typography fontSize={13}>If you have an account, login here and have fun!</Typography>
                        </Box>
                        <Box className="text-center py-2">
                            <Button
                                variant="contained"
                                className="w-44"
                                startIcon={<ArrowBackIcon />}
                                sx={{
                                    backgroundColor: 'rgba(255,255,225,0.2)',
                                    color: 'white',
                                    borderRadius: '16px',
                                    fontWeight: '700',
                                    ':hover': {
                                        backgroundColor: '#BF40BF',
                                    },
                                }}
                                onClick={handleMoveToLogin}
                            >
                                Login
                            </Button>
                        </Box>
                    </Box>
                </Box>
                <Box className="flex-1 flex justify-center py-8">
                    <Box>
                        <Box>
                            <Typography
                                fontWeight={700}
                                fontSize={25}
                                className="text-center"
                                sx={{ color: '#800080' }}
                            >
                                SIGN UP
                            </Typography>
                        </Box>
                        <Box>
                            <FormControl>
                                <Box>
                                    <TextField
                                        required
                                        name="name"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSignIn(e)}
                                        label="Name"
                                        variant="standard"
                                        sx={{ width: '250px' }}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        required
                                        name="email"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSignIn(e)}
                                        label="Email"
                                        variant="standard"
                                        sx={{ width: '250px' }}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        required
                                        name="password"
                                        type="password"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSignIn(e)}
                                        label="Password"
                                        variant="standard"
                                        sx={{ width: '250px' }}
                                    />
                                </Box>
                                <Box>
                                    <TextField
                                        required
                                        name="rePassword"
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleSignIn(e)}
                                        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => handlePressKey(e)}
                                        label="Re-password"
                                        type="password"
                                        variant="standard"
                                        sx={{ width: '250px' }}
                                    />
                                </Box>

                                <Box className="text-center p-3 my-4">
                                    <Button
                                        onClick={handleSubmitSignUp}
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
                                    >
                                        SignUp
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
            </Box>
        </Box>
    );
}

export default SignUp;
