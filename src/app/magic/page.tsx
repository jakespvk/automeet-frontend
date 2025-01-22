"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

function MagicAuth() {
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

	return (
		<p>Verifying...</p>
	);
}

export default function MagicAuthSuspensed() {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<MagicAuth />
		</Suspense>
	);
}
