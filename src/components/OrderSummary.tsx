import { CartItem } from '@/pages/DetailPage';
import { Restaurant } from '@/types';
import { CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { Trash } from 'lucide-react';

type Props = {
	restaurant: Restaurant;
	cartItems: CartItem[];
	removeFromCart: (cartItem: CartItem) => void;
};

const OrderSummary = ({ cartItems, restaurant, removeFromCart }: Props) => {
	const getTotalCost = () => {
		const totalCost = cartItems.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0);

		const totalWithDelivery = totalCost + restaurant.deliveryPrice;

		return totalWithDelivery.toFixed(2);
	};
	return (
		<>
			<CardHeader>
				<CardTitle className='text-2xl font-bold tracking-tight flex justify-between'>
					<span>Your Order</span>
					<span>₱{getTotalCost()}</span>
				</CardTitle>
			</CardHeader>

			<CardContent className='flex flex-col gap-5'>
				{cartItems.map((item) => (
					<div
						className='flex justify-between'
						key={item._id}
					>
						<span>
							<Badge
								variant='outline'
								className='mr-2'
							>
								{item.quantity}
							</Badge>
							{item.name}
						</span>

						<span className='flex items-center gap-1'>
							₱{(item.price * item.quantity).toFixed(2)}
							<Trash
								className='size-5 cursor-pointer'
								color='red'
								onClick={() => removeFromCart(item)}
							/>
						</span>
					</div>
				))}

				<Separator />
				<div className='flex justify-between'>
					<span>Delivery</span>
					<span>₱{restaurant.deliveryPrice.toFixed(2)}</span>
				</div>
				<Separator />
			</CardContent>
		</>
	);
};

export default OrderSummary;
