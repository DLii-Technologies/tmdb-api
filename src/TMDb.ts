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
	CollectionSearchOptions,
	MovieListing,
	SeriesListing,
	PersonListing,
	FindResults,
	MovieDetails,
	AccountStates,
	AlternativeTitles,
	ChangesOptions,
	MovieChanges,
	Credits,
	ExternalIdList,
	ImageList,
	KeywordList,
	MovieReleaseDateResults,
	MovieReleaseDateListing,
	VideoList,
	TranslationList,
	ReviewList,
	Lists,
	Response
} from "./Interfaces";

import { get, post, del } from "./Network";
import { ExternalSource } from "Enums";

/**
 * API instance
 */
export class TMDb
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
	 * Find an item by an external ID
	 */
	find(externalId: string, externalSource: ExternalSource, language?: string) {
		return get<FindResults>(this.__apiKey, `/find/${externalId}`, {
			external_source: externalSource,
			language
		});
	}

	// Movie API -----------------------------------------------------------------------------------

	/**
	 * Get the primary information about a movie
	 */
	getMovieDetails(movieId: number, language?: string) {
		return get<MovieDetails>(this.__apiKey, `/movie/${movieId}`, {language});
	}

	/**
	 * Grab the account states for a session
	 */
	getMovieAccountStates(movieId: number, sessionId: string, guestSessionId?: string) {
		return get<AccountStates>(this.__apiKey, `/movie/${movieId}/account_states`,{
			session_id      : sessionId,
			guest_session_id: guestSessionId
		});
	}

	/**
	 * Get all of the alternative titles for a movie
	 */
	getMovieAltTitles(movieId: number, country?: string) {
		return get<AlternativeTitles>(this.__apiKey, `/movie/${movieId}/alternative_titles`, {
			country
		});
	}

	/**
	 * Get the changes for a movie. By default only the last 24 hours are returned
	 */
	getMovieChanges(movieId: number, options: ChangesOptions = {}, page: number = 1) {
		return get<MovieChanges>(this.__apiKey, `/movie/${movieId}/changes`,
			Object.assign(options, {page}));
	}

	/**
	 * Get the cast and crew for a movie
	 */
	getMovieCredits(movieId: number) {
		return get<Credits>(this.__apiKey, `/movie/${movieId}/credits`);
	}

	/**
	 * Get the external ids for a movie. The following are currently supported:
	 *
	 * - IMDb ID
	 * - Facebook
	 * - Instagram
	 * - Twitter
	 */
	getMovieExternalIds(movieId: number) {
		return get<ExternalIdList>(this.__apiKey, `/movie/${movieId}/external_ids`);
	}

	/**
	 * Get the images that belong to a movie
	 *
	 * Querying images with a language parameter will filter the results. If you want to include a
	 * fallback language you can use the `includeLanguage` parameter, e.g. ['en', null]
	 */
	getMovieImages(movieId: number, language?: string, includeLanguage?: string[]) {
		return get<ImageList>(this.__apiKey, `/movie/${movieId}/images`, {
			language,
			include_image_language: includeLanguage && includeLanguage.join(',')
		});
	}

	/**
	 * Get the keywords that have been added to a movie
	 */
	getMovieKeywords(movieId: number) {
		return get<KeywordList>(this.__apiKey, `/movie/${movieId}/keywords`);
	}

	/**
	 * Get the release date along with the certification for a movie
	 *
	 * Release dates support different types:
	 * 1. Premiere
	 * 2. Theatrical (limited)
	 * 3. Theatrical
	 * 4. Digital
	 * 5. Physical
	 * 6. TV
	 */
	getMovieReleaseDates(movieId: number) {
		return get<MovieReleaseDateResults>(this.__apiKey, `/movie/${movieId}/release_dates`);
	}

	/**
	 * Get the videos that have been added to a movie
	 */
	getMovieVideos(movieId: number, language?: string) {
		return get<VideoList>(this.__apiKey, `/movie/${movieId}/videos`, {language});
	}

	/**
	 * Get a list of translations that have been created for a movie
	 */
	getMovieTranslations(movieId: number) {
		return get<TranslationList>(this.__apiKey, `/movie/${movieId}/translations`);
	}

	/**
	 * Get a list of recommended movies for a movie
	 */
	getMovieRecommendations(movieId: number, language?: string, page: number = 1) {
		return get<MovieResults>(this.__apiKey, `/movie/${movieId}/recommendations`, {
			language, page
		});
	}

	/**
	 * Get a list of similar movies. This is not the same as the "Recommendation" system.
	 */
	getSimilarMovies(movieId: number, language?: string, page: number = 1) {
		return get<MovieResults>(this.__apiKey, `/movie/${movieId}/similar`, {
			language, page
		});
	}

	/**
	 * Get the user reviews for a movie
	 */
	getMovieReviews(movieId: number, language?: string, page: number = 1) {
		return get<ReviewList>(this.__apiKey, `/movie/${movieId}/reviews`, {language, page});
	}

	/**
	 * Get a list of lists that a movie belongs to
	 */
	getMovieLists(movieId: number, language?: string, page: number = 1) {
		return get<Lists>(this.__apiKey, `/movie/${movieId}/lists`, {language, page});
	}

	/**
	 * Rate a movie. A valid session or guest session ID is required
	 */
	rateMovie(movieId: number, value: number, guestSessionId?: string, sessionId?: string) {
		return post<Response>(this.__apiKey, `/movie/${movieId}/rating`, {
			guest_session_id: guestSessionId,
			session_id      : sessionId
		}, {value});
	}

	/**
	 * Remove your rating for a movie. A valid session or guest session ID is required
	 */
	deleteMovieRating(movieId: number, guestSessionId?: string, sessionId?: string) {
		return del<Response>(this.__apiKey, `/movie/${movieId}/rating`, {
			guest_session_id: guestSessionId,
			session_id      : sessionId
		});
	}

	/**
	 * Get the most newly created movie. This is a live response and will continuously change
	 */
	getLatestMovie(language?: string) {
		return get<MovieDetails>(this.__apiKey, `/movie/latest`, {language});
	}

	/**
	 * Get a list of movies in theaters
	 */
	getMoviesNowPlaying(page: number = 1, region?: string, language?: string) {
		return get<MovieResults>(this.__apiKey, `/movie/now_playing`, {language, page, region});
	}

	/**
	 * Get a list of the current popular movies on TMDb. This list updates daily
	 */
	getPopularMovies(page: number = 1, region?: string, language?: string) {
		return get<MovieResults>(this.__apiKey, `/movie/popular`, {language, page, region});
	}

	/**
	 * Get the top rated movies on TMDb
	 */
	getTopRatedMovies(page: number = 1, region?: string, language?: string) {
		return get<MovieResults>(this.__apiKey, `/movie/top_rated`, {language, page, region});
	}

	/**
	 * Get a list of upcoming movies in theaters
	 */
	getUpcomingMovies(page: number = 1, region?: string, language?: string) {
		return get<MovieResults>(this.__apiKey, `/movie/upcoming`, {language, page, region});
	}

	// Search API ----------------------------------------------------------------------------------

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
}
