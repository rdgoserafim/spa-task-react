// import React from 'react';
import { Navigate, Outlet, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function GuestLayout() {
	const { user } = useAuth();

	// if user is logged in, redirect to profile page
	if (user) {
		return <Navigate to="/tasks" />;
	}
	return (
		<>
            <div className=''>
                <Outlet />
                <div className='flex w-full justify-center gap-x-12 py-24'>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        <Link
                            to="/login"
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                            Entrar
                        </Link>
                    </p>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        <Link
                            to="/register"
                            className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                            Criar Conta
                        </Link>
                    </p>
                </div>
            </div>
		</>
	);
}