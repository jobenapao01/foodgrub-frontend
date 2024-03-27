import { Button } from '@/components/ui/button';
import {
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Trash } from 'lucide-react';
import { useFormContext } from 'react-hook-form';

type Props = {
	removeMenuItem: () => void;
	index: number;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
	const { control } = useFormContext();

	return (
		<div className='flex items-end space-x-2'>
			<FormField
				control={control}
				name={`menuItems.${index}.name`}
				render={({ field }) => (
					<FormItem>
						<FormLabel className='flex items-center gap-1 '>
							Name <FormMessage />
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder='Chicken Adobo'
								className='bg-white'
							/>
						</FormControl>
					</FormItem>
				)}
			/>

			<FormField
				control={control}
				name={`menuItems.${index}.price`}
				render={({ field }) => (
					<FormItem>
						<FormLabel className='flex items-center gap-1 '>
							Price (₱) <FormMessage />
						</FormLabel>
						<FormControl>
							<Input
								{...field}
								placeholder='120'
								className='bg-white'
							/>
						</FormControl>
					</FormItem>
				)}
			/>

			<Button
				onClick={removeMenuItem}
				variant='destructive'
				className='max-h-fit'
			>
				<Trash className='size-4' />
			</Button>
		</div>
	);
};

export default MenuItemInput;
