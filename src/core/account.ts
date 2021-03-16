import { IAccountDetails } from "./interface/account";
import { MediaType, Sort } from "./enums";
import { IResponse }       from "./interface/response";
import { IMovieResults,
         ISeriesResults,
         IEpisodeResults } from "./interface/results";
import { get, post }       from "./util/network";
import { uriF }            from "./util/utils";

export let account = {
	/**
	 * Get the details of the provided account
	 */
	getDetails(apiKey: string, sessionId: string) {
		return get<IAccountDetails>(apiKey, "account", { session_id: sessionId });
	},

	/**
	 * Get an account's favorite movies
	 */
	getFavoriteMovies(apiKey: string, sessionId: string, accountId?: number, page?: number,
		sortBy?: Sort, language?: string)
	{
		return get<IMovieResults>(apiKey, uriF("account/{account_id}/favorite/movies", accountId),
			{
				session_id: sessionId,
				sort_by   : sortBy,
				language,
				page
			});
	},

	/**
	 * Get an account's favorite TV shows
	 */
	getFavoriteTvShows(apiKey: string, sessionId: string, accountId?: number, page?: number,
		sortBy?: Sort, language?: string)
	{
		return get<ISeriesResults>(apiKey, uriF("account/{account_id}/favorite/tv", accountId), {
			session_id: sessionId,
			sort_by   : sortBy,
			language,
			page
		});
	},

	/**
	 * Get the movies rated by an account
	 */
	getRatedMovies(apiKey: string, sessionId: string, accountId?: number, page?: number,
		sortBy?: Sort, language?: string)
	{
		return get<IMovieResults>(apiKey, uriF("account/{account_id}/rated/movies", accountId), {
			session_id: sessionId,
			sort_by   : sortBy,
			language,
			page
		});
	},

	/**
	 * Get the TV shows rated by an account
	 */
	getRatedTvShows(apiKey: string, sessionId: string, accountId?: number, page?: number,
		sortBy?: Sort, language?: string)
	{
		return get<ISeriesResults>(apiKey, uriF("account/{account_id}/rated/tv", accountId), {
			session_id: sessionId,
			sort_by   : sortBy,
			language,
			page
		});
	},

	/**
	 * Get the TV show episodes rated by an account
	 */
	getRatedTvEpisodes(apiKey: string, sessionId: string, accountId?: number, page?: number,
		sortBy?: Sort, language?: string)
	{
		return get<IEpisodeResults>(apiKey, uriF("account/{uri}/rated/tv/episodes", accountId), {
			session_id: sessionId,
			sort_by   : sortBy,
			language,
			page
		});
	},

	/**
	 * Get an account's movie watchlist
	 */
	getMovieWatchlist(apiKey: string, sessionId: string, accountId?: number, page?: number,
		sortBy?: Sort, language?: string)
	{
		return get<IMovieResults>(apiKey, uriF("account/{account_id}/watchlist/movies", accountId), {
			session_id: sessionId,
			sort_by   : sortBy,
			language,
			page
		});
	},

	/**
	 * Get an account's TV show watchlist
	 */
	getTvShowWatchList(apiKey: string, sessionId: string, accountId?: number, page?: number,
		sortBy?: Sort, language?: string)
	{
		return get<ISeriesResults>(apiKey, uriF("account/{account_id}/watchlist/tv", accountId), {
			session_id: sessionId,
			sort_by   : sortBy,
			language,
			page
		});
	},

	/**
	 * Mark a movie or TV show as an account's favorite.
	 */
	markFavorite(apiKey: string, sessionId: string, mediaType: MediaType, mediaId: number,
		 isFavorite: boolean, accountId?: number)
	{
		return post<IResponse>(apiKey, uriF("account/{account_id}/favorite", accountId), {
			session_id: sessionId,
		}, {
			media_type: mediaType,
			media_id  : mediaId,
			favorite  : isFavorite
		});
	},

	/**
	 * Mark a movie or TV show as being in an account's watchlist
	 */
	markInWatchlist(apiKey: string, sessionId: string, mediaType: MediaType, mediaId: number,
		isInWatchlist: boolean, accountId?: number)
	{
		return post<IResponse>(apiKey, uriF("account/{account_id}/watchlist", accountId), {
			session_id: sessionId,
		}, {
			media_type: mediaType,
			media_id  : mediaId,
			watchlist: isInWatchlist
		});
	}
};
