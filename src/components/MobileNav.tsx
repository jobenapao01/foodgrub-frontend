import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { useAuth0 } from "@auth0/auth0-react";
import UserAvatar from "./UserAvatar";
import MobileNavLinks from "./MobileNavLinks";

const MobileNav = () => {
  const { isAuthenticated, loginWithRedirect, user, logout } = useAuth0();
  return (
    <Sheet>
      <SheetTrigger>
        <HamburgerMenuIcon className="text-orange-500 size-6" />
      </SheetTrigger>
      <SheetContent className="space-y-3">
        <SheetHeader>
          <SheetTitle>
            {isAuthenticated ? (
              <span className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
                <UserAvatar img={user?.picture} />
                {user?.email}
              </span>
            ) : (
              <span>Welcome to FoodGrub</span>
            )}
          </SheetTitle>
          <Separator className="bg-orange-500" />
          <div className="flex">
            {isAuthenticated ? (
              <MobileNavLinks logout={logout} />
            ) : (
              <Button
                className="flex-1 font-bold"
                onClick={async () => await loginWithRedirect()}
              >
                Login
              </Button>
            )}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
