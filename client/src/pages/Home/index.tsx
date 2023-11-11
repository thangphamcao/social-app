import {
    Box,
    Avatar,
    TextField,
    InputAdornment,
    Typography,
    // CardMedia,
    Card,
    CardHeader,
    IconButton,
    CardContent,
    CardActions,
    Skeleton,
} from '@mui/material';
import VideocamIcon from '@mui/icons-material/Videocam';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import PanoramaIcon from '@mui/icons-material/Panorama';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ShareIcon from '@mui/icons-material/Share';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { useMutation, useQuery } from 'react-query';
import { getAllPost, likePost } from '../../utils';
import { Fragment, useState } from 'react';
import dayjs from 'dayjs';
import { IComment, IDetailPost, ILike } from '../../interface/post';
import { getAllPostSuccess } from '../../redux/PostSlice';
import CreatePost from '../../components/Modal/CreatePost';

const Home = () => {
    const [open, setOpen] = useState<boolean>(false);
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user);

    const { isLoading, isFetched, refetch, data } = useQuery({
        queryKey: 'getAllPost',
        queryFn: () => getAllPost(),
        onSuccess: (res) => {
            const post = res.posts;
            dispatch(getAllPostSuccess(post));
        },
    });

    const { mutate: onLikePost } = useMutation({
        mutationKey: 'likePost',
        mutationFn: (id: string) => likePost(id),
        onSuccess: () => {
            refetch();
        },
    });

    const handleLikePost = async (id: string) => {
        onLikePost(id);
    };

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
                        {isLoading ? (
                            <Fragment>
                                <Skeleton animation="wave" variant="circular" width={40} height={40} />
                                <Skeleton
                                    animation="wave"
                                    height={50}
                                    width="100%"
                                    style={{ marginLeft: '24px', borderRadius: '16px' }}
                                />
                            </Fragment>
                        ) : (
                            <Fragment>
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
                            </Fragment>
                        )}
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
            {isLoading && (
                <Card sx={{ marginTop: 2, borderRadius: '10px', height: '450px' }}>
                    <CardHeader
                        avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
                        action={
                            <IconButton aria-label="settings">
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={<Skeleton animation="wave" height={10} width="20%" style={{ marginBottom: 6 }} />}
                        subheader={<Skeleton animation="wave" height={10} width="30%" />}
                    />

                    <Skeleton sx={{ height: 300 }} animation="wave" variant="rectangular" />
                    <CardContent>
                        {
                            <Fragment>
                                <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                <Skeleton animation="wave" height={10} width="80%" />
                            </Fragment>
                        }
                    </CardContent>
                </Card>
            )}

            {isFetched &&
                data.posts?.map((item: IDetailPost, index: number) => (
                    <Fragment key={index}>
                        <Box className="my-4 w-full">
                            <Card sx={{ width: '100%', paddingBottom: '8px', borderRadius: '10px' }}>
                                <CardHeader
                                    avatar={
                                        <Avatar
                                            alt="Avatar"
                                            src={
                                                item.author.avatar
                                                    ? `http://localhost:5000/gallery/${item?.author._id}/${item.author.avatar.image}`
                                                    : ''
                                            }
                                            sx={{ marginLeft: '10px', cursor: 'pointer' }}
                                        />
                                    }
                                    action={
                                        <IconButton>
                                            <MoreVertIcon></MoreVertIcon>
                                        </IconButton>
                                    }
                                    title={item.author?.displayName}
                                    subheader={dayjs(item.createdAt).format('DD/MM/YYYY')}
                                ></CardHeader>
                                <CardContent sx={{ paddingTop: '0' }}>
                                    <Typography variant="body1">{item.title}</Typography>
                                </CardContent>
                                <Box
                                    sx={
                                        item.image.length > 0
                                            ? {
                                                  width: '100%',
                                                  height: '320px',
                                                  backgroundImage: `url(http://localhost:5000/gallery/${item?.author._id}/${item.image[0].filename})`,
                                                  backgroundRepeat: 'no-repeat',
                                                  backgroundSize: 'contain',
                                                  backgroundPosition: 'center',
                                              }
                                            : {
                                                  width: '100%',
                                                  height: '320px',
                                                  backgroundImage: `url(https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg)`,
                                              }
                                    }
                                >
                                    {/* <CardMedia
                                        component="img"
                                        image={
                                            item.image.length > 0
                                                ? `http://localhost:5000/gallery/${item?.author._id}/${item.image[0].filename}`
                                                : ''
                                        }
                                        sx={{ width: '100%', height: '100%' }}
                                    ></CardMedia> */}
                                </Box>
                                <Box className=" border-b-2 mx-2">
                                    <CardActions>
                                        <Box className="flex justify-between w-full ">
                                            <Box>
                                                <IconButton
                                                    aria-label="add to favorites"
                                                    onClick={() => handleLikePost(item._id as string)}
                                                >
                                                    <FavoriteIcon
                                                        key={index}
                                                        sx={item.like.map((data: ILike) =>
                                                            data.isLike && data.user === user?.id
                                                                ? {
                                                                      color: 'red',
                                                                  }
                                                                : { color: 'rgba(0, 0, 0, 0.54)' },
                                                        )}
                                                    />
                                                </IconButton>

                                                <IconButton aria-label="message">
                                                    <ChatBubbleIcon />
                                                </IconButton>
                                                <IconButton aria-label="share">
                                                    <ShareIcon />
                                                </IconButton>
                                                {item.like.length > 0 ? (
                                                    <Typography fontSize={14} fontWeight={500} className="px-3">
                                                        {item.like.length + ' lượt thích'}
                                                    </Typography>
                                                ) : (
                                                    <Fragment></Fragment>
                                                )}
                                            </Box>
                                            <Box className="items-end text-right">
                                                <IconButton aria-label="mark">
                                                    <BookmarkIcon />
                                                </IconButton>
                                            </Box>
                                        </Box>
                                    </CardActions>
                                </Box>
                                {item.comment.length > 0 &&
                                    item.comment.map((comment: IComment, index: number) => (
                                        <Box className="mt-2" key={index}>
                                            <Box className="flex items-center px-2">
                                                <Avatar
                                                    alt="Avatar"
                                                    src="https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg"
                                                    sx={{
                                                        marginLeft: '10px',
                                                        marginRight: '10px',
                                                        cursor: 'pointer',
                                                    }}
                                                />
                                                <Box className=" rounded-2xl bg-gray-100  py-2 px-4 cursor-pointer my-2">
                                                    <Typography fontWeight={700} fontSize={14}>
                                                        {comment.user.displayName}
                                                    </Typography>
                                                    <Typography fontSize={14}>{comment.comment}</Typography>
                                                </Box>
                                            </Box>
                                        </Box>
                                    ))}

                                <Box className="flex items-center pr-4 my-4">
                                    <Avatar
                                        alt="Avatar"
                                        src="https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg"
                                        sx={{ marginLeft: '10px', marginRight: '10px', cursor: 'pointer' }}
                                    />
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        size="small"
                                        placeholder="What's on your mind Victory?"
                                        className="w-full border-0 rounded-lg"
                                        multiline={true}
                                        InputProps={{
                                            startAdornment: <InputAdornment position="start"></InputAdornment>,
                                        }}
                                    />
                                </Box>
                            </Card>
                        </Box>
                    </Fragment>
                ))}
            <Box className="mb-4 flex justify-center">
                {isLoading ? (
                    <Skeleton animation="wave" width={300} sx={{ marginTop: '10px' }} />
                ) : (
                    <Fragment>
                        <FiberManualRecordIcon sx={{ color: 'black' }}></FiberManualRecordIcon>
                        <Typography>Nothing's new on the feed!</Typography>
                    </Fragment>
                )}
            </Box>
        </Box>
    );
};

export default Home;
