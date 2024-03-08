import { UserCircle2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Props = {
  img?: string;
};

const UserAvatar = ({ img }: Props) => {
  return (
    <Avatar>
      <AvatarImage src={img} alt="User Profile" />
      <AvatarFallback>
        <UserCircle2 className="size-7" />
      </AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
