import { IMediaModel } from "./core";

interface IMemberDetailsBase extends IMediaModel {
	backdrop_path: string | null;
	credit_id    : string;
	genre_ids    : number[];
	id           : number;
	overview     : string;
	popularity   : number;
	poster_path  : string | null;
	vote_average : number;
	vote_count   : number;
}

/**
 * Additional movie-specific attributes
 */
interface IMovieMemberDetailsBase extends IMemberDetailsBase {
	adult       : boolean;
	release_date: string;
	title       : string;
	video       : boolean
}

/**
 * Additional TV-specific attributes
 */
interface ITvMemberDetailsBase extends IMemberDetailsBase {
	episode_count    : number;
	first_air_date   : string;
	name             : string;
	origin_country   : string[];
	original_language: string;
	original_name    : string;
}

export interface IMovieCastMemberDetails extends IMovieMemberDetailsBase {
	character: string;
}

export interface IMovieCrewMemberDetails extends IMovieMemberDetailsBase {
	department       : string;
	job              : string;
	original_language: string;
	original_title   : string;
}

export interface ITvCastMemberDetails extends ITvMemberDetailsBase {
	character: string;
}

export interface ITvCrewMemberDetails extends ITvMemberDetailsBase {
	department: string;
	job       : string;
}

export interface ICombinedCredits {
	id  : number,
	cast: (IMovieCastMemberDetails | ITvCastMemberDetails)[];
	crew: (IMovieCastMemberDetails | ITvCastMemberDetails)[];
}

export interface IMovieCredits {
	id: number;
	cast: IMovieCastMemberDetails[];
	crew: IMovieCrewMemberDetails[];
}

export interface ITvCredits {
	id  : number;
	cast: ITvCastMemberDetails[];
	crew: ITvCrewMemberDetails[];
}

export interface IMember {
	id          : number;
	credit_id   : number;
	name        : string;
	gender      : number;
	profile_path: string | null;  // @WARN In general shouldn't be null, only for extending
}

export interface IGuestStar extends IMember {
	character: string;
	order    : number;
}

export interface ICastMember extends IGuestStar {
	cast_id: number;
}

export interface ICrewMember extends IMember {
	department  : string;
	job         : string;
	profile_path: string;
}

export interface ICredits {
	id  : number;
	cast: ICastMember[]
	crew: ICrewMember[]
}

export interface IEpisodeCredits extends ICredits {
	guest_stars: IGuestStar[];
}
