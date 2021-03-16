import { IPaginated } from "./core";
import { MediaType }  from "../enums";

export interface IReview {
	id     : string;
	author : string;
	content: string;
	url    : string;
}

export interface IReviewDetails extends IReview {
	iso_639_1  : string;
	media_id   : number;
	media_title: string;
	media_type : MediaType;
}

export interface IReviews extends IPaginated<IReview> {
	id: number;
}
