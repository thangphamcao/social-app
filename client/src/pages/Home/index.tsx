import { Box, Avatar, Typography } from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import PanoramaIcon from '@mui/icons-material/Panorama';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import Posts from '../../components/Posts';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useState } from 'react';
import CreatePost from '../../components/Modal/CreatePost';

const Home = () => {
    const [open, setOpen] = useState<boolean>(false);

    const user = useSelector((state: RootState) => state.user.user);

    const openModelCreatePost = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const breakpoints = {
        width: { xs: '100%', sm: '100%', md: '60%', lg: '40%' },
        margin: ' 5px 10px',
    };
    const breakpointInput = {
        display: {
            xs: 'none ',
            sm: 'block ',
            md: 'block',
            lg: 'block',
        },
    };

    return (
        <Box sx={breakpoints}>
            <Box className="w-full bg-white  rounded-lg mt-2">
                <Box className="py-2.5 px-4 rounded-lg bg-white  ">
                    <Box className="flex items-center p-2">
                        <Avatar
                            alt="Avatar"
                            src="https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg"
                            sx={{ marginLeft: '10px', marginRight: '10px', cursor: 'pointer' }}
                        />
                        <Box
                            className="w-full rounded-3xl bg-gray-100 p-2 pl-6 cursor-pointer"
                            onClick={openModelCreatePost}
                        >
                            <Typography>{`What's on your mind ${user?.displayName}?`}</Typography>
                        </Box>
                        <CreatePost open={open} close={handleClose} />
                    </Box>
                    <Box className="py-4 px-4 mt-2 flex justify-around items-center border-t-2">
                        <Box className="flex ">
                            <VideocamIcon className="mr-3"></VideocamIcon>
                            <Typography sx={breakpointInput}>Livestream</Typography>
                        </Box>
                        <Box className="flex">
                            <PanoramaIcon className="mr-3"></PanoramaIcon>
                            <Typography sx={breakpointInput}>Pictures/videos</Typography>
                        </Box>
                        <Box className="flex">
                            <EmojiEmotionsIcon className="mr-3"></EmojiEmotionsIcon>
                            <Typography sx={breakpointInput}>Feelings</Typography>
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Posts user={user} />
        </Box>
    );
};

export default Home;
