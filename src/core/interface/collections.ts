/**
 * @WARN Very similar to `MovieBase`
 */
export interface ICollectionPart {
	adult            : boolean;
	backdrop_path    : string | null;
	genre_ids        : number[];
	id               : number;
	original_language: string;
	original_title   : string;
	overview         : string;
	release_date     : string;
	poster_path      : string;
	popularity       : number;
	title            : string;
	video            : boolean;
	vote_average     : number;
	vote_count       : number;
}

export interface ICollection {
	id           : number;
	backdrop_path: string | null;
	name         : string;
	poster_path  : string | null;
}

export interface ICollectionDetails extends ICollection {
	overview     : string;
	backdrop_path: string;
	parts        : ICollectionPart[];
}
