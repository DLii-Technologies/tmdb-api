export interface IAvatar {
	gravatar: {
		hash: string;
	};
}

export interface IAccountDetails {
	avatar       : IAvatar;
	id           : number;
	iso_639_1    : string;
	iso_3166_1   : string;
	name         : string;
	include_adult: boolean;
	username     : string;
}

interface IAccountStateBase {
	id   : number;
	rated: boolean | {
		value: number;
	};
}

/**
 * @TODO Probably needs to be moved, but we'll see.
 * Also probably needs to be an extension of episode account state
 */
export interface IAccountState extends IAccountStateBase {
	favorite : boolean;
	watchlist: boolean;
}

export interface IEpisodeAccountState extends IAccountStateBase
{}

export interface ISeasonAccountState extends IAccountStateBase {
	episode: number;
}

export interface ISeasonAccountStates {
	id     : number;
	results: ISeasonAccountState[];
}
