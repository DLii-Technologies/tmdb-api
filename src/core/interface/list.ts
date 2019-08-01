import { IMovie }     from "./movie";
import { IPaginated } from "./core";

interface IListBase {
	description   : string;
	favorite_count: number;
	id            : number;
	item_count    : number;
	iso_639_1     : string;
	name          : string;
	poster_path   : string | null;
}

export interface IList extends IListBase {
	list_type: string;
}

export interface IListDetails extends IListBase {
	created_by: string;
	items     : IMovie[];
}

export interface IListResults extends IPaginated {
	results: IList[];
}

export interface ILists extends IPaginated {
	id     : number;
	results: IList[];
}

export interface IListItemStatus {
	id          : string;
	item_present: boolean;
}
