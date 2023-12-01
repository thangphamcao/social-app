import { Fragment } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useDeleteCommentPost } from '../../hook';

interface IProps {
    anchorEl: HTMLElement | null;
    open: boolean;
    handleCloseMenu: () => void;
    isEdit: { commentID: string; postID: string };
    openEdit: (data: { commentID: string; postID: string }) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
}

const MenuComment = (props: IProps) => {
    const { anchorEl, handleCloseMenu, open, isEdit, openEdit } = props;

    const handleEditComment = async () => {
        openEdit(isEdit);
        handleCloseMenu();
    };

    const { mutate } = useDeleteCommentPost();

    const handleDeleteComment = async () => {
        mutate(isEdit as { commentID: string; postID: string });
        handleCloseMenu();
    };

    return (
        <Fragment>
            <Menu
                sx={{ boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px ', zIndex: '9', borderRadius: '8px' }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                MenuListProps={{
                    sx: {
                        width: '300px',
                        overflow: 'visible',
                        padding: '10px',
                        borderRadius: '8px',
                        fontSize: '14px',
                        fontWeight: '600',
                    },
                }}
            >
                <MenuItem onClick={handleEditComment}>Edit</MenuItem>
                <MenuItem onClick={handleDeleteComment}>Delete</MenuItem>
            </Menu>
        </Fragment>
    );
};

export default MenuComment;
