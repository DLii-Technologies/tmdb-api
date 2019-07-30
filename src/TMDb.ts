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
	VideoList,
	TranslationList,
	ReviewList,
	Lists,
	Response,
	GuestSessionResponse,
	RequestTokenResponse,
	CreateSessionResponse,
	DeleteSessionResponse,
	AccountDetails,
	ListResults,
	EpisodeResults
} from "./Interfaces";

import { get, post, del } from "./Network";
import { ExternalSource, Sort, MediaType } from "./Enums";

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

	// Account -------------------------------------------------------------------------------------

	/**
	 * Get the details of the provided account
	 */
	getAccountDetails(sessionId: string) {
		return get<AccountDetails>(this.__apiKey, "/account", { session_id: sessionId });
	}

	/**
	 * Get all of the lists created by an account
	 */
	getAccountLists(sessionId: string, accountId?: number, page?: number, language?: string) {
		let uri = accountId != undefined ? accountId : "{account_id}";
		return get<ListResults>(this.__apiKey, `/account/${uri}/lists`, {
			session_id: sessionId,
			language,
			page,
		});
	}

	/**
	 * Get an account's favorite movies
	 */
	getFavoriteMovies(sessionId: string, accountId?: number, page?: number, sortBy?: Sort,
		language?: string)
	{
		let uri = accountId != undefined ? accountId : "{account_id}";
		return get<MovieResults>(this.__apiKey, `/account/${uri}/favorite/movies`, {
			session_id: sessionId,
			sort_by: sortBy,
			language,
			page
		});
	}

	/**
	 * Get an account's favorite TV shows
	 */
	getFavoriteTvShows(sessionId: string, accountId?: number, page?: number, sortBy?: Sort,
		language?: string)
	{
		let uri = accountId != undefined ? accountId : "{account_id}";
		return get<SeriesResults>(this.__apiKey, `/account/${uri}/favorite/tv`, {
			session_id: sessionId,
			sort_by: sortBy,
			language,
			page
		});
	}

	/**
	 * Mark a movie or TV show favorite
	 */
	markFavorite(mediaType: MediaType.Movie | MediaType.Tv, mediaId: number, sessionId: string,
		favorite: boolean, accountId?: number)
	{
		let uri = accountId != undefined ? accountId : "{account_id}";
		return post<Response>(this.__apiKey, `/account/${uri}/favorite`, {
			media_type: mediaType,
			session_id: sessionId,
			media_id: mediaId,
			favorite
		});
	}

	/**
	 * Mark a movie as favorite
	 */
	markFavoriteMovie(mediaId: number, sessionId: string, favorite: boolean, accountId?: number) {
		return this.markFavorite(MediaType.Movie, mediaId, sessionId, favorite, accountId);
	}

	/**
	 * Mark a TV show as favorite
	 */
	markFavoriteTvShow(mediaId: number, sessionId: string, favorite: boolean, accountId?: number) {
		return this.markFavorite(MediaType.Tv, mediaId, sessionId, favorite, accountId);
	}

	/**
	 * Get the movies rated by an account
	 */
	getRatedMovies(sessionId: string, accountId?: number, page?: number, sortBy?: Sort,
		language?: string)
	{
		let uri = accountId != undefined ? accountId : "{account_id}";
		return get<MovieResults>(this.__apiKey, `/account/${uri}/rated/movies`, {
			session_id: sessionId,
			sort_by: sortBy,
			language,
			page
		});
	}

	/**
	 * Get the TV shows rated by an account
	 */
	getRatedTvShows(sessionId: string, accountId?: number, page?: number, sortBy?: Sort,
		language?: string)
	{
		let uri = accountId != undefined ? accountId : "{account_id}";
		return get<SeriesResults>(this.__apiKey, `/account/${uri}/rated/tv`, {
			session_id: sessionId,
			sort_by: sortBy,
			language,
			page
		});
	}

	/**
	 * Get the TV show episodes rated by an account
	 */
	getRatedTvEpisodes(sessionId: string, accountId?: number, page?: number, sortBy?: Sort,
		language?: string)
	{
		let uri = accountId != undefined ? accountId : "{account_id}";
		return get<EpisodeResults>(this.__apiKey, `/account/${uri}/rated/episodes`, {
			session_id: sessionId,
			sort_by: sortBy,
			language,
			page
		});
	}

	/**
	 * Get an account's movie watchlist
	 */
	getMovieWatchlist(sessionId: string, accountId?: number, page?: number, sortBy?: Sort,
		language?: string)
	{
		let uri = accountId != undefined ? accountId : "{account_id}";
		return get<MovieResults>(this.__apiKey, `/account/${uri}/watchlist/movies`, {
			session_id: sessionId,
			sort_by: sortBy,
			language,
			page
		});
	}

	/**
	 * Get an account's TV show watchlist
	 */
	getTvShowWatchList(sessionId: string, accountId?: number, page?: number, sortBy?: Sort,
		language?: string)
	{
		let uri = accountId != undefined ? accountId : "{account_id}";
		return get<SeriesResults>(this.__apiKey, `/account/${uri}/watchlist/tv`, {
			session_id: sessionId,
			sort_by: sortBy,
			language,
			page
		});
	}

	markInWatchlist(mediaType: MediaType.Movie | MediaType.Tv, mediaId: number, sessionId: string,
		inWatchlist: boolean, accountId?: number)
	{
		let uri = accountId != undefined ? accountId : "{account_id}";
		return get<Response>(this.__apiKey, `/account/${uri}/watchlist/tv`, {
			media_type: mediaType,
			session_id: sessionId,
			watchlist: inWatchlist,
			media_id: mediaId
		});
	}

	// Authentication ------------------------------------------------------------------------------

	/**
	 * Create a new guest session. Guest sessions will allow rating movies and TV shows without
	 * requiring a TMDb account
	 */
	createGuestSession() {
		return get<GuestSessionResponse>(this.__apiKey, `/authentication/guest_session/new`);
	}

	/**
	 * Create a temporary request token that can be used to validate a TMDb user login
	 */
	createRequestToken() {
		return get<RequestTokenResponse>(this.__apiKey, `/authentication/token/new`);
	}

	/**
	 * Validate a request token by login
	 */
	validateRequestToken(requestToken: string, username: string, password: string) {
		return post<RequestTokenResponse>(this.__apiKey, `/authentication/token/validate_with_login`, {
			request_token: requestToken,
			username,
			password
		});
	}

	/**
	 * Create a new session
	 */
	createSession(requestToken: string) {
		return post<CreateSessionResponse>(this.__apiKey, `/authentication/session/new`, {
			request_token: requestToken,
		});
	}

	/**
	 * Delete or "logout" from a session
	 */
	deleteSession(sessionId: string) {
		return del<DeleteSessionResponse>(this.__apiKey, `/authentication/session`, {
			session_id: sessionId
		});
	}

	// Find API ------------------------------------------------------------------------------------

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
	rateMovie(movieId: number, value: number, sessionId?: string, guestSessionId?: string) {
		return post<Response>(this.__apiKey, `/movie/${movieId}/rating`, {
			guest_session_id: guestSessionId,
			session_id      : sessionId
		}, {value});
	}

	/**
	 * Remove your rating for a movie. A valid session or guest session ID is required
	 */
	deleteMovieRating(movieId: number, sessionId?: string, guestSessionId?: string) {
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
