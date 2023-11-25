import { Box, Avatar, TextField, Typography, Button, Modal } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import PublicIcon from '@mui/icons-material/Public';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import LockIcon from '@mui/icons-material/Lock';
import PeopleIcon from '@mui/icons-material/People';
import ImageIcon from '@mui/icons-material/Image';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import CloseIcon from '@mui/icons-material/Close';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { Fragment, useState } from 'react';
import { useCreatePost } from '../../../hook';

interface IProps {
    open: boolean;
    close: () => void;
}

const CreatePost = (props: IProps) => {
    const { open, close } = props;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formData: any = new FormData();

    const [type, setType] = useState<string>('0');
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const [input, setInput] = useState<string | null>(null);

    const handleClose = () => {
        close();
        setSelectedImage(null);
        setPreviewImage(null);
    };

    const { mutate: handleCreatePost } = useCreatePost(handleClose);

    const handleChange = (event: SelectChangeEvent) => {
        setType(event.target.value as string);
    };

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const selectImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files) {
            return;
        } else {
            setSelectedImage(e.target.files[0]);
            const url = URL.createObjectURL(e.target.files[0]);
            setPreviewImage(url);
        }
    };

    const handleSubmit = async () => {
        if (input !== null && selectedImage !== null) {
            formData.append('title', input);
            formData.append('postImg', selectedImage, selectedImage!.name);
        } else if (input !== null && selectedImage === null) {
            formData.append('title', input);
        } else {
            formData.append('postImg', selectedImage, selectedImage!.name);
        }
        handleCreatePost(formData);
    };

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        padding: 0,
        borderRadius: '12px',
    };

    return (
        <Fragment>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Box className="text-right">
                        <Button onClick={handleClose}>
                            <CloseIcon className="text-black ml-2 mt-2" />
                        </Button>
                    </Box>
                    <Box className="px-8">
                        <Typography
                            id="modal-modal-title"
                            variant="h6"
                            component="h2"
                            className="text-center"
                            fontWeight={700}
                        >
                            Create Post
                        </Typography>
                    </Box>
                    <Box className="flex justify-left items-center flex-1 px-8 pb-8">
                        <Avatar
                            className="self-start"
                            alt="Avatar"
                            src="https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg"
                            sx={{ marginLeft: '10px', marginRight: '10px', cursor: 'pointer' }}
                        />
                        <Box className="flex-1">
                            <Typography fontWeight={600} className="px-2">
                                Thang
                            </Typography>
                            <FormControl fullWidth size="small">
                                <Box>
                                    <Select
                                        size="small"
                                        className="mx-2"
                                        labelId="typePost"
                                        id="typePost"
                                        value={type}
                                        onChange={handleChange}
                                        sx={{ fontSize: '14px' }}
                                    >
                                        <MenuItem value={0} sx={{ fontSize: '14px', alignItems: 'left' }}>
                                            <PublicIcon fontSize="small" sx={{ marginRight: '3px' }}></PublicIcon>Public
                                        </MenuItem>
                                        <MenuItem value={1} sx={{ fontSize: '14px' }}>
                                            <PeopleIcon fontSize="small" sx={{ marginRight: '3px' }}></PeopleIcon>
                                            Friends
                                        </MenuItem>
                                        <MenuItem value={2} sx={{ fontSize: '14px' }}>
                                            <LockIcon fontSize="small" sx={{ marginRight: '3px' }}></LockIcon>Private
                                        </MenuItem>
                                    </Select>
                                </Box>
                                <Box className="px-2">
                                    <TextField
                                        placeholder="What are you thinking bro?"
                                        fullWidth
                                        variant="standard"
                                        autoFocus={true}
                                        multiline
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleInput(e)}
                                        InputProps={{
                                            disableUnderline: true,
                                        }}
                                    />
                                </Box>

                                <Box className="h-72">
                                    {previewImage && (
                                        <ImageList sx={{ width: '100%' }}>
                                            <ImageListItem>
                                                <img alt="listImage" src={previewImage} />
                                            </ImageListItem>
                                        </ImageList>
                                    )}
                                </Box>

                                <Box className="flex justify-start mt-3">
                                    <Button component="label">
                                        <ImageIcon className="p-0 m-0" fontSize="medium" />
                                        <input
                                            type="file"
                                            hidden
                                            multiple
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => selectImage(e)}
                                        />
                                    </Button>

                                    <Button>
                                        <InsertEmoticonIcon fontSize="medium" />
                                    </Button>
                                    <Button>
                                        <LocationOnIcon fontSize="medium" />
                                    </Button>
                                    <Button>
                                        <GroupAddIcon fontSize="medium" />
                                    </Button>
                                    <Button>
                                        <MoreHorizIcon fontSize="medium" />
                                    </Button>
                                </Box>

                                <Box sx={{ marginLeft: '30%', marginTop: '20px' }}>
                                    <Button variant="contained" onClick={handleSubmit}>
                                        Upload
                                    </Button>
                                </Box>
                            </FormControl>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </Fragment>
    );
};

export default CreatePost;
