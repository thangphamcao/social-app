import { Fragment } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Settings from '@mui/icons-material/Settings';
import ListItemIcon from '@mui/material/ListItemIcon';
import Logout from '@mui/icons-material/Logout';
import Avatar from '@mui/material/Avatar';
import { Box, Typography } from '@mui/material';
import { IUser } from '../../interface';

import { useDispatch } from 'react-redux';
import { logOutFailure, logOutStart, logOutSuccess } from '../../redux/UserSlice';
import { clearPost } from '../../redux/PostSlice';
import { useMutation } from 'react-query';
import { logOutUser } from '../../utils';

interface IProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    handleClose: () => void;
    user: IUser | null;
}

const MenuAvatar = (props: IProps) => {
    const { anchorEl, handleClose, open, user } = props;
    const dispatch = useDispatch();

    const { mutate: handlelogOutUser } = useMutation({
        mutationKey: 'logOut',
        mutationFn: () => logOutUser(user?.id as string),
        onSuccess: () => {
            dispatch(clearPost());
            dispatch(logOutSuccess());
        },
    });

    const cssMenuItem = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: ' 50px',
        borderRadius: '8px',
        padding: '5px 0',
    };

    const cssMenu = {
        borderRadius: '8px',
        margin: '5px 0',
    };

    const handlelogOut = async () => {
        try {
            dispatch(logOutStart());
            handlelogOutUser();
        } catch (err) {
            if (err instanceof Error) {
                dispatch(logOutFailure(err.message));
            }
        }
    };

    return (
        <Fragment>
            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                sx={{ marginTop: '5px' }}
                open={open}
                onClose={handleClose}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                MenuListProps={{
                    sx: {
                        width: '300px',
                        overflow: 'visible',
                        padding: '10px',
                        borderRadius: '8px',
                    },
                }}
            >
                <MenuItem sx={{ borderRadius: '8px', marginBottom: '5px' }}>
                    <Box sx={cssMenuItem}>
                        <Avatar
                            sizes="small"
                            alt="Avatar"
                            src={user?.avatar ? `http://localhost:5000/gallery/${user?.id}/${user.avatar}` : ''}
                        />

                        <Typography className="text-base px-3 font-semibold">{user!.displayName}</Typography>
                    </Box>
                </MenuItem>

                <MenuItem sx={cssMenu}>
                    <Box sx={cssMenuItem}>
                        <ListItemIcon>
                            <Settings fontSize="small" sx={{ marginLeft: '7px' }} />
                        </ListItemIcon>
                        <Typography className="text-base font-medium">Settings</Typography>
                    </Box>
                </MenuItem>

                <MenuItem sx={cssMenu}>
                    <Box sx={cssMenuItem}>
                        <ListItemIcon>
                            <Settings fontSize="small" sx={{ marginLeft: '7px' }} />
                        </ListItemIcon>
                        <Typography className="text-base font-medium">Settings</Typography>
                    </Box>
                </MenuItem>

                <MenuItem sx={cssMenu}>
                    <Box sx={cssMenuItem}>
                        <ListItemIcon>
                            <Settings fontSize="small" sx={{ marginLeft: '7px' }} />
                        </ListItemIcon>
                        <Typography className="text-base font-medium">Settings</Typography>
                    </Box>
                </MenuItem>

                <MenuItem sx={cssMenu}>
                    <Box sx={cssMenuItem}>
                        <ListItemIcon>
                            <Settings fontSize="small" sx={{ marginLeft: '7px' }} />
                        </ListItemIcon>
                        <Typography className="text-base font-medium">Settings</Typography>
                    </Box>
                </MenuItem>

                <MenuItem sx={cssMenu} onClick={handlelogOut}>
                    <ListItemIcon>
                        <Logout fontSize="small" sx={{ marginLeft: '7px' }} />
                    </ListItemIcon>
                    <Typography className="text-base font-medium">Log out</Typography>
                </MenuItem>
            </Menu>
        </Fragment>
    );
};

export default MenuAvatar;
