import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import delLocalStorage from './../../utils/delLocalStorage';
import PostAddIcon from '@mui/icons-material/PostAdd';
import NewPostModal from './../post/NewPostModal';
import router from 'next/router';
import ArticleIcon from '@mui/icons-material/Article';

const AccountMenu = ({ anchorEl, open, handleClose, user }) => {
    const [openPM, setOpenPM] = useState(false);
    const handleOpenPM = () => setOpenPM(true);
    const handleClosePM = () => setOpenPM(false);

    return (
        <>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <MenuItem onClick={() => router.push(`/${user?.username}?tab=overview`)}>
                    <Avatar>{user?.username?.charAt(0)}</Avatar> {user?.username}
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleOpenPM}>
                    <ListItemIcon>
                        <PostAddIcon fontSize="small" />
                    </ListItemIcon>
                    New idea
                </MenuItem>
                <MenuItem onClick={() => router.push(`/${user?.username}?tab=posts`)}>
                    <ListItemIcon>
                        <ArticleIcon fontSize="small" />
                    </ListItemIcon>
                    Ideas
                </MenuItem>
                <MenuItem onClick={() => router.push(`/${user?.username}?tab=settings`)}>
                    <ListItemIcon>
                        <Settings fontSize="small" />
                    </ListItemIcon>
                    Settings
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => delLocalStorage()}>
                    <ListItemIcon>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    Logout
                </MenuItem>
            </Menu>
            <NewPostModal open={openPM} handleClose={handleClosePM} />
        </>
    );
}

export default AccountMenu;