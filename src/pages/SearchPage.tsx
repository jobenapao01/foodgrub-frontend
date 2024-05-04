import { useSearchRestaurants } from '@/api/RestaurantApi';
import SearchResultCard from '@/components/SearchResultCard';
import SearchResultInfo from '@/components/SearchResultInfo';
import SearchBar, { SearchForm } from '@/components/SearchBar';
import SkeletonPage from '@/components/SkeletonPage';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import PaginationSelector from '@/components/PaginationSelector';
import CuisineFilter from '@/components/CuisineFilter';
import SortOptionsDropdown from '@/components/SortOptionsDropdown';

export type SearchState = {
	searchQuery: string;
	page: number;
	selectedCuisines: string[];
	sortOption: string;
};

const SearchPage = () => {
	const { city } = useParams();
	const [searchState, setSearchState] = useState<SearchState>({
		searchQuery: '',
		page: 1,
		selectedCuisines: [],
		sortOption: 'bestMatch',
	});

	const [isExpanded, setIsExpanded] = useState<boolean>(false);

	const { results, isLoading } = useSearchRestaurants(searchState, city);

	const setSelectedCuisines = (selectedCuisines: string[]) => {
		setSearchState((prevState) => ({
			...prevState,
			selectedCuisines,
			page: 1,
		}));
	};

	const setSortOption = (sortOption: string) => {
		setSearchState((prevState) => ({
			...prevState,
			sortOption,
			page: 1,
		}));
	};

	const setPage = (page: number) => {
		setSearchState((prevState) => ({
			...prevState,
			page,
		}));
	};

	const setSearchQuery = (searchFormData: SearchForm) => {
		setSearchState((prevState) => ({
			...prevState,
			searchQuery: searchFormData.searchQuery,
			page: 1,
		}));
	};

	const resetSearch = () => {
		setSearchState((prevState) => ({
			...prevState,
			searchQuery: '',
			page: 1,
		}));
	};

	if (isLoading) {
		<SkeletonPage />;
	}
	if (!results?.data || !city) {
		return <span>No results found</span>;
	}
	return (
		<div className='grid lg:grid-cols-[250px_1fr] gap-5'>
			<div id='cuisines-list'>
				<CuisineFilter
					selectedCuisines={searchState.selectedCuisines}
					onChange={setSelectedCuisines}
					isExpanded={isExpanded}
					onExpandedClick={() => setIsExpanded((prevIsExpanded) => !prevIsExpanded)}
				/>
			</div>

			<div
				id='main-content'
				className='flex flex-col gap-5'
			>
				<SearchBar
					placeholder='Search cuisine or restaurant'
					onSubmit={setSearchQuery}
					onReset={resetSearch}
					searchQuery={searchState.searchQuery}
				/>
				<div className='flex justify-between flex-col gap-3 lg:flex-row'>
					<SearchResultInfo
						city={city}
						total={results.pagination.total}
					/>

					<SortOptionsDropdown
						onChange={(value) => setSortOption(value)}
						sortOption={searchState.sortOption}
					/>
				</div>
				{results.data.map((restaurant) => (
					<SearchResultCard
						restaurant={restaurant}
						key={restaurant._id}
					/>
				))}
				<PaginationSelector
					page={results.pagination.page}
					pages={results.pagination.pages}
					onPageChange={setPage}
				/>
			</div>
		</div>
	);
};

export default SearchPage;
