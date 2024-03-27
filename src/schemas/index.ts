import { z } from 'zod';

export const userProfileFormSchema = z.object({
	email: z.string().optional(),
	name: z.string().min(1, 'Name is required'),
	addressLine1: z.string().min(1, 'AddressLine1 is required'),
	city: z.string().min(1, 'City is required'),
	country: z.string().min(1, 'Country is required'),
});

export const manageRestaurantFormSchema = z
	.object({
		restaurantName: z.string({
			required_error: 'Restaurant name is required.',
		}),
		city: z.string({
			required_error: 'City is required.',
		}),
		country: z.string({
			required_error: 'Country is required.',
		}),
		deliveryPrice: z.coerce.number({
			required_error: 'Delivery price is required.',
			invalid_type_error: 'Must be a valid number.',
		}),
		estimatedDeliveryTime: z.coerce.number({
			required_error: 'Estimated delivery time is required.',
			invalid_type_error: 'Must be a valid number.',
		}),
		cuisines: z.array(z.string()).nonempty({
			message: 'Please select at least 1 item.',
		}),
		menuItems: z.array(
			z.object({
				name: z.string().min(1, 'Name is required.'),
				price: z.coerce.number().min(1, 'Price is required.'),
			})
		),
		imageUrl: z.string().optional(),
		imageFile: z.instanceof(File, { message: 'Image is required.' }).optional(),
	})
	.refine((data) => data.imageFile || data.imageUrl, {
		message: 'Image file or image URL must be provided.',
		path: ['imageFile'],
	});
