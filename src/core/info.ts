import { IGenres, IKeyword, IMovieCertifications, ITvCertifications } from "./interface/info";
import { IWithId, IMovieResults }                                     from "./interface/results";
import { get }                                                        from "./util/network";

export let info = {
	/**
	 * Get an up-to-date list of the officially supported movie certifications on TMDb
	 */
	getMovieCertifications(apiKey: string) {
		return get<IMovieCertifications>(apiKey, "/certification/movie/list");
	},

	/**
	 * Get an up-to-date list of the officially supported TV certifications on TMDb
	 */
	getTvCertifications(apiKey: string) {
		return get<ITvCertifications>(apiKey, "/certification/tv/list");
	},

	/**
	 * Get the list of official genres for movies
	 */
	getMovieGenreList(apiKey: string, language?: string) {
		return get<IGenres>(apiKey, "/genre/movie/list", { language });
	},

	/**
	 * Get the list of official genres for TV shows
	 */
	getTvGenreList(apiKey: string, language?: string) {
		return get<IGenres>(apiKey, "/genre/tv/list", { language });
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
