import { DiscoverSort, SortDirection, ReleaseType } from "../enums";

export interface IMinMax {
	minimum?: string;
	maximum?: string;
}

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

export interface IDiscoverMovieOptions {
	language            ?: string;
	region              ?: string;
	sort_by             ?: DiscoverSort;
	sort_direction      ?: SortDirection;
	include_adult       ?: boolean;
	include_video       ?: boolean;
	primary_release_year?: number;
	cast                ?: number[] | number[][];
	crew                ?: number[] | number[][];
	companies           ?: number[] | number[][];
	genres              ?: number[] | number[][];
	keywords            ?: number[] | number[][];
	people              ?: number[] | number[][];
	year                ?: number;
	exclude_genres      ?: number[] | number[][];
	release_type        ?: ReleaseType[] | ReleaseType[][];
	primary_release_date?: IMinMax;
	release_date        ?: IMinMax;
	vote_count          ?: IMinMax;
	vote_average        ?: IMinMax;
	runtime             ?: IMinMax;
	original_language   ?: string;
	exclude_keywords    ?: string[] | string[][];
	certification       ?: {
		country      ?: string;
		certification?: string;
		maximum      ?: string;
	};
}

export interface IDiscoverTvOptions {
	language                    ?: string;
	sort_by                     ?: DiscoverSort;
	sort_direction              ?: SortDirection;
	air_date                    ?: IMinMax;
	first_air_date              ?: IMinMax;
	first_air_date_year         ?: number;
	timezone                    ?: string;
	vote_average                ?: IMinMax;
	vote_count                  ?: IMinMax;
	cast                        ?: number[] | number[][];
	genres                      ?: number[] | number[][];
	networks                    ?: number[] | number[][];
	exclude_genres              ?: number[] | number[][];
	runtime                     ?: IMinMax;
	include_null_first_air_dates?: boolean;
	original_language           ?: string;
	keywords                    ?: number[] | number[][];
	exclude_keywords            ?: string[] | string[][];
	screened_theatrically       ?: boolean;
	companies                   ?: number[] | number[][];
}
