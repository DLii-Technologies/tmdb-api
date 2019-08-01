export interface IAlternativeTitles {
	id    : number;
	titles: {
		iso_3166_1: string;
		title     : string;
		type      : string;
	}[];
}

export interface IAlternativeNames {
	id     : number;
	results: {
		name: string;
		type: string;
	}[];
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
