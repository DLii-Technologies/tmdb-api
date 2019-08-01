import { IPaginated } from "./core";

export interface IMediaChange {
	id   : number;
	adult: boolean | null;
}

export interface MediaChanges extends IPaginated {
	results: IMediaChange[];
}

interface IChangeItemBase {
	id            : string;
	action        : string;
	time          : string;
	original_value: string | null;  // @WARN ?: is because of Episode Changes
}

interface IChangeBase {
	key: string;
}

export interface IChangeItem extends IChangeItemBase {
	iso_639_1: string;
	value    : string;
}

export interface IChange extends IChangeBase {
	items: IChangeItem[];
}

export interface IChanges {
	changes: IChange[];
}

export interface ISeasonChangeItem extends IChangeItemBase {
	iso_639_1: string;
	value    : string | {
		episode_id    : number;
		episode_number: number;
	};
}

export interface ISeasonChange extends IChangeBase {
	items: ISeasonChangeItem[];
}

export interface ISeasonChanges {
	changes: ISeasonChanges[];
}

export interface IPersonChangeItem extends IChangeItemBase
{}

export interface IPersonChange extends IChangeBase {
	items: IPersonChangeItem[];
}

export interface IPersonChanges {
	changes: IPersonChange[];
}
