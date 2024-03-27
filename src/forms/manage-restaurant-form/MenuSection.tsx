import { Button } from '@/components/ui/button';
import { FormDescription, FormField, FormItem } from '@/components/ui/form';
import { useFieldArray, useFormContext } from 'react-hook-form';
import MenuItemInput from './MenuItemInput';
import { PlusCircle } from 'lucide-react';

const MenuSection = () => {
	const { control } = useFormContext();

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'menuItems',
	});

	return (
		<div className='space-y-2'>
			<div>
				<h2 className='text-2xl font-bold'>Menu</h2>
				<FormDescription>Create he menu for your restaurant</FormDescription>
			</div>

			<FormField
				control={control}
				name='menuItems'
				render={() => (
					<FormItem className='flex flex-col gap-2'>
						{fields.map((_, index) => (
							<MenuItemInput
								key={index}
								index={index}
								removeMenuItem={() => remove(index)}
							/>
						))}
					</FormItem>
				)}
			/>
			<Button
				onClick={() => append({ name: '', price: '' })}
				type='button'
			>
				<PlusCircle className='size-4 mr-2' />
				Add menu
			</Button>
		</div>
	);
};

export default MenuSection;
