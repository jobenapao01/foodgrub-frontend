import { useAuth0 } from '@auth0/auth0-react';
import UserAvatar from './UserAvatar';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';
import { LogOutIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserMenu = () => {
	const { user, logout } = useAuth0();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger>
				<UserAvatar img={user?.picture} />
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<DropdownMenuLabel className='text-sm text-muted-foreground'>{user?.email}</DropdownMenuLabel>
				<DropdownMenuSeparator className='bg-orange-500' />
				<DropdownMenuItem>
					<Link
						to='/manage-restaurant'
						className='w-full p-1 font-bold rounded-md hover:bg-orange-500 hover:text-white'
					>
						Manage Restaurant
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link
						to='/order-status'
						className='w-full p-1 font-bold rounded-md hover:bg-orange-500 hover:text-white'
					>
						Order Status
					</Link>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<Link
						to='/user-profile'
						className='w-full p-1 font-bold rounded-md hover:bg-orange-500 hover:text-white'
					>
						Profile
					</Link>
				</DropdownMenuItem>

				<DropdownMenuItem className='mx-auto'>
					<Button
						asChild
						className='w-full bg-orange-500 cursor-pointer hover:bg-orange-600 hover:text-white'
						onClick={() => logout()}
					>
						<span>
							<LogOutIcon className='mr-2 size-4' />
							Log out
						</span>
					</Button>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserMenu;
