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
	logout: () => void;
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
			const response = await fetch(`/verify?token=${token}`, {});

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

	const logout = () => {
		localStorage.removeItem('authToken');
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, loading, checkAuth, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = () => useContext(AuthContext);
