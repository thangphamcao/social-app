import { Avatar, Box } from '@mui/material';
import PeopleIcon from '@mui/icons-material/People';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import EventIcon from '@mui/icons-material/Event';
import FeedIcon from '@mui/icons-material/Feed';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';

const SidebarLeft = () => {
    const breakpoints = {
        width: { xs: '0%', sm: '0%', md: '0%', lg: '30%' },
        display: {
            xs: 'none ',
            sm: 'none ',
            md: 'none',
            lg: 'block',
        },
    };
    const boxCss = {
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        PointerEvents: 'none',
        padding: '2px',
        '&:hover ': {
            opacity: 0.7,
            backgroundColor: 'rgba(0, 0, 0, 0.15)',
            borderRadius: '10px',
        },
    };

    const itemCss = {
        marginLeft: '10px',
        marginRight: '10px',
        cursor: 'pointer',
    };

    return (
        <Box className="w-[30%]" sx={breakpoints}>
            <Box className="flex flex-col justify-center items-center">
                <Box
                    className="flex flex-col "
                    sx={{
                        backgroundColor: 'white',
                        padding: '10px 10px',
                        borderRadius: '8px',
                        width: '300px',
                        marginTop: '10px',
                    }}
                >
                    <Box sx={[boxCss]}>
                        <Avatar
                            alt="Avatar"
                            src="https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg"
                            sx={{ cursor: 'pointer', marginLeft: '5px' }}
                        />

                        <a href="/signup" className="text-xl px-3 py-4 font-bold ">
                            Victory
                        </a>
                    </Box>

                    <Box sx={boxCss}>
                        <FeedIcon sx={itemCss}> </FeedIcon>
                        <a href="/login" className="text-lg px-3 py-4">
                            Feed
                        </a>
                    </Box>

                    <Box sx={boxCss}>
                        <PeopleIcon sx={itemCss}> </PeopleIcon>
                        <a href="/" className="text-lg px-3 py-4">
                            Friend
                        </a>
                    </Box>

                    <Box sx={boxCss}>
                        <OndemandVideoIcon sx={itemCss}></OndemandVideoIcon>
                        <a href="/" className="text-lg px-3 py-4">
                            Video
                        </a>
                    </Box>

                    <Box sx={boxCss}>
                        <BookmarkIcon sx={itemCss}> </BookmarkIcon>
                        <a href="/" className="text-lg px-3 py-4">
                            Bookmarks
                        </a>
                    </Box>

                    <Box sx={boxCss}>
                        <EventIcon sx={itemCss}> </EventIcon>
                        <a href="/" className="text-lg px-3 py-4">
                            Event
                        </a>
                    </Box>
                    <Box sx={boxCss}>
                        <SportsEsportsIcon sx={itemCss}> </SportsEsportsIcon>
                        <a href="/" className="text-lg px-3 py-4">
                            Game
                        </a>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default SidebarLeft;
