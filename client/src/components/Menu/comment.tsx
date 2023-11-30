import { Fragment } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { useDeleteCommentPost } from '../../hook';
// import { UseQueryResult } from 'react-query';
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
        // console.log(isEdit);
        openEdit(isEdit);
        handleCloseMenu();
    };
    // console.log(getCommentPost.data);

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
//<List
// sx={{
//     width: '200px',
//     backgroundColor: 'white',
//     padding: ' 8px 6px',
//     margin: '0',
//     borderRadius: '8px',
//     fontSize: '14px',
//     fontWeight: '600',
//     zIndex: '9',
//     boxShadow: 'rgba(0, 0, 0, 0.2) 0px 12px 28px 0px ',
// }}
// >
// <ListItem sx={{ padding: '0', margin: '0' }}>
//     <ListItemButton>
//         <ListItemIcon sx={{ color: 'black' }}>Edit</ListItemIcon>
//     </ListItemButton>
// </ListItem>
// <ListItem sx={{ padding: '0', margin: '0' }}>
//     <ListItemButton>
//         <ListItemIcon sx={{ color: 'black' }}>Delete</ListItemIcon>
//     </ListItemButton>
// </ListItem>
// </List>
