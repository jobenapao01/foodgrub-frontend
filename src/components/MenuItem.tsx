import { MenuItem as MenuItemType } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

type Props = {
	menuItem: MenuItemType;
	addToCart: () => void;
};

const MenuItem = ({ menuItem, addToCart }: Props) => {
	return (
		<Card
			className='cursor-pointer'
			onClick={addToCart}
		>
			<div className='flex  items-center justify-between'>
				<CardHeader>
					<CardTitle>{menuItem.name}</CardTitle>
				</CardHeader>
				<CardContent className='font-bold py-3'>₱{menuItem.price.toFixed(2)}</CardContent>
			</div>
		</Card>
	);
};

export default MenuItem;
