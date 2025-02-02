'use client';

import { createContext, useContext, useState } from 'react';

type User = {
	email: string;
	subscription: boolean;
	db_type: string;
	columns: string[];
	column_limit: number;
	row_limit: number;
	login_token: string;
}

interface AuthContextType {
	isLoggedIn: boolean;
	token?: string;
	email?: string;
	user?: User;
	login: (token: string) => Promise<void>;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
	isLoggedIn: false,
	token: undefined,
	email: undefined,
	user: undefined,
	login: async () => { },
	logout: () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isLoggedIn, setIsLoggedIn] = useState(() => {
		if (typeof window !== 'undefined' && window.localStorage) {
			const token = localStorage.getItem('authToken');
			return !!token;
		}
		return false;
	});

	const login = async (token: string) => {
		try {
			const response = await fetch(`http://localhost:8000/verify?token=${token}`);
			if (response.ok) {
				setIsLoggedIn(true);
				localStorage.setItem('authToken', token);
			} else {
				console.error('Token verification failed');
			}
		} catch (error) {
			console.error('Error during login:', error);
		}
	};

	const logout = () => {
		setIsLoggedIn(false);
		localStorage.removeItem('authToken');
	};

	if (isLoggedIn === null) {
		return <div>Loading...</div>;
	}

	return (
		<AuthContext.Provider value={{ isLoggedIn, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
