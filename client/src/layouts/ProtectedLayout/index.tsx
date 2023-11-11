import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
// import { useEffect, useState } from 'react';

export default function ProtectedLayout() {
    const accessToken = useSelector((state: RootState) => state.user.user?.accessToken);
    // const [check, setCheck] = useState<boolean>(false);

    // useEffect(() => {
    //     if (accessToken) {
    //         setCheck(true);
    //     } else {
    //         setCheck(false);
    //     }
    // }, [check, accessToken]);
    // console.log(accessToken);

    return accessToken ? <Outlet /> : <Navigate to={'/login'}></Navigate>;
}
