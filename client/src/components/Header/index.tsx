import {
    AppBar,
    Toolbar,
    Typography,
    Tab,
    Tabs,
    Avatar,
    Box,
    TextField,
    useMediaQuery,
    useTheme,
    styled,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import ChatBubbleIcon from '@mui/icons-material/Message';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { Fragment, useState } from 'react';
import DrawerComp from '../Drawer';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

import MenuAvatar from '../Menu';

const Header = () => {
    const [value, setValue] = useState<number>(0);
    const theme = useTheme();
    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    const user = useSelector((state: RootState) => state.user.user);

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const TextFieldSearch = styled(TextField)(() => ({
        '& fieldset': {
            borderRadius: '16px',
            width: '240px',
        },
    }));

    const hover = {
        '&:hover': {
            opacity: 0.6,
        },
    };

    const handleChange = (_e: React.SyntheticEvent<Element, Event>, value: number) => {
        setValue(value);
    };

    return (
        <Fragment>
            <AppBar sx={{ backgroundColor: 'white' }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {isMatch ? (
                        <>
                            <Typography
                                component={Link}
                                to="/"
                                sx={{ color: 'black', marginRight: '10px', cursor: 'pointer', fontWeight: '900' }}
                            >
                                Social
                            </Typography>

                            <DrawerComp></DrawerComp>
                        </>
                    ) : (
                        <Fragment>
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '1' }}>
                                <Typography
                                    component={Link}
                                    to="/"
                                    sx={{ color: 'black', marginRight: '10px', fontWeight: '900' }}
                                >
                                    SOCIAL
                                </Typography>

                                <TextFieldSearch
                                    id="outlined-basic"
                                    variant="outlined"
                                    size="small"
                                    placeholder="Tìm kiếm..."
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <SearchIcon sx={{ color: 'black' }} />{' '}
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flex: '2' }}>
                                <Tabs
                                    value={value}
                                    sx={{ color: 'black' }}
                                    onChange={(e: React.SyntheticEvent<Element, Event>, value) =>
                                        handleChange(e, value)
                                    }
                                >
                                    <Tab label="Home" sx={hover} />

                                    <Tab label="ABOUT" sx={hover} />

                                    <Tab label="FAQs" sx={hover} />
                                </Tabs>
                            </Box>

                            <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center', flex: '1' }}>
                                <PersonIcon
                                    sx={[
                                        hover,
                                        {
                                            color: 'black',
                                            marginLeft: '10px',
                                            marginRight: '10px',
                                            cursor: 'pointer',
                                        },
                                    ]}
                                ></PersonIcon>
                                <ChatBubbleIcon
                                    sx={[
                                        hover,
                                        {
                                            color: 'black',
                                            marginLeft: '10px',
                                            marginRight: '10px',
                                            cursor: 'pointer',
                                        },
                                    ]}
                                ></ChatBubbleIcon>
                                <NotificationsIcon
                                    sx={[
                                        hover,
                                        {
                                            color: 'black',
                                            marginLeft: '10px',
                                            marginRight: '10px',
                                            cursor: 'pointer',
                                        },
                                    ]}
                                ></NotificationsIcon>
                                <Avatar
                                    alt="Avatar"
                                    src={user?.avatar ? `http://localhost:5000/gallery/${user?.id}/${user.avatar}` : ''}
                                    sx={{ marginLeft: '10px', marginRight: '10px', cursor: 'pointer' }}
                                    onClick={handleClick}
                                />
                                <MenuAvatar open={open} handleClose={handleClose} anchorEl={anchorEl} user={user} />
                            </Box>
                        </Fragment>
                    )}
                </Toolbar>
            </AppBar>
        </Fragment>
    );
};

export default Header;
