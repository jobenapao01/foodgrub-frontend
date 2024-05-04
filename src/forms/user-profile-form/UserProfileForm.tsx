import { userProfileFormSchema } from '@/schemas';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import LoadingButton from '@/components/LoadingButton';
import { User } from '@/types';
import { useEffect } from 'react';

export type UserFormData = z.infer<typeof userProfileFormSchema>;

type Props = {
	onSave: (userProfileData: UserFormData) => void;
	isLoading: boolean;
	currentUser: User;
	title?: string;
	buttonText?: string;
	description?: string;
};

const UserProfileForm = ({
	isLoading,
	onSave,
	currentUser,
	buttonText = 'Submit',
	title = 'User Profile',
	description = 'View and change your profile information here',
}: Props) => {
	const form = useForm<UserFormData>({
		resolver: zodResolver(userProfileFormSchema),
		defaultValues: {
			email: '',
			name: '',
			addressLine1: '',
			city: '',
			country: '',
		},
	});

	useEffect(() => {
		form.reset(currentUser);
	}, [currentUser, form]);

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSave)}
				className='space-y-4 rounded-lg bg-gray-50 md:p-10'
			>
				<div>
					<h2 className='text-2xl font-bold'>{title}</h2>
					<FormDescription className='text-sm text-muted-foreground'>{description}</FormDescription>
				</div>

				<FormField
					control={form.control}
					name='email'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Email</FormLabel>
							<FormControl>
								<Input
									{...field}
									disabled
									className='bg-white'
								/>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name='name'
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input
									{...field}
									className='bg-white'
								/>
							</FormControl>
							<FormDescription />
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className='flex flex-col gap-4 md:flex-row'>
					<FormField
						control={form.control}
						name='addressLine1'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormLabel>Address Line 1</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='bg-white'
									/>
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='city'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormLabel>City</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='bg-white'
									/>
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='country'
						render={({ field }) => (
							<FormItem className='flex-1'>
								<FormLabel>Country</FormLabel>
								<FormControl>
									<Input
										{...field}
										className='bg-white'
									/>
								</FormControl>
								<FormDescription />
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{isLoading ? (
					<LoadingButton className='w-full'>Submitting</LoadingButton>
				) : (
					<Button
						className='w-full hover:bg-orange-600 hover:text-white'
						type='submit'
					>
						{buttonText}
					</Button>
				)}
			</form>
		</Form>
	);
};

export default UserProfileForm;
