import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';

type Props = {
	onChange: (value: string) => void;
	sortOption: string;
};

const SORT_OPTIONS = [
	{
		label: 'Best Match',
		value: 'bestMatch',
	},
	{
		label: 'Delivery Price',
		value: 'deliveryPrice',
	},
	{
		label: 'Estimated Delivery Time',
		value: 'estimatedDeliveryTime',
	},
];

const SortOptionsDropdown = ({ onChange, sortOption }: Props) => {
	const selectedSortLabel = SORT_OPTIONS.find((option) => option.value === sortOption)?.label || SORT_OPTIONS[0].label;
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className='cursor-pointer'>Sort by: {selectedSortLabel}</DropdownMenuTrigger>
			<DropdownMenuContent>
				{SORT_OPTIONS.map((option) => (
					<DropdownMenuItem
						className='cursor-pointer'
						onClick={() => onChange(option.value)}
						key={option.value}
					>
						{option.label}
					</DropdownMenuItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default SortOptionsDropdown;
