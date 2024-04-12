import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { LogOutIcon } from 'lucide-react';

type Props = {
	logout: () => void;
};

const MobileNavLinks = ({ logout }: Props) => {
	return (
		<div className='flex flex-col w-full gap-3'>
			<Link
				to='/manage-restaurant'
				className='flex items-center p-2 font-bold text-black bg-white rounded-lg hover:text-white hover:bg-orange-500'
			>
				Manage Restaurant
			</Link>
			<Link
				to='/user-profile'
				className='flex items-center p-2 font-bold text-black bg-white rounded-lg hover:text-white hover:bg-orange-500'
			>
				Profile
			</Link>
			<Button
				className='flex items-center w-full px-3 font-bold bg-orange-500 hover:bg-orange-600'
				onClick={() => logout()}
			>
				<span className='flex items-center gap-2'>
					<LogOutIcon className='size-4' />
					Logout
				</span>
			</Button>
		</div>
	);
};

export default MobileNavLinks;
