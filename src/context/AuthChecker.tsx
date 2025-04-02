import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface User {
    email: string;
    subscription: boolean;
    db_type: string;
    columns: string[];
    column_limit: number;
    row_limit: number;
    login_token: string;
}

export default function AuthChecker() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("authToken");
            try {
                const response = await fetch(`${API_BASE_URL}/verify?token=${token}`, {});

                if (response.ok) {
                    const data = await response.json();
                    setUser(data.user);
                } else {
                    // Handle unauthorized
                    setUser(null);
                }
            } catch (error) {
                console.error("Authentication error:", error);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();

        // Set up interval to check auth periodically
        const interval = setInterval(checkAuth, 5000); // Check every 5 seconds

        return () => clearInterval(interval);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return null; // Or redirect to login page
    }

    return user;
}
