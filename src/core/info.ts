import { IGenres, IKeyword, IMovieCertifications, ITvCertifications, IApiConfiguration, ICountry,
	IJob, ITimezone }                  from "./interface/info";
import { IWithId, IMovieResults }      from "./interface/results";
import { get }                         from "./util/network";
import { ILanguage, IWithEnglishName } from "./interface/language";

export let info = {
	/**
	 * Get the system-wide configuration information
	 */
	getApiConfiguration(apiKey: string) {
		return get<IApiConfiguration>(apiKey, "/configuration");
	},

	/**
	 * Get the list of countries used throughout TMDb
	 */
	getCountries(apiKey: string) {
		return get<ICountry[]>(apiKey, "/configuration/countries");
	},

	/**
	 * Get a list of the jobs and departments used on TMDb
	 */
	getJobs(apiKey: string) {
		return get<IJob[]>(apiKey, "/configuration/jobs");
	},

	/**
	 * Get a list of the languages used on TMDb
	 */
	getLanguages(apiKey: string) {
		return get<(ILanguage & IWithEnglishName)[]>(apiKey, "/configuration/languages");
	},

	/**
	 * Get a list of the *officially* supported translations on TMDb
	 */
	getPrimaryTranslations(apiKey: string) {
		return get<string[]>(apiKey, "/configuration/primary_translations");
	},

	/**
	 * Get the list of timezones used throughout TMDb
	 */
	getTimezones(apiKey: string) {
		return get<ITimezone[]>(apiKey, "/configuration/timezones");
	},

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
