import { VideoType }      from "../enums";
import { IMovie }         from "./movie";
import { IPaginated }     from "./core";
import { IResultsWithId } from "./results";
import { ISeries }        from "./tv";

export interface IEpisodeImages {
	id    : number;
	stills: IImage[];
}

export interface IImage {
	aspect_ratio: number;
	file_path   : string;
	height      : number;
	iso_639_1   : string | null;
	vote_average: number;
	vote_count  : number;
	width       : number;
}

export interface IImages {
	id       : number;
	backdrops: IImage[];
	posters  : IImage[];
}

export interface ILogo extends IImage {
	id       : number;
	file_type: string;
}

export interface INetworkLogos {
	id   : number;
	logos: ILogo[];
}

export interface IPersonImages {
	id      : number;
	profiles: IImage[];
}

export interface ISeasonImages {
	id     : number;
	posters: IImage[];
}

export interface ITaggedImage extends IImage {
	id        : string;
	media     : IMovie[] | ISeries[];
	media_type: string;
	image_type: string;
}

export interface ITaggedImageResults extends IPaginated<ITaggedImage> {}

export interface IVideo {
	id        : string;
	iso_639_1 : string;
	iso_3166_1: string;
	key       : string;
	name      : string;
	site      : string;
	size      : number;
	type      : VideoType;
}

export interface IVideos extends IResultsWithId<IVideo> {}
