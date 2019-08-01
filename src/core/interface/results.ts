import { IPaginated }                 from "./core";
import { IEpisode, ISeries, ISeason } from "./tv";
import { IMovie }                     from "./movie";
import { IKeyword }                   from "./info";
import { ICompany }                   from "./company";
import { ICollection }                from "./collections";
import { IPerson }                    from "./people";

export interface ICompanyResults extends IPaginated {
	results: ICompany[];
}

export interface ICollectionResults extends IPaginated {
	results: ICollection[];
}

export interface IFindResults {
	movie_results     : IMovie[];
	person_results    : IPerson[];
	tv_episode_results: IEpisode[];
	tv_results        : ISeries[];
	tv_season_results : ISeason[];
}

export interface IEpisodeResults extends IPaginated {
	results: IEpisode[];
}

export interface IMovieResults extends IPaginated {
	results: IMovie[];
}

export interface ISeriesResults extends IPaginated {
	results: ISeries[];
}

export interface IKeywordResults extends IPaginated {
	results: IKeyword[];
}

export interface ICombinedResults extends IPaginated {
	results: IMovie[] | ISeries[] | IPerson[];
}

export interface PersonResults extends IPaginated {
	results: IPerson[];
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
