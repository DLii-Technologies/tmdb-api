import { IPaginated } from "./core";

// Changed Entities --------------------------------------------------------------------------------

interface IChangedEntities extends IPaginated {
	results: IChangedEntity[];
}

/**
 * A movie/tv/person entity that has been changed
 */
export interface IChangedEntity {
	id   : number;
	adult: boolean | null;
}

/**
 * Recently changed movies
 */
export interface IChangedMovies extends IChangedEntities {}

/**
 * Recently changed people profiles
 */
export interface IChangedPeople extends IChangedEntities {}

/**
 * Recently changed TV shows
 */
export interface IChangedTvShows extends IChangedEntities {}

// Change Groups -----------------------------------------------------------------------------------

interface IChanges<T extends IChangeBase = IChange> {
	changes: IChangeGroup<T>[];
}

export interface IChangeGroup<T extends IChangeBase = IChange> {
	key  : string;
	items: T[];
}

/**
 * A group of changes made to a movie
 */
export interface IMovieChanges extends IChanges<IMovieChange> {}

/**
 * A group of changes made to a TV show
 */
export interface ISeriesChanges extends IChanges<ISeriesChange> {}

/**
 * A group of changes made to a TV show's season
 */
export interface ISeasonChanges extends IChanges<ISeasonChange> {}

/**
 * A group of changes made to a TV show's episode
 */
export interface IEpisodeChanges extends IChanges<IEpisodeChange> {}

/**
 * A group of changes made to a person's profile
 */
export interface IPersonChanges extends IChanges<IPersonChange> {}

// Change Types ------------------------------------------------------------------------------------

/**
 * An abstract change
 */
interface IChangeBase {
	id            : string;
	action        : string;
	time          : string;
	original_value: any;  // @WARN ?: is because of Episode Changes
}

/**
 * A common change structure that generalizes fairly well
 */
interface IChange extends IChangeBase {
	iso_639_1: string;
	value    : string;
}

/**
 * A single change made to a movie
 */
 export interface IMovieChange extends IChange {}


/**
 * A single change made to a TV show
 */
 export interface ISeriesChange extends IChange {}

/**
 * A single change made to a TV show's season
 */
export interface ISeasonChange extends IChangeBase {
	iso_639_1: string;
	value    : string | {
		episode_id    : number;
		episode_number: number;
	};
}

/**
 * A single change made to a TV show's episode
 */
 export interface IEpisodeChange extends IChange {}

/**
 * A single change made to a person's profile
 */
export interface IPersonChange extends IChangeBase {
	original_value: {
		profile: {
			file_path: string
		}
	}
}
