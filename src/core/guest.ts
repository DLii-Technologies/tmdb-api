import { IGuestSessionResponse }                          from "./interface/response";
import { get }                                            from "./util/network";
import { ISeriesResults, IEpisodeResults, IMovieResults } from "./interface/results";
import { Sort }                                           from "./enums";

export let guest = {
	/**
	 * Create a new guest session. Guest sessions will allow rating movies and TV shows without
	 * requiring a TMDb account
	 */
	createSession(apiKey: string) {
		return get<IGuestSessionResponse>(apiKey, `authentication/guest_session/new`);
	},

	/**
	 * Get the movies rated by a guest session
	 */
	getRatedMovies(apiKey: string, guestSessionId: string, sortBy?: Sort, language?: string) {
		return get<IMovieResults>(apiKey, `guest_session/${guestSessionId}/rated/movies`, {
			sort_by: sortBy,
			language
		});
	},

	/**
	 * Get the movies rated by a guest session
	 */
	getRatedTvShows(apiKey: string, guestSessionId: string, sortBy?: Sort, language?: string) {
		return get<ISeriesResults>(apiKey, `guest_session/${guestSessionId}/rated/tv`, {
			sort_by: sortBy,
			language
		});
	},

	/**
	 * Get the movies rated by a guest session
	 */
	getRatedEpisodes(apiKey: string, guestSessionId: string, sortBy?: Sort, language?: string) {
		return get<IEpisodeResults>(apiKey,
			`guest_session/${guestSessionId}/rated/tv/episodes`, {
				sort_by: sortBy,
				language
			});
	}
};
