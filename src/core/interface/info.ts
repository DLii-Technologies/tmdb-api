import { IResultsWithId } from "./results";

// Configuration -----------------------------------------------------------------------------------

/**
 * Systemwide configuration information
 */
export interface IApiConfiguration {
	change_keys: string[];
	images     : {
		base_url       : string;
		secure_base_url: string;
		backdrop_sizes : string[];
		logo_sizes     : string[];
		poster_sizes   : string[];
		profile_sizes  : string[];
		still_sizes    : string[];
	};
}

/**
 * A country information structure
 */
export interface ICountry {
	iso_3166_1  : string;
	english_name: string;
}

/**
 * A job information structure
 */
export interface IJob {
	department: string;
	jobs      : string[];
}

/**
 * A timezone information structure
 */
export interface ITimezone {
	iso_3166_1: string;
	zones     : string[];
}

// Alternative Movie/TV Show Titles ----------------------------------------------------------------

/**
 * A list of alternative titles for a movie
 */
export interface IAlternativeMovieTitles {
	id    : number;
	titles: IAlternativeTitle[];
}

/**
 * A list of alternative titles for a TV show
 */
export interface IAlternativeSeriesTitles extends IResultsWithId<IAlternativeTitle> {}

/**
 * Alternative title information for a movie/TV show
 */
export interface IAlternativeTitle {
	iso_3166_1: string;
	title     : string;
	type      : string;
}

// Alternative Company/Network names ---------------------------------------------------------------

/**
 * Resulting alternative names for a company/network
 */
 export interface IAlternativeNames extends IResultsWithId<IAlternativeName> {}

/**
 * Alternative name information for a company/network
 */
export interface IAlternativeName {
	name: string;
	type: string;
}

// Certification Information -----------------------------------------------------------------------

/**
 * Certifications for a movie by each country
 */
export interface IMovieCertifications {
	certifications: {
		US: ICertification[];
		CA: ICertification[];
		DE: ICertification[];
		GB: ICertification[];
		AU: ICertification[];
		BR: ICertification[];
		FR: ICertification[];
		NZ: ICertification[];
		IN: ICertification[];
	}
}

/**
 * Certifications for a TV show by each country
 */
export interface ITvCertifications {
	certifications: {
		US: ICertification[];
		CA: ICertification[];
		DE: ICertification[];
		GB: ICertification[];
		AU: ICertification[];
		BR: ICertification[];
		FR: ICertification[];
		NZ: ICertification[];
		RU: ICertification[];
		KR: ICertification[];
	}
}

/**
 * A certification type
 */
export interface ICertification {
	certification: string;
	meaning      : string;
	order        : number;
}

// Genres ------------------------------------------------------------------------------------------

/**
 * A list of available genres
 */
export interface IGenres {
	genres: IGenre[];
}

/**
 * A genre's information
 */
export interface IGenre {
	id  : number;
	name: string;
}

// Keywords ----------------------------------------------------------------------------------------

/**
 * The keyword results structure returned for movies
 *
 * https://developers.themoviedb.org/3/movies/get-movie-keywords
 */
 export interface IMovieKeywords {
	id      : number;
	keywords: IKeyword[];
}

/**
 * The keyword results structure return for TV shows
 *
 * https://developers.themoviedb.org/3/tv/get-tv-keywords
 */
export interface ISeriesKeywords extends IResultsWithId<IKeyword> {}

/**
 * The keyword structures
 */
export interface IKeyword {
	id  : number;
	name: string;
}

// Watch Providers ---------------------------------------------------------------------------------

/**
 * The watch providers for a particular type of media
 */
export interface IWatchProvidersResults<T> {
	id     : number;
	results: T;
}

/**
 * A list of watch providers for a movie by country
 */
export interface IMovieWatchProviders { // This is nasty...
	AR: IWatchProviderSource;
	AT: IWatchProviderSource;
	AU: IWatchProviderSource;
	BE: IWatchProviderSource;
	BR: IWatchProviderSource;
	CA: IWatchProviderSource;
	CH: IWatchProviderSource;
	CL: IWatchProviderSource;
	CO: IWatchProviderSource;
	CZ: IWatchProviderSource;
	DE: IWatchProviderSource;
	DK: IWatchProviderSource;
	EC: IWatchProviderSource;
	EE: IWatchProviderSource;
	ES: IWatchProviderSource;
	FI: IWatchProviderSource;
	FR: IWatchProviderSource;
	GB: IWatchProviderSource;
	GR: IWatchProviderSource;
	HU: IWatchProviderSource;
	ID: IWatchProviderSource;
	IE: IWatchProviderSource;
	IN: IWatchProviderSource;
	IT: IWatchProviderSource;
	JP: IWatchProviderSource;
	KR: IWatchProviderSource;
	LT: IWatchProviderSource;
	LV: IWatchProviderSource;
	MX: IWatchProviderSource;
	MY: IWatchProviderSource;
	NL: IWatchProviderSource;
	NO: IWatchProviderSource;
	NZ: IWatchProviderSource;
	PE: IWatchProviderSource;
	PH: IWatchProviderSource;
	PL: IWatchProviderSource;
	PT: IWatchProviderSource;
	RO: IWatchProviderSource;
	RU: IWatchProviderSource;
	SE: IWatchProviderSource;
	SG: IWatchProviderSource;
	TH: IWatchProviderSource;
	TR: IWatchProviderSource;
	US: IWatchProviderSource;
	VE: IWatchProviderSource;
	ZA: IWatchProviderSource;
}

/**
 * A list of watch providers for a TV show by country
 */
export interface ISeriesWatchProviders { // This is also nasty
	AR: IWatchProviderSource;
	AT: IWatchProviderSource;
	AU: IWatchProviderSource;
	BE: IWatchProviderSource;
	BR: IWatchProviderSource;
	CA: IWatchProviderSource;
	CH: IWatchProviderSource;
	CL: IWatchProviderSource;
	CO: IWatchProviderSource;
	CZ: IWatchProviderSource;
	DE: IWatchProviderSource;
	DK: IWatchProviderSource;
	EC: IWatchProviderSource;
	ES: IWatchProviderSource;
	FI: IWatchProviderSource;
	FR: IWatchProviderSource;
	GB: IWatchProviderSource;
	HU: IWatchProviderSource;
	IE: IWatchProviderSource;
	IN: IWatchProviderSource;
	IT: IWatchProviderSource;
	JP: IWatchProviderSource;
	MX: IWatchProviderSource;
	NL: IWatchProviderSource;
	NO: IWatchProviderSource;
	NZ: IWatchProviderSource;
	PE: IWatchProviderSource;
	PL: IWatchProviderSource;
	PT: IWatchProviderSource;
	RO: IWatchProviderSource;
	RU: IWatchProviderSource;
	SE: IWatchProviderSource;
	TR: IWatchProviderSource;
	US: IWatchProviderSource;
	VE: IWatchProviderSource;
	ZA: IWatchProviderSource;
}

/**
 * Watch providers for different possible methods of obtaining the media
 */
export interface IWatchProviderSource {
	link     : string;
	flatrate?: IWatchProvider[];
	buy     ?: IWatchProvider[];
	rent    ?: IWatchProvider[]; // @WARN: This does not seem to be included in TV show listings, only movies
}

/**
 * A watch provider's information structure
 */
 export interface IWatchProvider {
	display_priority: number;
	logo_path       : string;
	provider_id     : number;
	provider_name   : string;
}
