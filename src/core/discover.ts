import { IMovieResults,
         ISeriesResults }       from "./interface/results";
import { MediaType,
         TimeWindow }           from "./enums";
import { IDiscoverMovieOptions,
         IDiscoverTvOptions }   from "./interface/options";
import { sortF,
         optionalProperty,
         logicArrayF }          from "./util/utils";
import { get }                  from "./util/network";

/**
 * Used to compile the movie discover options
 */
function compileDiscoverMovieOptions(options: IDiscoverMovieOptions) {
	return {
		language                  : options.language,
		region                    : options.region,
		sort_by                   : sortF(options.sort_by, options.sort_direction),
		certification_country     : optionalProperty(options.certification, "country"),
		certification             : optionalProperty(options.certification, "certification"),
		"certification.lte"       : optionalProperty(options.certification, "maximum"),
		include_adult             : options.include_adult,
		include_video             : options.include_video,
		primary_release_year      : options.year,
		"primary_release_date.gte": optionalProperty(options.primary_release_date, "minimum"),
		"primary_release_date.lte": optionalProperty(options.primary_release_date, "maximum"),
		"release_date.gte"        : optionalProperty(options.release_date, "minimum"),
		"release_date.lte"        : optionalProperty(options.release_date, "maximum"),
		"vote_count.gte"          : optionalProperty(options.vote_count, "minimum"),
		"vote_count.lte"          : optionalProperty(options.vote_count, "maximum"),
		"vote_average.gte"        : optionalProperty(options.vote_average, "minimum"),
		"vote_average.lte"        : optionalProperty(options.vote_average, "maximum"),
		with_cast                 : logicArrayF(options.cast),
		with_crew                 : logicArrayF(options.crew),
		with_companies            : logicArrayF(options.companies),
		with_genres               : logicArrayF(options.genres),
		with_keywords             : logicArrayF(options.keywords),
		with_people               : logicArrayF(options.people),
		year                      : options.year,
		without_genres            : logicArrayF(options.exclude_genres),
		"with_runtime.gte"        : optionalProperty(options.runtime, "minimum"),
		"with_runtime.lte"        : optionalProperty(options.runtime, "maximum"),
		with_release_type         : options.release_type
	}
}

/**
 * Used to compile the tv discover options
 */
function compileDiscoverTvOptions(options: IDiscoverTvOptions) {
	return {
		language                    : options.language,
		sort_by                     : sortF(options.sort_by, options.sort_direction),
		"air_date.gte"              : optionalProperty(options.air_date, "minimum"),
		"air_date.lte"              : optionalProperty(options.air_date, "maximum"),
		"first_air_date.gte"        : optionalProperty(options.first_air_date, "minimum"),
		"first_air_date.lte"        : optionalProperty(options.first_air_date, "maximum"),
		first_air_date_year         : options.first_air_date_year,
		timezone                    : options.timezone,
		vote_average                : options.vote_average,
		vote_count                  : options.vote_count,
		with_genres                 : logicArrayF(options.genres),
		with_networks               : logicArrayF(options.networks),
		without_genres              : logicArrayF(options.exclude_genres),
		"with_runtime.gte"          : optionalProperty(options.runtime, "minimum"),
		"with_runtime.lte"          : optionalProperty(options.runtime, "maximum"),
		include_null_first_air_dates: options.include_null_first_air_dates,
		with_original_language      : options.original_language,
		with_keywords               : logicArrayF(options.keywords),
		without_keywords            : logicArrayF(options.exclude_keywords),
		screened_theatrically       : options.screened_theatrically,
		with_companies              : logicArrayF(options.companies)
	}
}

export let discover = {
	/**
	 * Discover movies that meet the provided parameters
	 */
	movies(apiKey: string, options: IDiscoverMovieOptions, page?: number) {
		return get<IMovieResults>(apiKey, "discover/movie",
			Object.assign(compileDiscoverMovieOptions(options), { page }));
	},

	/**
	 * Discover TV shows that meet the provided parameters
	 */
	tvShows(apiKey: string, options: IDiscoverTvOptions, page?: number) {
		return get<ISeriesResults>(apiKey, "discover/tv",
			Object.assign(compileDiscoverTvOptions(options), { page }));
	},

	/**
	 * Get a list of trending media
	 */
	getTrending(apiKey: string, mediaType: MediaType, timeWindow: TimeWindow) {
		return get<IMovieResults>(apiKey, `trending/${mediaType}/${timeWindow}`);
	}
};
