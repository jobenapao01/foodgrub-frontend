import { Restaurant } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Dot } from 'lucide-react';

type Props = {
	restaurant: Restaurant;
};

const RestaurantInfo = ({ restaurant }: Props) => {
	return (
		<Card className='border-sla'>
			<CardHeader>
				<CardTitle className='text-3xl font-bold tracking-tight'>{restaurant.restaurantName}</CardTitle>
				<CardDescription>
					{restaurant.city}, {restaurant.country}
				</CardDescription>
			</CardHeader>
			<CardContent className='flex'>
				{restaurant.cuisines.map((cuisine, index) => (
					<span
						className='flex items-center justify-center'
						key={index}
					>
						<span>{cuisine}</span>
						{index < restaurant.cuisines.length - 1 && <Dot className='size-8' />}
					</span>
				))}
			</CardContent>
		</Card>
	);
};

export default RestaurantInfo;
