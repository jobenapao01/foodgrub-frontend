import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { manageRestaurantFormSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import DetailsSection from './DetailsSection';
import { Separator } from '@/components/ui/separator';
import CuisinesSection from './CuisinesSection';
import MenuSection from './MenuSection';
import ImageSection from './ImageSection';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { Restaurant } from '@/types';
import { useEffect } from 'react';

type RestaurantFormData = z.infer<typeof manageRestaurantFormSchema>;

type Props = {
	restaurant?: Restaurant;
	onSave: (restaurantFormData: FormData) => void;
	isLoading: boolean;
	btnText: string;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant, btnText }: Props) => {
	const form = useForm<RestaurantFormData>({
		resolver: zodResolver(manageRestaurantFormSchema),
		defaultValues: {
			restaurantName: '',
			city: '',
			country: '',
			deliveryPrice: 0,
			estimatedDeliveryTime: 0,
			cuisines: [],
			menuItems: [{ name: '', price: 0 }],
		},
	});

	useEffect(() => {
		if (!restaurant) {
			return;
		}

		const deliveryPriceFormatted = parseInt(restaurant.deliveryPrice.toFixed(2));

		const menuItemsFormatted = restaurant.menuItems.map((menuItem) => ({
			...menuItem,
			price: parseInt(menuItem.price.toFixed(2)),
		}));

		const updatedRestaurant = {
			...restaurant,
			deliveryPrice: deliveryPriceFormatted,
			menuItems: menuItemsFormatted,
		};

		form.reset(updatedRestaurant);
	}, [form, restaurant]);

	const onSubmit = (formDataJSON: RestaurantFormData) => {
		const formData = new FormData();

		formData.append('restaurantName', formDataJSON.restaurantName);
		formData.append('city', formDataJSON.city);
		formData.append('country', formDataJSON.country);
		formData.append('deliveryPrice', formDataJSON.deliveryPrice.toString());
		formData.append('estimatedDeliveryTime', formDataJSON.estimatedDeliveryTime.toString());
		formDataJSON.cuisines.forEach((cuisine, index) => {
			formData.append(`cuisines[${index}]`, cuisine);
		});

		formDataJSON.menuItems.forEach((menuItem, index) => {
			formData.append(`menuItems[${index}][name]`, menuItem.name);
			formData.append(`menuItems[${index}][price]`, menuItem.price.toString());
		});

		if (formDataJSON.imageFile) {
			formData.append('imageFile', formDataJSON.imageFile);
		}

		onSave(formData);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className='space-y-8 bg-gray-50 p-10 rounded-lg'
			>
				<DetailsSection />
				<Separator />

				<CuisinesSection />
				<Separator />

				<MenuSection />
				<Separator />

				<ImageSection />

				{isLoading ? (
					<LoadingButton>Submitting</LoadingButton>
				) : (
					<Button
						type='submit'
						className='bg-orange-500 w-full'
					>
						{btnText}
					</Button>
				)}
			</form>
		</Form>
	);
};

export default ManageRestaurantForm;
