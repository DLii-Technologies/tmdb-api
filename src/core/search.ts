import { get }                                         from "./util/network";
import { IFindResults, ICompanyResults, ICollectionResults, IKeywordResults, IMovieResults,
	IPersonResults, ISeriesResults, ICombinedResults } from "./interface/results";
import { ExternalSource }                              from "./enums";
import { IMultiSearchOptions, ISeriesSearchOptions, IPersonSearchOptions, IMovieSearchOptions,
	ICollectionSearchOptions }                         from "./interface/options";

export let search = {
	/**
	 * Find an item by an external ID
	 */
	find(apiKey: string, externalId: string, externalSource: ExternalSource, language?: string) {
		return get<IFindResults>(apiKey, `/find/${externalId}`, {
			external_source: externalSource,
			language
		});
	},

	/**
	 * Search for a company
	 */
	companies(apiKey: string, query: string, page?: number) {
		return get<ICompanyResults>(apiKey, "/search/company", { query, page });
	},

	/**
	 * Search for a collection
	 */
	collections(apiKey: string, query: string, page?: number,
		options: ICollectionSearchOptions = {})
	{
		return get<ICollectionResults>(apiKey, "/search/collection",
			Object.assign(options, { query, page }));
	},

	/**
	 * Search for keywords
	 */
	keywords(apiKey: string, query: string, page?: number) {
		return get<IKeywordResults>(apiKey, "/search/keyword", { query, page });
	},

	/**
	 * Search for a movie
	 */
	movies(apiKey: string, query: string, page?: number, options: IMovieSearchOptions = {}) {
		return get<IMovieResults>(apiKey, "/search/movie",
			Object.assign(options, { query, page }));
	},

	/**
	 * Search for a person
	 */
	people(apiKey: string, query: string, page?: number, options: IPersonSearchOptions = {}) {
		return get<IPersonResults>(apiKey, "/search/person",
			Object.assign(options, { query, page }));
	},

	/**
	 * Search for a series
	 */
	series(apiKey: string, query: string, page?: number, options: ISeriesSearchOptions = {}) {
		return get<ISeriesResults>(apiKey, "/search/tv",
			Object.assign(options, { query, page }));
	},

	/**
	 * Search across movies, TV shows, and people at once
	 */
	multi(apiKey: string, query: string, page?: number, options: IMultiSearchOptions = {}) {
		return get<ICombinedResults>(apiKey, "/search/multi",
			Object.assign(options, { query, page }));
	}
};
