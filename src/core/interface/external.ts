/**
 * @TODO Maybe merge all of these varients since they can me null anyway??
 */
export interface IExternalIds {
	id          : number;
	imdb_id     : string | null;
	facebook_id : string | null;
	instagram_id: string | null;
	twitter_id  : string | null;
}

export interface ISeasonExternalIds {
	freebase_mid: string | null;
	freebase_id : string | null;
	tvdb_id     : number | null;
	tvrage_id   : number | null;
}

export interface ISeriesExternalIds extends IExternalIds, ISeasonExternalIds
{}

export interface IEpisodeExternalIds extends ISeasonExternalIds {
	imdb_id: string | null;
}

export interface IPersonExternalIds extends IExternalIds {
	freebase_mid: string | null;
	freebase_id : string | null;
	tvrage_id   : number | null;
}
