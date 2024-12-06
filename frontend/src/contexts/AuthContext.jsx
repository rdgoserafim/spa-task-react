import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../axios';

const AuthContent = createContext({
	user: null,
	setUser: () => {},
	csrfToken: () => {},
	token: null,
	setToken: () => {},
	headers: () => {}
});

export const AuthProvider = ({ children }) => {
	const [user, _setUser] = useState(
		JSON.parse(localStorage.getItem('user')) || null
	);

	const [token, _setToken] = useState(
		localStorage.getItem('token') || null
	);

	// set user to local storage
	const setUser = (user) => {
		if (user) {
			localStorage.setItem('user', JSON.stringify(user));
		} else {
			localStorage.removeItem('user');
		}
		_setUser(user);
	};

	const setToken = (token) => {
		if (token) {
			localStorage.setItem('token', token);
		} else {
			localStorage.removeItem('token');
		}
		_setToken(token);
	};

	const headers = () => {
		return { headers: { Accept: 'application/json', Authorization: 'Bearer ' + token }}
	}
	// csrf token generation for guest methods
	const csrfToken = async () => {
		await axios.get('http://localhost:8001/sanctum/csrf-cookie');
		return true;
	};

	return (
		<AuthContent.Provider value={{ user, setUser, csrfToken, setToken, headers, token }}>
			{children}
		</AuthContent.Provider>
	);
};

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
};

export const useAuth = () => {
	return useContext(AuthContent);
};