import { IPaginated }  from "./core";
import { IEpisode,
         ISeries,
         ISeason }     from "./tv";
import { IMovie }      from "./movie";
import { IKeyword }    from "./info";
import { ICompany }    from "./company";
import { ICollection } from "./collections";
import { IPerson }     from "./people";
import { IList }       from "./list";

/**
 * A generic result structure containing an identifier
 */
export interface IResultsWithId<T> {
	id     : number;
	results: T[];
}

export interface ICompanyResults extends IPaginated<ICompany> {}

export interface ICollectionResults extends IPaginated<ICollection> {}

export interface IEpisodeResults extends IPaginated<IEpisode> {}

export interface IListResults extends IPaginated<IList> {}

export interface IMovieResults extends IPaginated<IMovie> {}

export interface ISeriesResults extends IPaginated<ISeries> {}

export interface IKeywordResults extends IPaginated<IKeyword> {}

export interface ICombinedResults extends IPaginated<IMovie | ISeries | IPerson> {}

export interface IPersonResults extends IPaginated<IPerson> {}

export interface IFindResults {
	movie_results     : IMovie[];
	person_results    : IPerson[];
	tv_episode_results: IEpisode[];
	tv_results        : ISeries[];
	tv_season_results : ISeason[];
}

export interface IWithId {
	id: number;
}

export interface IWithinDate {
	dates: {
		minimum: string;
		maximum: string;
	};
}
