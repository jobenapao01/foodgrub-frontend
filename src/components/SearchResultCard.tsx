import { Restaurant } from '@/types';
import { Link } from 'react-router-dom';
import { AspectRatio } from './ui/aspect-ratio';
import { Banknote, Clock, Dot } from 'lucide-react';

type Props = {
	restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
	return (
		<Link
			to={`/detail/${restaurant._id}`}
			className='grid lg:grid-cols-[2fr_3fr] group gap-5'
		>
			<AspectRatio ratio={16 / 6}>
				<img
					src={restaurant?.imageUrl}
					alt='1920/800'
					className='w-full h-full rounded-md object-cover'
				/>
			</AspectRatio>
			<div>
				<h3 className='text-2xl font-bold tracking-tight mb-2 group-hover:underline'>{restaurant.restaurantName}</h3>
				<div
					id='card-content'
					className='grid md:grid-cols-2 gap-2'
				>
					<div className='flex flex-row flex-wrap'>
						{restaurant.cuisines.map((cuisine, index) => (
							<span
								className='flex'
								key={index}
							>
								<div className='flex items-center justify-center'>
									<span>{cuisine}</span>
									{index < restaurant.cuisines.length - 1 && <Dot className='size-8' />}
								</div>
							</span>
						))}
					</div>

					<div className='flex gap-2 flex-col'>
						<div className='flex items-center gap-1  text-green-600'>
							<Clock className='text-green-600 size-4' />
							{restaurant.estimatedDeliveryTime} mins
						</div>

						<div className='flex items-center gap-1'>
							<Banknote className='size-4' />
							Delivery fee {restaurant.deliveryPrice.toFixed(2)}
						</div>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default SearchResultCard;
