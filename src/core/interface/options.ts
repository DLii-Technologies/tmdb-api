export interface IChangesOptions {
	start_date?: string;
	end_date  ?: string;
}

export interface ICollectionSearchOptions {
	language?: string; // ISO 639-1 value to display translated data (if supported)
}

export interface IMovieSearchOptions {
	include_adult       ?: boolean; // Include adult (pornographic) content in the results
	language            ?: string;  // ISO 639-1 value to display translated data (if supported)
	primary_release_year?: number;  // Specify the primary year the movie was released
	region              ?: string;  // Specify a ISO 3166-1 code to filter release dates
	year                ?: number;  // Specify the year the movie was released
}

export interface ISeriesSearchOptions {
	first_air_date_year?: number; // Specify the year the series first aired
	language           ?: string; // ISO 639-1 value to display translated data (if supported)
}

export interface IPersonSearchOptions {
	include_adult?: boolean; // Include adult (pornographic) content in the results
	language     ?: string;  // ISO 639-1 value to display translated data (if supported)
	region       ?: string;  // Specify a ISO 3166-1 code to filter release dates
}

export interface IMultiSearchOptions {
	include_adult?: boolean; // Include adult (pornographic) content in the results
	language     ?: string;  // ISO 639-1 value to display translated data (if supported)
	region       ?: string;  // Specify a ISO 3166-1 code to filter release dates
}
