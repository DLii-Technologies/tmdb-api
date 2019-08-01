import { IPaginated, IMediaModel }          from "./core";
import { IGuestStar, ICrewMember, IMember } from "./credits";
import { INetwork, IProductionCompany }     from "./company";
import { EpisodeGroupType }                 from "../enums";
import { IGenre }                           from "./info";

interface IEpisodeBase {
	air_date       : string;
	episode_number : number;
	id             : number; // May have issues with this ID being here, was in `EpisodeDetails`
	name           : string;
	overview       : string;
	production_code: string | null;
	season_number  : number;
	still_path     : string | null;
	vote_average   : number;
	vote_count     : number;
}

export interface IEpisode extends IEpisodeBase {
	show_id: number;
}

export interface IEpisodeOrdered extends IEpisode {
	order: number;
}

export interface IEpisodeDetails extends IEpisodeBase {
	crew       : ICrewMember[];
	guest_stars: IGuestStar[];
}

export interface IEpisodeGroupItem {
	id   : string;
	name : string;
	order: number;
	episodes: IEpisodeOrdered[];
}

export interface IEpisodeGroup {
	description  : string;
	episode_count: number;
	group_count  : number;
	id           : string;
	name         : string;
	network      : INetwork;
	type         : EpisodeGroupType;
}

export interface IEpisodeGroupDetails extends IEpisodeGroup {
	groups: IEpisodeGroupItem[];
}


export interface IEpisodeGroups {
	id     : number;
	results: IEpisodeGroup[];
}

interface IEpisodeBase {
	air_date       : string;
	episode_number : number;
	id             : number; // @WARN May have issues with this ID being here, was in `EpisodeDetails`
	name           : string;
	overview       : string;
	production_code: string | null;
	season_number  : number;
	still_path     : string | null;
	vote_average   : number;
	vote_count     : number;
}

export interface IEpisode extends IEpisodeBase {
	show_id: number;
}

export interface IEpisodeDetails extends IEpisodeBase {
	crew       : ICrewMember[];
	guest_stars: IGuestStar[];
}

export interface IEpisodeResults extends IPaginated {
	results: IEpisode[];
}

interface ISeasonBase {
	air_date     : string;
	id           : number;
	name         : string;
	overview     : string;
	poster_path  : string;
	season_number: number;
}

export interface ISeason extends ISeasonBase {
	episode_count: number;
}

export interface ISeasonDetails extends ISeasonBase {
	_id     : string;
	episodes: IEpisodeDetails[];
}

interface ISeriesBase extends IMediaModel {
	backdrop_path    : string | null;
	first_air_date   : string;
	id               : number;
	name             : string;
	origin_country   : string[];
	original_language: string;
	original_name    : string;
	overview         : string;
	popularity       : number;
	poster_path      : string | null;
	vote_average     : number;
	vote_count       : number;
}

export interface ISeries extends ISeriesBase {
	genre_ids: number[];
	rating  ?: number; // @WARN Only used when retrieving rated TV shows
}

export interface ISeriesDetails extends ISeriesBase {
	created_by          : IMember[];
	episode_run_time    : number[];
	genres              : IGenre[];
	homepage            : string;
	in_production       : boolean;
	languages           : string[];
	last_air_date       : string;
	last_episode_to_air : IEpisode;
	next_episode_to_air : IEpisode | null;
	networks            : INetwork[];
	production_companies: IProductionCompany[];
	seasons             : ISeason[];
	status              : string;
	type                : string;
}

export interface ISeriesContentRating {
	iso_3166_1: string;
	rating    : string; // TV-MA, 18+, etc.
}

export interface ISeriesContentRatings {
	id     : number;
	results: ISeriesContentRating[];
}

export interface ITheatricalScreening {
	id            : number;
	episode_number: number;
	season_number : number;
}

export interface ITheatricalScreenings {
	id     : number;
	results: ITheatricalScreening;
}
