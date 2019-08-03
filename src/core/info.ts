import { IGenres, IKeyword }      from "./interface/info";
import { get }                    from "./util/network";
import { IWithId, IMovieResults } from "./interface/results";

export let info = {
	/**
	 * Get the list of official genres for movies
	 */
	getMovieGenreList(apiKey: string, language?: string) {
		return get<IGenres>(apiKey, `/genre/movie/list`, { language });
	},

	/**
	 * Get the list of official genres for TV shows
	 */
	getTvShowGenreList(apiKey: string, language?: string) {
		return get<IGenres>(apiKey, `/genre/tv/list`, { language });
	},

	/**
	 * Get the details of a keyword
	 */
	getKeywordDetails(apiKey: string, keywordId: number) {
		return get<IKeyword>(apiKey, `/keyword/${keywordId}`);
	},

	/**
	 * Get the movies that bleong to a keyword
	 */
	getMoviesWithKeyword(apiKey: string, keywordId: number, language?: string, includeAdult?: boolean) {
		return get<IMovieResults & IWithId>(apiKey, `/keyword/${keywordId}/movies`, {
			include_adult: includeAdult,
			language
		});
	}
};
