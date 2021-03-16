export interface ILanguage {
	iso_639_1: string;
	name     : string;
}

export interface IWithEnglishName {
	english_name: string;
}

interface ITranslation extends ILanguage, IWithEnglishName {
	iso_3166_1: string;
	data      : any;
}

export interface ITranslations<T> {
	id          : number;
	translations: T[];
}

// Translation Types -------------------------------------------------------------------------------

export interface IMovieTranslation extends ITranslation {
	data: {
		homepage: string;
		overview: string;
		title   : string;
	};
}

export interface ICollectionTranslation extends ITranslation {
	data: {
		homepage: string;
		overview: string;
		title   : string;
	};
}

export interface IPersonTranslation extends ITranslation {
	data: {
		biography: string;
	};
}

export interface IEpisodeTranslation extends ITranslation {
	data: {
		name    : string;
		overview: string;
	};
}

export interface ISeasonTranslation extends ITranslation {
	data: {
		name    : string;
		overview: string;
	}
}

export interface ISeriesTranslation extends ITranslation {
	data: {
		name    : string;
		overview: string;
		homepage: string;
	};
}