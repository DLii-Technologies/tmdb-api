/**
 * The details of the authenticated account
 */
export interface IAccountDetails {
	avatar       : IAvatar;
	id           : number;
	iso_639_1    : string;
	iso_3166_1   : string;
	name         : string;
	include_adult: boolean;
	username     : string;
}

/**
 * The avatar of the account
 */
export interface IAvatar {
	gravatar: {
		hash: string;
	};
}

// Account State Groupings -------------------------------------------------------------------------

/**
 * A generalizable grouping of account states
 */
interface IAccountStates<T> {
	id     : number;
	results: T[];
}

/**
 * A grouping of account states for a TV show's season
 */
export interface ISeasonAccountStates extends IAccountStates<ISeasonAccountState> {};

// Account State Types -----------------------------------------------------------------------------

/**
 * The common attributes among all account states
 */
interface IAccountStateBase {
	id   : number;
	rated: false | {
		value: number;
	};
}

/**
 * Common attributes among movie and TV show account states
 */
interface IAccountState extends IAccountStateBase {
	favorite : boolean;
	watchlist: boolean;
}

/**
 * Account state information for a particular movie
 */
export interface IMovieAccountState extends IAccountState {}

/**
 * Account state information for a particular TV show
 */
export interface ISeriesAccountState extends IAccountState {}

/**
 * Account state information for a particular TV show's season
 */
export interface ISeasonAccountState extends IAccountStateBase {
	episode: number;
}

/**
 * Account state information for a particular TV show's episode
 */
export interface IEpisodeAccountState extends IAccountStateBase {}
