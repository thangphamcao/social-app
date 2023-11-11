import { RouteObject } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import ProtectedLayout from '../layouts/ProtectedLayout';
import ErrorLayout from '../layouts/ErrorLayout';

const router: RouteObject[] = [
    {
        errorElement: <ErrorLayout />,
        children: [
            {
                element: <ProtectedLayout />,
                children: [
                    {
                        element: <MainLayout />,
                        children: [
                            {
                                element: <Home />,
                                path: '/',
                            },
                        ],
                    },
                ],
            },
            {
                element: <Login />,
                path: '/login',
            },
            {
                element: <SignUp />,
                path: '/signup',
            },
            {
                element: <ErrorLayout />,
                path: '*',
            },
        ],
    },
];

export default router;
