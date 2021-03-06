import { MediaType } from "../enums";

export interface IPaginated<T> {
	results      : T[];
	page         : number;
	total_pages  : number;
	total_results: number;
}

export interface IMediaModel {
	media_type?: MediaType
}
