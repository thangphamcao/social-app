import Header from '../../components/Header';
import { SidebarLeft } from '../../components/Sidebar';
import { SidebarRight } from '../../components/Sidebar';
import { Outlet } from 'react-router-dom';
import { useTheme, useMediaQuery } from '@mui/material';
import { Fragment } from 'react';

const MainLayout = () => {
    const theme = useTheme();

    const isMatch = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <div className="App">
            {isMatch ? (
                <Fragment>
                    <Header />
                    <div className="w-full mt-20 flex px-12 justify-between ">
                        <Outlet context={isMatch} />
                    </div>
                </Fragment>
            ) : (
                <Fragment>
                    <Header />
                    <div className="w-full mt-20 flex px-12 justify-between  ">
                        <SidebarLeft />
                        <Outlet />
                        <SidebarRight />
                    </div>
                </Fragment>
            )}
        </div>
    );
};

export default MainLayout;
