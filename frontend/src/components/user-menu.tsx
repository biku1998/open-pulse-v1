import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function UserMenu() {
  return (
    <Avatar>
      <AvatarImage src="https://github.com/biku1998.png" alt="@biku" />
      <AvatarFallback>BK</AvatarFallback>
    </Avatar>
  );
}
