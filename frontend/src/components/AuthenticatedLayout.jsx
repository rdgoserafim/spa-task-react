import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../contexts/AuthContext';

export default function DefaultLayout() {
	const { user, setUser, headers } = useAuth();

	const [ menu, _setMenu ] = useState(false);

	const togleMenu = () => {
        _setMenu(!menu)
    }

	// check if user is logged in or not from server
	useEffect(() => {
		(async () => {
			try {
				const resp = await axios.get('/user', headers() );
				if (resp.status === 200) {
					setUser(resp.data.data);
				}
			} catch (error) {
				if (error.response.status === 401) {
					localStorage.removeItem('user');
					localStorage.removeItem('token');
					window.location.href = '/login';
				}
			}
		})();
	}, []);

	// if user is not logged in, redirect to login page
	if (!user) {
		return <Navigate to="/" />;
	}

	// logout user
	const handleLogout = async () => {
        console.log( headers() );
		try {
			const resp = await axios.post('/logout',{}, headers() );
			if (resp.status === 200) {
				localStorage.removeItem('user');
                localStorage.removeItem('token');
				window.location.href = '/login';
			}
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
				<div className="container flex flex-wrap items-center justify-between mx-auto">
					<a href="#" className="flex items-center">
						<img
							src="/public/vite.svg"
							className="h-6 mr-3 sm:h-9"
							alt="Task Logo"
						/>
						<span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
							Task
						</span>
					</a>
					<button
						onClick={togleMenu}
						type="button"
						className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
					>
						<span className="sr-only">Abrir Menu</span>
						<svg
							className="w-6 h-6"
							aria-hidden="true"
							fill="currentColor"
							viewBox="0 0 20 20"
							xmlns="http://www.w3.org/2000/svg">
							<path
								fillRule="evenodd"
								d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
								clipRule="evenodd"></path>
						</svg>
					</button>
					{menu && (
						<div className="w-full md:block md:w-auto">
							<ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
								<li>
									<NavLink
										to="/profile"
										className={({ isActive }) =>
											isActive
												? 'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white'
												: 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-white'
										}>
										Perfil
									</NavLink>
								</li>
								<li>
									<NavLink
										to="/tasks"
										className={({ isActive }) =>
											isActive
												? 'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white'
												: 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-white'
										}>
										Tarefas
									</NavLink>
								</li>

								<li>
									<a
										onClick={handleLogout}
										href="#"
										className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
										Sair
									</a>
								</li>
							</ul>
						</div>
					)}

					<div className="w-full md:block md:w-auto hidden">
						<ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
							<li>
								<NavLink
									to="/profile"
									className={({ isActive }) =>
										isActive
											? 'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white'
											: 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-white'
									}>
									Perfil
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/tasks"
									className={({ isActive }) =>
										isActive
											? 'block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white'
											: 'block py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 dark:text-gray-400 md:dark:hover:text-white'
									}>
									Tarefas
								</NavLink>
							</li>

							<li>
								<a
									onClick={handleLogout}
									href="#"
									className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">
									Sair
								</a>
							</li>
						</ul>
					</div>
				</div>
			</nav>
			<main className="flex justify-center flex-col items-center mt-10 p-2">
				<Outlet />
			</main>
		</>
	);
}