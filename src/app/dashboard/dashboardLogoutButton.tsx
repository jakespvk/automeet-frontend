import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";

export default function DashboardLogoutButton() {
	const { logout } = useAuth();

	return (
		<div className="flex items-center justify-center">
			<Button className="w-36 hover:backdrop-blur-3xl" variant="outline" onClick={logout}>Logout</Button>
		</div>
	);
}
