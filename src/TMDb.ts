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
	EpisodeResults,
	SeriesDetails,
	AlternativeNames,
	SeriesChanges,
	SeriesContentRatings,
	EpisodeGroupResults,
	SeriesExternalIdList,
	SeriesTheatricalScreenings,
	SeriesTranslationList,
	SeasonDetails,
	SeasonChanges,
	SeasonAccountStates,
	SeasonExternalIdList,
	SeasonImages,
	EpisodeDetails,
	EpisodeChanges,
	EpisodeAccountState,
	EpisodeCredits,
	EpisodeExternalIdList,
	EpisodeImages,
	EpisodeTranslationList,
	EpisodeGroupDetails,
	GenreList,
	Keyword,
	MovieResultsWithId
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
			session_id: sessionId,
		}, {
			media_type: mediaType,
			media_id  : mediaId,
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
	 * Get the movies rated by a guest session
	 */
	getGuestRatedMovies(guestSessionId: string, sortBy?: Sort, language?: string) {
		return get<MovieResults>(this.__apiKey, `/guest_session/${guestSessionId}/rated/movies`, {
			sort_by: sortBy,
			language
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
	 * Get the movies rated by a guest session
	 */
	getGuestRatedTvShows(guestSessionId: string, sortBy?: Sort, language?: string) {
		return get<SeriesResults>(this.__apiKey, `/guest_session/${guestSessionId}/rated/tv`, {
			sort_by: sortBy,
			language
		});
	}

	/**
	 * Get the TV show episodes rated by an account
	 */
	getRatedTvEpisodes(sessionId: string, accountId?: number, page?: number, sortBy?: Sort,
		language?: string)
	{
		let uri = accountId != undefined ? accountId : "{account_id}";
		return get<EpisodeResults>(this.__apiKey, `/account/${uri}/rated/tv/episodes`, {
			session_id: sessionId,
			sort_by: sortBy,
			language,
			page
		});
	}

	/**
	 * Get the movies rated by a guest session
	 */
	getGuestRatedTvEpisodes(guestSessionId: string, sortBy?: Sort, language?: string) {
		return get<EpisodeResults>(this.__apiKey,
			`/guest_session/${guestSessionId}/rated/tv/episodes`, {
				sort_by: sortBy,
				language
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
		return post<Response>(this.__apiKey, `/account/${uri}/watchlist`, {
			session_id: sessionId,
		}, {
			media_type: mediaType,
			media_id  : mediaId,
			watchlist: inWatchlist
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
		return post<RequestTokenResponse>(this.__apiKey,
				`/authentication/token/validate_with_login`, {}, {
				request_token: requestToken,
				username,
				password
			});
	}

	/**
	 * Create a new session
	 */
	createSession(requestToken: string) {
		return post<CreateSessionResponse>(this.__apiKey, `/authentication/session/new`, {}, {
			request_token: requestToken,
		});
	}

	/**
	 * Delete or "logout" from a session
	 */
	deleteSession(sessionId: string) {
		return del<DeleteSessionResponse>(this.__apiKey, `/authentication/session`, {}, {
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

	// Genre API -----------------------------------------------------------------------------------

	/**
	 * Get the list of official genres for movies
	 */
	getMovieGenreList(language?: string) {
		return get<GenreList>(this.__apiKey, `/genre/movie/list`, { language });
	}

	/**
	 * Get the list of official genres for TV shows
	 */
	getTvShowGenreList(language?: string) {
		return get<GenreList>(this.__apiKey, `/genre/tv/list`, { language });
	}

	// Keyword API ---------------------------------------------------------------------------------

	/**
	 * Get the details of a keyword
	 */
	getKeywordDetails(keywordId: number) {
		return get<Keyword>(this.__apiKey, `/keyword/${keywordId}`);
	}

	/**
	 * Get the movies that bleong to a keyword
	 */
	getMoviesWithKeyword(keywordId: number, language?: string, includeAdult?: boolean) {
		return get<MovieResultsWithId>(this.__apiKey, `/keyword/${keywordId}/movies`, {
			include_adult: includeAdult,
			language
		});
	}

	// Movie API -----------------------------------------------------------------------------------

	/**
	 * Get the primary information about a movie
	 */
	getMovieDetails(movieId: number, language?: string) {
		return get<MovieDetails>(this.__apiKey, `/movie/${movieId}`, { language });
	}

	/**
	 * Grab the account states for a session
	 */
	getMovieAccountStates(movieId: number, sessionId: string, guestSessionId?: string) {
		return get<AccountStates>(this.__apiKey, `/movie/${movieId}/account_states`, {
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
	getMovieChanges(movieId: number, page?: number, options: ChangesOptions = {}) {
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
	getMovieRecommendations(movieId: number, page?: number, language?: string) {
		return get<MovieResults>(this.__apiKey, `/movie/${movieId}/recommendations`, {
			language, page
		});
	}

	/**
	 * Get a list of similar movies. This is not the same as the "Recommendation" system.
	 */
	getSimilarMovies(movieId: number, page?: number, language?: string) {
		return get<MovieResults>(this.__apiKey, `/movie/${movieId}/similar`, {
			language, page
		});
	}

	/**
	 * Get the user reviews for a movie
	 */
	getMovieReviews(movieId: number, language?: string, page?: number) {
		return get<ReviewList>(this.__apiKey, `/movie/${movieId}/reviews`, {language, page});
	}

	/**
	 * Get a list of lists that a movie belongs to
	 */
	getMovieLists(movieId: number, language?: string, page?: number) {
		return get<Lists>(this.__apiKey, `/movie/${movieId}/lists`, {language, page});
	}

	/**
	 * Rate a movie. A valid session or guest session ID is required
	 */
	rateMovie(movieId: number, value: number, sessionId?: string, guestSessionId?: string) {
		return post<Response>(this.__apiKey, `/movie/${movieId}/rating`, {
			guest_session_id: guestSessionId,
			session_id      : sessionId
		}, { value });
	}

	/**
	 * Remove your rating for a movie. A valid session or guest session ID is required
	 */
	unrateMovie(movieId: number, sessionId?: string, guestSessionId?: string) {
		return del<Response>(this.__apiKey, `/movie/${movieId}/rating`, {
			guest_session_id: guestSessionId,
			session_id      : sessionId
		});
	}

	/**
	 * Get the most newly created movie. This is a live response and will continuously change
	 */
	getLatestMovie(language?: string) {
		return get<MovieDetails>(this.__apiKey, `/movie/latest`, { language });
	}

	/**
	 * Get a list of movies in theaters
	 */
	getMoviesNowPlaying(page?: number, region?: string, language?: string) {
		return get<MovieResults>(this.__apiKey, `/movie/now_playing`, { language, page, region });
	}

	/**
	 * Get a list of the current popular movies on TMDb. This list updates daily
	 */
	getPopularMovies(page?: number, region?: string, language?: string) {
		return get<MovieResults>(this.__apiKey, `/movie/popular`, { language, page, region });
	}

	/**
	 * Get the top rated movies on TMDb
	 */
	getTopRatedMovies(page?: number, region?: string, language?: string) {
		return get<MovieResults>(this.__apiKey, `/movie/top_rated`, { language, page, region });
	}

	/**
	 * Get a list of upcoming movies in theaters
	 */
	getUpcomingMovies(page?: number, region?: string, language?: string) {
		return get<MovieResults>(this.__apiKey, `/movie/upcoming`, { language, page, region });
	}

	// Search API ----------------------------------------------------------------------------------

	/**
	 * Search for a company
	 */
	searchCompanies(query: string, page?: number) {
		return get<CompanyResults>(this.__apiKey, "/search/company", { query, page });
	}

	/**
	 * Search for a collection
	 */
	searchCollections(query: string, page?: number, options: CollectionSearchOptions = {}) {
		return get<CollectionResults>(this.__apiKey, "/search/collection",
			Object.assign(options, {query, page}));
	}

	/**
	 * Search for keywords
	 */
	searchKeywords(query: string, page?: number) {
		return get<KeywordResults>(this.__apiKey, "/search/keyword", { query, page });
	}

	/**
	 * Search for a movie
	 */
	searchMovies(query: string, page?: number, options: MovieSearchOptions = {}) {
		return get<MovieResults>(this.__apiKey, "/search/movie",
			Object.assign(options, {query, page}));
	}

	/**
	 * Search for a person
	 */
	searchPeople(query: string, page?: number, options: PersonSearchOptions = {}) {
		return get<PersonResults>(this.__apiKey, "/search/person",
			Object.assign(options, {query, page}));
	}

	/**
	 * Search for a series
	 */
	searchSeries(query: string, page?: number, options: SeriesSearchOptions = {}) {
		return get<SeriesResults>(this.__apiKey, "/search/tv",
			Object.assign(options, {query, page}));
	}

	/**
	 * Search across movies, TV shows, and people at once
	 */
	search(query: string, page?: number, options: MultiSearchOptions = {}) {
		return get<MultiSearchResults>(this.__apiKey, "/search/multi",
			Object.assign(options, {query, page}));
	}

	// TV Series -----------------------------------------------------------------------------------

	/**
	 * Get the details for a TV show
	 */
	getTvShowDetails(tvId: number, language?: string) {
		return get<SeriesDetails>(this.__apiKey, `/tv/${tvId}`, { language });
	}

	/**
	 * Grab the account states for a session
	 */
	getTvShowAccountStates(tvId: number, sessionId?: string, guestSessionId?: string,
		language?: string)
	{
		return get<AccountStates>(this.__apiKey, `/tv/${tvId}/account_states`, {
			guest_session_id: guestSessionId,
			session_id: sessionId,
			language
		});
	}

	/**
	 * Get the alternative titles for a TV show
	 */
	getTvShowAltTitles(tvId: number, language?: string) {
		return get<AlternativeNames>(this.__apiKey, `/tv/${tvId}/alternative_titles`, {
			language
		});
	}

	/**
	 * Get the changes for a TV show. By default only the last 24 hours are returned
	 */
	getTvShowChanges(tvId: number, page?: number, options: ChangesOptions = {}) {
		return get<SeriesChanges>(this.__apiKey, `/tv/${tvId}/changes`,
			Object.assign(options, { page }));
	}

	/**
	 * Get the list of content ratings (certifications) that have been added to a TV show
	 */
	getTvShowContentRatings(tvId: number, language?: string) {
		return get<SeriesContentRatings>(this.__apiKey, `/tv/${tvId}/content_ratings`, {
			language
		});
	}

	/**
	 * Get the credits (cast and crew) of a TV show
	 */
	getTvShowCredits(tvId: number, language?: string) {
		return get<Credits>(this.__apiKey, `/tv/${tvId}/credits`, {language});
	}

	/**
	 * Get all episode groups that have been created for a TV show
	 */
	getTvShowEpisodeGroups(tvId: number, language?: string) {
		return get<EpisodeGroupResults>(this.__apiKey, `/tv/${tvId}/episode_groups`, {language});
	}

	/**
	 * Get the list of external IDs for a TV show
	 */
	getTvShowExternalIds(tvId: number, language?: string) {
		return get<SeriesExternalIdList>(this.__apiKey, `/tv/${tvId}/external_ids`, {language});
	}

	/**
	 * Get a list of images for a TV show
	 */
	getTvShowImages(tvId: number, language?: string) {
		return get<ImageList>(this.__apiKey, `/tv/${tvId}/images`, { language });
	}

	/**
	 * Get the list of keywords for a TV show
	 */
	getTvShowKeywords(tvId: number) {
		return get<KeywordResults>(this.__apiKey, `/tv/${tvId}/keywords`);
	}

	/**
	 * Get the list of TV show recommendations for a TV show
	 */
	getTvShowRecommendations(tvId: number, page?: number, language?: string) {
		return get<SeriesResults>(this.__apiKey, `/tv/${tvId}/recommendations`, { language, page });
	}

	/**
	 * Get the reviews for a TV show
	 */
	getTvShowReviews(tvId: number, page?: number, language?: string) {
		return get<ReviewList>(this.__apiKey, `/tv/${tvId}/reviews`, { language, page });
	}

	/**
	 * Get a list of seasons or episodes htat have been screened in a film festival or theater
	 */
	getTvShowTheatricalScreenings(tvId: number) {
		return get<SeriesTheatricalScreenings>(this.__apiKey, `/tv/${tvId}/screened_theatrically`);
	}

	/**
	 * Get a list of similar TV shows
	 */
	getSimilarTvShows(tvId: number, page?: number, language?: string) {
		return get<SeriesResults>(this.__apiKey, `/tv/${tvId}/similar`, { language, page });
	}

	/**
	 * Get the list of translations that exdist for a TV show
	 */
	getTvShowTranslations(tvId: number, language?: string) {
		return get<SeriesTranslationList>(this.__apiKey, `/tv/${tvId}/translations`, { language });
	}

	/**
	 * Get the videos that have been added to a TV show
	 */
	getTvShowVideos(tvId: number, language?: string) {
		return get<VideoList>(this.__apiKey, `/tv/${tvId}/videos`, { language });
	}

	/**
	 * Rate a TV show
	 */
	rateTvShow(tvId: number, value: number, sessionId?: string, guestSessionId?: string) {
		return post<Response>(this.__apiKey, `/tv/${tvId}/rating`, {
			guest_session_id: guestSessionId,
			session_id      : sessionId
		}, { value });
	}

	/**
	 * Delete a rating for a TV show
	 */
	unrateTvShow(tvId: number, sessionId?: string, guestSessionId?: string) {
		return del<Response>(this.__apiKey, `/tv/${tvId}/rating`, {
			guest_session_id: guestSessionId,
			session_id      : sessionId
		});
	}

	/**
	 * Get the latest TV show
	 */
	getLatestTvShow(language?: string) {
		return get<SeriesDetails>(this.__apiKey, `/tv/latest`, { language });
	}

	/**
	 * Get a list of TV shows airing today. Defaults to EST
	 */
	getTvShowsAiringToday(page?: number, language?: string) {
		return get<SeriesResults>(this.__apiKey, `/tv/airing_today`, { language, page });
	}

	/**
	 * Get a list of TV shows currently on the air
	 */
	getTvShowsOnAir(page?: number, language?: string) {
		return get<SeriesResults>(this.__apiKey, `/tv/on_the_air`, { language, page });
	}

	/**
	 * Get a list of popular TV shows on TMDb
	 */
	getPopularTvShows(page?: number, language?: string) {
		return get<SeriesResults>(this.__apiKey, `/tv/popular`, { language, page });
	}

	/**
	 * Get a list of top rated TV shows on TMDb
	 */
	getTopRatedTvShows(page?: number, language?: string) {
		return get<SeriesResults>(this.__apiKey, `/tv/top_rated`, { language, page });
	}

	// TV Seasons ----------------------------------------------------------------------------------

	/**
	 * Get the details of a TV show's season
	 */
	getSeasonDetails(tvId: number, season: number, language?: string) {
		return get<SeasonDetails>(this.__apiKey, `/tv/${tvId}/season/${season}`, { language });
	}

	/**
	 * Get the recent changes for a TV show's season. By default only the last 24 hours are returned
	 */
	getSeasonChanges(seasonId: number, page?: number, options: ChangesOptions = {}) {
		return get<SeasonChanges>(this.__apiKey, `/tv/season/${seasonId}/changes`,
			Object.assign(options, { page }));
	}

	/**
	 * Get the user ratings for a season's episodes
	 */
	getSeasonAccountStates(tvId: number, season: number, sessionId?: string,
		guestSessionId?: string, language?: string)
	{
		return get<SeasonAccountStates>(this.__apiKey,
			`/tv/${tvId}/season/${season}/account_states`, {
				guest_session_id: guestSessionId,
				session_id      : sessionId,
				language
			});
	}

	/**
	 * Get the credits for a TV show's season
	 */
	getSeasonCredits(tvId: number, season: number, language?: string) {
		return get<Credits>(this.__apiKey, `/tv/${tvId}/season/${season}/credits`, { language });
	}

	/**
	 * Get the list of external IDs for a TV show's season
	 */
	getSeasonExternalIds(tvId: number, season: number, language?: string) {
		return get<SeasonExternalIdList>(this.__apiKey, `/tv/${tvId}/season/${season}/external_ids`,
			{ language });
	}

	/**
	 * Get a list of images for a TV show's season
	 */
	getSeasonImages(tvId: number, season: number, language?: string) {
		return get<SeasonImages>(this.__apiKey, `/tv/${tvId}/season/${season}/images`,
			{ language });
	}

	/**
	 * Get a list of videos for a TV show's season
	 */
	getSeasonVideos(tvId: number, season: number, language?: string) {
		return get<VideoList>(this.__apiKey, `/tv/${tvId}/season/${season}/videos`, { language });
	}

	// TV Episodes ---------------------------------------------------------------------------------

	/**
	 * Get an episode's details
	 */
	getEpisodeDetails(tvId: number, season: number, episode: number, language?: string) {
		return get<EpisodeDetails>(this.__apiKey, `/tv/${tvId}/season/${season}/episode/${episode}`,
			{ language });
	}

	/**
	 * Get the recent changes of a TV show's episode. By default only the last 24 hours are returned
	 */
	getEpisodeChanges(episodeId: number, page?: number, options: ChangesOptions = {}) {
		return get<EpisodeChanges>(this.__apiKey, `/tv/episode/${episodeId}/changes`,
			Object.assign(options, { page }));
	}

	/**
	 * Get the account's rating for a TV show episode
	 */
	getEpisodeAccountState(tvId: number, season: number, episode: number, sessionId?: string,
		guestSessionId?: string, language?: string)
	{
		return get<EpisodeAccountState>(this.__apiKey,
			`/tv/${tvId}/season/${season}/episode/${episode}/account_states`, {
				guest_session_id: guestSessionId,
				session_id      : sessionId,
				language
			});
	}

	/**
	 * Get the credits for a TV show episode
	 */
	getEpisodeCredits(tvId: number, season: number, episode: number) {
		return get<EpisodeCredits>(this.__apiKey,
			`/tv/${tvId}/season/${season}/episode/${episode}/credits`);
	}

	/**
	 * Get the list of external IDs for a TV show episode
	 */
	getEpisodeExternalIds(tvId: number, season: number, episode: number) {
		return get<EpisodeExternalIdList>(this.__apiKey,
			`/tv/${tvId}/season/${season}/episode/${episode}/external_ids`);
	}

	/**
	 * Get a list of images for a TV show episode
	 */
	getEpisodeImages(tvId: number, season: number, episode: number) {
		return get<EpisodeImages>(this.__apiKey,
			`/tv/${tvId}/season/${season}/episode/${episode}/images`);
	}

	/**
	 * Get the translation data for a TV show episode
	 */
	getEpisodeTranslations(tvId: number, season: number, episode: number) {
		return get<EpisodeTranslationList>(this.__apiKey,
			`/tv/${tvId}/season/${season}/episode/${episode}/translations`);
	}

	/**
	 * Rate a TV show episode
	 */
	rateEpisode(tvId: number, season: number, episode: number, value: number, sessionId?: string,
		guestSessionId?: string)
	{
		return post<Response>(this.__apiKey,
			`/tv/${tvId}/season/${season}/episode/${episode}/rating`, {
				guest_session_id: guestSessionId,
				session_id      : sessionId
			}, { value });
	}

	/**
	 * Delete a rating for a TV show episode
	 */
	unrateEpisode(tvId: number, season: number, episode: number, sessionId?: string,
		guestSessionId?: string)
	{
		return del<Response>(this.__apiKey,
			`/tv/${tvId}/season/${season}/episode/${episode}/rating`, {
				guest_session_id: guestSessionId,
				session_id      : sessionId
			});
	}

	/**
	 * Get a list of videos for a TV show episode
	 */
	getEpisodeVideos(tvId: number, season: number, episode: number, language?: string) {
		return get<VideoList>(this.__apiKey,
			`/tv/${tvId}/season/${season}/episode/${episode}/videos`, { language });
	}

	// TV Episode Groups ---------------------------------------------------------------------------

	/**
	 * Get the details of a TV episode group
	 */
	getTvEpisodeGroupDetails(groupId: string, language?: string) {
		return get<EpisodeGroupDetails>(this.__apiKey, `/tv/episode_group/${groupId}`,
			{ language });
	}
}
