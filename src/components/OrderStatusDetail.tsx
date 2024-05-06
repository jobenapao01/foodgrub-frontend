import { Order } from '@/types';
import { Separator } from './ui/separator';

type Props = {
	order: Order;
};

const OrderStatusDetail = ({ order }: Props) => {
	return (
		<div className='space-y-5'>
			<div className='flex flex-col'>
				<span className='font-bold'>Delivering to:</span>
				<span className='text-muted-foreground'>{order.deliveryDetails.name}</span>
				<span className='text-muted-foreground'>
					{order.deliveryDetails.addressLine1}, {order.deliveryDetails.city}
				</span>
			</div>

			<div className='flex flex-col'>
				<span className='font-bold'>Your order:</span>
				<ul>
					{order.cartItems.map((order) => (
						<li key={order.menuItemId}>
							{order.name} * {order.quantity}
						</li>
					))}
				</ul>
			</div>

			<Separator />

			<div className='flex flex-col'>
				<span className='font-bold'>Total</span>
				<span>₱ {(order.totalAmount / 100).toFixed(2)}</span>
			</div>
		</div>
	);
};

export default OrderStatusDetail;
