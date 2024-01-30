import { Link, useNavigate } from "react-router-dom";
import { LogOut, Settings } from "lucide-react";
import { logout } from "../auth/api";
import { useGetUser } from "../auth/user-store";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function UserMenu() {
  const user = useGetUser();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    navigate("/auth/login", { replace: true });
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="border border-white hover:border-primary transition-colors duration-200">
          <AvatarFallback>{user.email.slice(0, 2)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-8 w-[180px]">
        <DropdownMenuLabel>
          <h6 className="text-sm text-zinc-600">My Account</h6>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link className="flex items-center" to="/setting">
            <Settings className="w-4 h-4 mr-2 text-zinc-500" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center cursor-pointer"
          onClick={handleLogoutClick}
        >
          <LogOut className="w-4 h-4 mr-2 text-zinc-500" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
