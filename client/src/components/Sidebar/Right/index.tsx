import { Box, Avatar, Typography, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const SidebarRight = () => {
    const breakpoints = {
        width: { xs: '0%', sm: '0%', md: '30%', lg: '30%' },
        display: {
            xs: 'none ',
            sm: 'none ',
            md: 'block',
            lg: 'block',
        },
    };
    return (
        <Box className="w-[30%] justify-center" sx={breakpoints}>
            <Box className="flex justify-center">
                <Box
                    className="flex flex-col justify-center"
                    sx={{
                        backgroundColor: 'white',
                        padding: '10px 10px',
                        borderRadius: '8px',
                        maxWidth: '300px',
                        marginTop: '10px',
                    }}
                >
                    <Box className="px-3">
                        <Box>
                            <Box>
                                <Typography fontWeight={600} fontSize={18} marginBottom={1}>
                                    {' '}
                                    Sponsored{' '}
                                </Typography>
                            </Box>

                            <Box className="pb-2">
                                <Box
                                    sx={{
                                        borderRadius: '10px',
                                        justifyContent: 'left',
                                        alignItems: 'center',
                                        ':hover': {
                                            opacity: 0.8,
                                            backgroundColor: 'rgba(0, 0, 0, 0.15)',
                                            borderRadius: '6px',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    <Box>
                                        <Box
                                            component="img"
                                            src="https://phongvu.vn/cong-nghe/wp-content/uploads/2022/11/nha-phat-hanh-game-lmht-2.jpg"
                                            sx={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '8px' }}
                                        ></Box>
                                    </Box>
                                    <Box>
                                        <Typography fontSize={14}> LOL</Typography>
                                        <Typography fontSize={12} color={'darkgrey'}>
                                            Welcome to the League of Legends!
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                    <Box>
                        <Box
                            className="flex justify-between items-center pt-2"
                            sx={{ borderTop: '1px solid #B3B6B7 ' }}
                        >
                            <Typography fontWeight={600} fontSize={18} sx={{ marginLeft: '12px' }}>
                                Contacts
                            </Typography>
                            <Box>
                                <IconButton>
                                    <SearchIcon></SearchIcon>
                                </IconButton>
                                <IconButton>
                                    <MoreVertIcon></MoreVertIcon>
                                </IconButton>
                            </Box>
                        </Box>
                        <Box className="flex flex-col">
                            <Box
                                className="flex items-center px-2"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'rgba(0,0,0,0.1)',
                                        borderRadius: '12px',
                                    },
                                }}
                            >
                                <Avatar
                                    alt="Avatar"
                                    src="https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg"
                                    sx={{ cursor: 'pointer', padding: '' }}
                                />

                                <a href="/" className=" px-3 py-4 text-base ">
                                    Victory
                                </a>
                            </Box>

                            <Box
                                className="flex items-center px-2"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'rgba(0,0,0,0.1)',
                                        borderRadius: '12px',
                                    },
                                }}
                            >
                                <Avatar
                                    alt="Avatar"
                                    src="https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg"
                                    sx={{ cursor: 'pointer' }}
                                />

                                <a href="/" className=" px-3 py-4 text-base ">
                                    Victory
                                </a>
                            </Box>

                            <Box
                                className="flex items-center px-2"
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'rgba(0,0,0,0.1)',
                                        borderRadius: '12px',
                                    },
                                }}
                            >
                                <Avatar
                                    alt="Avatar"
                                    src="https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg"
                                    sx={{ cursor: 'pointer' }}
                                />

                                <a href="/" className=" px-3 py-4 text-base ">
                                    Victory
                                </a>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SidebarRight;
