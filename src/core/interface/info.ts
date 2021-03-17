import { IResultsWithId } from "./results";

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

export interface ICountry {
	iso_3166_1  : string;
	english_name: string;
}

export interface IJob {
	department: string;
	jobs      : string[];
}

export interface ITimezone {
	iso_3166_1: string;
	zones     : string[];
}

export interface IAlternativeTitle {
	iso_3166_1: string;
	title     : string;
	type      : string;
}

export interface IAlternativeTitles {
	id    : number;
	titles: IAlternativeTitle[];
}

export interface IAlternativeName {
	name: string;
	type: string;
}

export interface IAlternativeNames extends IResultsWithId<IAlternativeName> {}

export interface ICertification {
	certification: string;
	meaning      : string;
	order        : number;
}

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

export interface IGenre {
	id  : number;
	name: string;
}

export interface IGenres {
	genres: IGenre[];
}

export interface IProductionCountry {
	iso_3166_1: string;
	name      : string;
}

export interface IKeyword {
	id  : number;
	name: string;
}

export interface IKeywords {
	id      : number;
	keywords: IKeyword[];
}

/**
 * @variation
 * Due to inconsistencies in the REST API, sometimes keywords are returned with a `results` field
 * instead of the `keywords` field
 */
export interface IKeywordsAlt extends IResultsWithId<IKeyword> {}

export interface IWatchProvider {
	display_priority: number;
	logo_path       : string;
	provider_id     : number;
	provider_name   : string;
}

export interface IWatchProviderSource {
	link     : string;
	flatrate?: IWatchProvider[];
	buy     ?: IWatchProvider[];
	rent    ?: IWatchProvider[]; // @WARN: This does not seem to be included in TV show listings, only movies
}

export interface IMovieWatchProviders {
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

export interface ITvWatchProviders {
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

export interface IWatchProvidersResults<T> {
	id     : number;
	results: T;
}
