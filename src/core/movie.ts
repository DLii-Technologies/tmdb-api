import { IMovieAccountState }    from "./interface/account";
import { IAlternativeTitles,
         IKeywords,
         IMovieWatchProviders,
         IWatchProvidersResult } from "./interface/info";
import { ICredits }              from "./interface/credits";
import { IExternalIds }          from "./interface/external";
import { IImages,
         IVideos }               from "./interface/media";
import { ILists }                from "./interface/list";
import { IMovieDetails,
         IReleaseDates }         from "./interface/movie";
import { IMovieResults }         from "./interface/results";
import { IResponse }             from "./interface/response";
import { ITranslations,
         IMovieTranslation }     from "./interface/language";
import { get, post, del }        from "./util/network";

export let movie = {
	/**
	 * Get the primary information about a movie
	 */
	getDetails(apiKey: string, movieId: number, language?: string) {
		return get<IMovieDetails>(apiKey, `movie/${movieId}`, { language });
	},

	/**
	 * Grab the account states for a session
	 */
	getAccountState(apiKey: string, movieId: number, sessionId: string, guestSessionId?: string) {
		return get<IMovieAccountState>(apiKey, `movie/${movieId}/account_states`, {
			session_id      : sessionId,
			guest_session_id: guestSessionId
		});
	},

	/**
	 * Get all of the alternative titles for a movie
	 */
	getAltTitles(apiKey: string, movieId: number, country?: string) {
		return get<IAlternativeTitles>(apiKey, `movie/${movieId}/alternative_titles`, {
			country
		});
	},

	/**
	 * Get the cast and crew for a movie
	 */
	getCredits(apiKey: string, movieId: number) {
		return get<ICredits>(apiKey, `movie/${movieId}/credits`);
	},

	/**
	 * Get the external ids for a movie. The following are currently supported:
	 *
	 * - IMDb ID
	 * - Facebook
	 * - Instagram
	 * - Twitter
	 */
	getExternalIds(apiKey: string, movieId: number) {
		return get<IExternalIds>(apiKey, `movie/${movieId}/external_ids`);
	},

	/**
	 * Get the images that belong to a movie
	 *
	 * Querying images with a language parameter will filter the results. If you want to include a
	 * fallback language you can use the `includeLanguage` parameter, e.g. ['en', null]
	 */
	getImages(apiKey: string, movieId: number, language?: string, includeLanguage?: string[]) {
		return get<IImages>(apiKey, `movie/${movieId}/images`, {
			language,
			include_image_language: includeLanguage && includeLanguage.join(',')
		});
	},

	/**
	 * Get the keywords that have been added to a movie
	 */
	getKeywords(apiKey: string, movieId: number) {
		return get<IKeywords>(apiKey, `movie/${movieId}/keywords`);
	},

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
	getReleaseDates(apiKey: string, movieId: number) {
		return get<IReleaseDates>(apiKey, `movie/${movieId}/release_dates`);
	},

	/**
	 * Get a list of watch providers for the given movie. **Must** credit *justWatch* if used!
	 */
	 getWatchProviders(apiKey: string, movieId: number) {
		return get<IWatchProvidersResult<IMovieWatchProviders>>(apiKey,
			`movie/${movieId}/watch/providers`);
	},

	/**
	 * Get the videos that have been added to a movie
	 */
	getVideos(apiKey: string, movieId: number, language?: string) {
		return get<IVideos>(apiKey, `movie/${movieId}/videos`, { language });
	},

	/**
	 * Get a list of translations that have been created for a movie
	 */
	getTranslations(apiKey: string, movieId: number) {
		return get<ITranslations<IMovieTranslation>>(apiKey, `movie/${movieId}/translations`);
	},

	/**
	 * Get a list of recommended movies for a movie
	 */
	getRecommendations(apiKey: string, movieId: number, page?: number, language?: string) {
		return get<IMovieResults>(apiKey, `movie/${movieId}/recommendations`, {
			language, page
		});
	},

	/**
	 * Get a list of similar movies. This is not the same as the "Recommendation" system.
	 */
	getSimilar(apiKey: string, movieId: number, page?: number, language?: string) {
		return get<IMovieResults>(apiKey, `movie/${movieId}/similar`, {
			language, page
		});
	},

	/**
	 * Get a list of lists that a movie belongs to
	 */
	getLists(apiKey: string, movieId: number, page?: number, language?: string) {
		return get<ILists>(apiKey, `movie/${movieId}/lists`, { language, page });
	},

	/**
	 * Rate a movie. A valid session or guest session ID is required
	 */
	rate(apiKey: string, movieId: number, value: number, sessionId?: string, guestSessionId?: string) {
		return post<IResponse>(apiKey, `movie/${movieId}/rating`, {
			guest_session_id: guestSessionId,
			session_id      : sessionId
		}, { value });
	},

	/**
	 * @TODO Overload this
	 * Remove your rating for a movie. A valid session or guest session ID is required
	 */
	unrate(apiKey: string, movieId: number, sessionId?: string, guestSessionId?: string) {
		return del<IResponse>(apiKey, `movie/${movieId}/rating`, {
			guest_session_id: guestSessionId,
			session_id      : sessionId
		});
	},

	/**
	 * Get the most newly created movie. This is a live response and will continuously change
	 */
	getLatest(apiKey: string, language?: string) {
		return get<IMovieDetails>(apiKey, `movie/latest`, { language });
	},

	/**
	 * Get a list of movies in theaters
	 */
	getNowPlaying(apiKey: string, page?: number, region?: string, language?: string) {
		return get<IMovieResults>(apiKey, `movie/now_playing`, { language, page, region });
	},

	/**
	 * Get a list of the current popular movies on TMDb. This list updates daily
	 */
	getPopular(apiKey: string, page?: number, region?: string, language?: string) {
		return get<IMovieResults>(apiKey, `movie/popular`, { language, page, region });
	},

	/**
	 * Get the top rated movies on TMDb
	 */
	getTopRated(apiKey: string, page?: number, region?: string, language?: string) {
		return get<IMovieResults>(apiKey, `movie/top_rated`, { language, page, region });
	},

	/**
	 * Get a list of upcoming movies in theaters
	 */
	getUpcoming(apiKey: string, page?: number, region?: string, language?: string) {
		return get<IMovieResults>(apiKey, `movie/upcoming`, { language, page, region });
	}
};
