"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

export default function MagicAuth() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { login } = useAuth();
	const token = searchParams.get('token');


	useEffect(() => {
		if (!token) return;

		const authenticate = async () => {
			await login(token);
			router.replace('/dashboard');
		};

		authenticate();
	}, [token, login, router]);

	return <p>Verifying...</p>;
}
