export interface ILanguage {
	iso_639_1: string;
	name     : string;
}

export interface ITranslation {
	iso_3166_1  : string;
	iso_639_1   : string;
	name        : string;
	english_name: string;
	data        : any;
}

export interface ITranslations {
	id     : number;
	results: ITranslation[];
}

export interface IMovieTranslation extends ITranslation {
	data: {
		title   : string;
		overview: string;
		homepage: string;
	};
}

export interface IMovieTranslations {
	id          : number;
	translations: IMovieTranslation[];
}

export interface IPersonTranslation extends ITranslation {
	data: {
		biography: string;
	};
}

export interface IPersonTranslations extends ITranslations {
	id          : number;
	translations: IPersonTranslation[];
}

export interface IEpisodeTranslation {
	data: {
		name    : string;
		overview: string;
	};
}

export interface IEpisodeTranslations {
	id          : number;
	translations: IEpisodeTranslation[];
}

export interface ISeriesTranslation extends ITranslation {
	data: {
		name    : string;
		overview: string;
		homepage: string;
	};
}

export interface IseriesTranslations extends ITranslations {
	translations: ISeriesTranslation[];
}
