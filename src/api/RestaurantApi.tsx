import { SearchState } from '@/pages/SearchPage';
import { Restaurant, RestaurantSearchResponse } from '@/types';
import { useQuery } from 'react-query';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants = (searchState: SearchState, city?: string) => {
	const createSearchRequest = async (): Promise<RestaurantSearchResponse> => {
		const params = new URLSearchParams();
		params.set('searchQuery', searchState.searchQuery);
		params.set('page', searchState.page.toString());
		params.set('selectedCuisines', searchState.selectedCuisines.join(','));
		params.set('sortOption', searchState.sortOption);

		const res = await fetch(`${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`);

		if (!res.ok) {
			throw new Error('Failed to get restaurant');
		}

		return res.json();
	};

	const { data: results, isLoading } = useQuery(['searchRestaurants', searchState], createSearchRequest, {
		enabled: !!city,
	});

	return {
		results,
		isLoading,
	};
};

export const useGetRestaurant = (restaurantId?: string) => {
	const getRestaurant = async (): Promise<Restaurant> => {
		const response = await fetch(`${API_BASE_URL}/api/restaurant/${restaurantId}`);

		if (!response.ok) {
			throw new Error('Faile to get restaurant');
		}

		return response.json();
	};

	const { data: restaurant, isLoading } = useQuery('fetchRestaurant', getRestaurant, {
		//dont run the api request when restaurantId is undefined
		enabled: !!restaurantId,
	});

	return {
		restaurant,
		isLoading,
	};
};
