import { searchSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem } from './ui/form';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useEffect } from 'react';

type Props = {
	onSubmit: (formData: SearchForm) => void;
	placeholder: string;
	onReset?: () => void;
	searchQuery?: string;
};

export type SearchForm = z.infer<typeof searchSchema>;

const SearchBar = ({ onSubmit, placeholder, onReset, searchQuery }: Props) => {
	const form = useForm<SearchForm>({
		resolver: zodResolver(searchSchema),
		defaultValues: {
			searchQuery: '',
		},
	});

	useEffect(() => {
		form.reset({ searchQuery });
	}, [searchQuery, form]);

	const handleReset = () => {
		form.reset({
			searchQuery: '',
		});

		if (onReset) {
			onReset();
		}
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className={`flex items-center gap-3 justify-between flex-row border-2 rounded-full p-3 ${
					form.formState.errors.searchQuery && 'border-red-500'
				}`}
			>
				<Search
					className='ml-1 text-orange-500 hidden md:block'
					strokeWidth={2.5}
					size={30}
				/>
				<FormField
					control={form.control}
					name='searchQuery'
					render={({ field }) => (
						<FormItem className='flex-1'>
							<FormControl>
								<Input
									{...field}
									className='border-none shadow-none text-xl focus-visible:ring-0'
									placeholder={placeholder}
								/>
							</FormControl>
						</FormItem>
					)}
				/>
				{form.formState.isDirty && (
					<Button
						type='button'
						variant='outline'
						className='rounded-full'
						onClick={handleReset}
					>
						Reset
					</Button>
				)}

				<Button
					type='submit'
					className='rounded-full bg-orange-500'
				>
					Search
				</Button>
			</form>
		</Form>
	);
};

export default SearchBar;
