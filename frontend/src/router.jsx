import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import Tasks from './pages/Tasks';
import Profile from './pages/Profile';
import Register from './pages/Register';
import AuthenticatedLayout from './components/AuthenticatedLayout';
import GuestLayout from './components/GuestLayout';

const router = createBrowserRouter([
	{
		path: '/',
		element: <GuestLayout />,
		children: [
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/register',
				element: <Register />,
			},
		],
	},

	{
		path: '/',
		element: <AuthenticatedLayout />,
		children: [
			{
				path: '/tasks',
				element: <Tasks />,
			},
			{
				path: '/profile',
				element: <Profile />,
			},
		],
	},
]);

export default router;