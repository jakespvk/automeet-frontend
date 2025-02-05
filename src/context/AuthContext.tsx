'use client';

import { createContext, useContext, ReactNode, useState, useEffect } from "react";

type User = {
	email: string;
	subscription: boolean;
	db_type: string;
	columns: string[];
	column_limit: number;
	row_limit: number;
	login_token: string;
	api_url: string;
	api_key: string;
}

type AuthContextType = {
	user: User | null;
	loading: boolean;
	checkAuth: () => Promise<void>;
	// Add other auth-related methods here
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);

	// Use the continuous login check logic here
	const checkAuth = async () => {
		const token = localStorage.getItem("authToken");
		try {
			const response = await fetch(`http://localhost:8000/verify?token=${token}`, {});

			if (response.ok) {
				if (token) {
					localStorage.setItem("authToken", token);
				}
				const userData = await response.json();
				setUser(userData.user);
			} else {
				setUser(null);
			}
		} catch (error) {
			console.error("Error checking auth:", error);
			setUser(null);
		} finally {
			setLoading(false);
		}
	};
	useEffect(() => {
		// Initial check
		checkAuth();

		// Set up interval to periodically check auth
		const interval = setInterval(checkAuth, 120000);

		return () => {
			clearInterval(interval);
		};
	}, []);

	return (
		<AuthContext.Provider value={{ user, loading, checkAuth }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);

// import { createContext, useContext, useEffect, useState } from 'react';
//
// type User = {
// 	email: string;
// 	subscription: boolean;
// 	db_type: string;
// 	columns: string[];
// 	column_limit: number;
// 	row_limit: number;
// 	login_token: string;
// }
//
// interface AuthContextType {
// 	isLoggedIn: boolean;
// 	token?: string;
// 	email?: string;
// 	user?: User;
// 	login: (token: string) => Promise<void>;
// 	logout: () => void;
// }
//
// const AuthContext = createContext<AuthContextType>({
// 	isLoggedIn: false,
// 	token: undefined,
// 	email: undefined,
// 	user: undefined,
// 	login: async () => { },
// 	logout: () => { },
// });
//
// export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
//
// 	const [user, setUser] = useState<User | null>(null);
// 	const [loading, setLoading] = useState(true);
//
// 	useEffect(() => {
// 		const checkAuth = async () => {
// 			const token = localStorage.getItem("authToken");
// 			try {
// 				const response = await fetch(`http://localhost:8000/verify?token=${token}`, {});
//
// 				if (response.ok) {
// 					const data = await response.json();
// 					setUser(data.user);
// 				} else {
// 					// Handle unauthorized
// 					setUser(null);
// 				}
// 			} catch (error) {
// 				console.error("Authentication error:", error);
// 				setUser(null);
// 			} finally {
// 				setLoading(false);
// 			}
// 		};
//
// 		checkAuth();
//
// 		// Set up interval to check auth periodically
// 		const interval = setInterval(checkAuth, 5000); // Check every 5 seconds
//
// 		return () => clearInterval(interval);
// 	}, []);
//
// 	if (loading) {
// 		return <div>Loading...</div>;
// 	}
//
// 	if (!user) {
// 		return null; // Or redirect to login page
// 	}
//
// 	return user;
// 	// const [isLoggedIn, setIsLoggedIn] = useState(() => {
// 	// 	if (typeof window !== 'undefined' && window.localStorage) {
// 	// 		const token = localStorage.getItem('authToken');
// 	// 		return !!token;
// 	// 	}
// 	// 	return false;
// 	// });
// 	// const [user, setUser] = useState<User | undefined>(undefined);
// 	//
// 	// const login = async (token: string) => {
// 	// 	try {
// 	// 		const response = await fetch(`http://localhost:8000/verify?token=${token}`);
// 	// 		if (response.ok) {
// 	// 			const data = await response.json();
// 	// 			setUser(data.user);
// 	// 			setIsLoggedIn(true);
// 	// 			localStorage.setItem('authToken', token);
// 	// 		} else {
// 	// 			console.error('Token verification failed');
// 	// 		}
// 	// 	} catch (error) {
// 	// 		console.error('Error during login:', error);
// 	// 	}
// 	// };
// 	//
// 	// const logout = () => {
// 	// 	setIsLoggedIn(false);
// 	// 	localStorage.removeItem('authToken');
// 	// };
// 	//
// 	// if (isLoggedIn === null) {
// 	// 	return <div>Loading...</div>;
// 	// }
//
// 	return (
// 		<AuthContext.Provider value={{ user, isLoggedIn, login, logout }}>
// 			{children}
// 		</AuthContext.Provider>
// 	);
// };
//
// export const useAuth = () => useContext(AuthContext);
