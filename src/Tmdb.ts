import {
	CollectionResults,
	CompanyResults,
	KeywordResults,
	MovieResults,
	MovieSearchOptions,
	PersonResults,
	SeriesResults,
	SeriesSearchOptions,
	PersonSearchOptions,
	MultiSearchResults,
	MultiSearchOptions,
	CollectionSearchOptions
} from "./Interfaces";

import { get, post, del } from "./Network";

/**
 * API instance
 */
export class Tmdb
{
	/**
	 * The TMDB v3 API key
	 */
	private __apiKey: string;

	/**
	 * Create a new API instance
	 */
	constructor(apiKey: string) {
		this.__apiKey = apiKey;
	}

	/**
	 * Search for a company
	 */
	searchCompanies(query: string, page: number = 1) {
		return get<CompanyResults>(this.__apiKey, "/search/company", {query, page});
	}

	/**
	 * Search for a collection
	 */
	searchCollections(query: string, options: CollectionSearchOptions = {}, page: number = 1) {
		return get<CollectionResults>(this.__apiKey, "/search/collection",
			Object.assign(options, {query, page}));
	}

	/**
	 * Search for keywords
	 */
	searchKeywords(query: string, page: number = 1) {
		return get<KeywordResults>(this.__apiKey, "/search/keyword", {query, page});
	}

	/**
	 * Search for a movie
	 */
	searchMovies(query: string, options: MovieSearchOptions = {}, page: number = 1) {
		return get<MovieResults>(this.__apiKey, "/search/movie",
			Object.assign(options, {query, page}));
	}

	/**
	 * Search for a person
	 */
	searchPeople(query: string, options: PersonSearchOptions = {}, page: number = 1) {
		return get<PersonResults>(this.__apiKey, "/search/person",
			Object.assign(options, {query, page}));
	}

	/**
	 * Search for a series
	 */
	searchSeries(query: string, options: SeriesSearchOptions = {}, page: number = 1) {
		return get<SeriesResults>(this.__apiKey, "/search/tv",
			Object.assign(options, {query, page}));
	}

	/**
	 * Search across movies, TV shows, and people at once
	 */
	search(query: string, options: MultiSearchOptions = {}, page: number = 1) {
		return get<MultiSearchResults>(this.__apiKey, "/search/multi",
			Object.assign(options, {query, page}));
	}

	/**
	 * Find an item by an external ID
	 */
	find() {

	}
}
