import React, { useState } from 'react';
import { Drawer, IconButton, List, ListItemButton, ListItemIcon, ListItemText, Box, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const pages = ['Home', 'About', 'FAQs', 'Logout'];

const DrawerComp = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const navigate = useNavigate();

    const handleMoveto = (index: number) => {
        if (index === 3) {
            navigate('/login');
        } else {
            setOpenDrawer(false);
            navigate('/');
        }
    };

    return (
        <React.Fragment>
            <Drawer anchor="left" open={openDrawer} onClose={() => setOpenDrawer(false)}>
                <List className="flex flex-col items-center" sx={{ width: '200px', marginTop: '30px' }}>
                    <Box className="flex justify-center flex-col items-center">
                        <Box>
                            <img
                                alt="avatar"
                                src="https://png.pngtree.com/png-vector/20191101/ourlarge/pngtree-male-avatar-simple-cartoon-design-png-image_1934458.jpg"
                                className="w-[70px]"
                            />
                        </Box>
                        <Box className="cursor-pointer">
                            <Typography fontSize={22} className="text-center">
                                Victory
                            </Typography>
                        </Box>
                    </Box>
                    {pages.map((page, index) => (
                        <ListItemButton key={index} onClick={() => handleMoveto(index)}>
                            <ListItemIcon>
                                <ListItemText>{page}</ListItemText>
                            </ListItemIcon>
                        </ListItemButton>
                    ))}
                </List>
            </Drawer>
            <IconButton sx={{ color: 'black', marginLeft: 'auto' }} onClick={() => setOpenDrawer(!openDrawer)}>
                <MenuIcon sx={{ color: 'black' }} />
            </IconButton>
        </React.Fragment>
    );
};

export default DrawerComp;
