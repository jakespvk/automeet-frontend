"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { useEffect } from "react";
import { useAuth } from "@/context/AuthContext";

function MagicAuth() {
	const { checkAuth } = useAuth();
	const searchParams = useSearchParams();
	const router = useRouter();
	const token = searchParams.get('token');


	useEffect(() => {
		if (!token) return;

		localStorage.setItem('authToken', token);
		checkAuth();
		router.replace('/dashboard');
	}, []);

	return (
		<p>Verifying...</p>
	);
}

export default function MagicAuthSuspensed() {
	return (
		<Suspense
			fallback={<div
				className="flex justify-center items-center h-svh w-full">
				Loading...
			</div>}>
			<MagicAuth />
		</Suspense>
	);
}
