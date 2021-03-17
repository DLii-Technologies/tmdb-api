import { ICompany }                   from "./company";
import { IGenre, IProductionCountry } from "./info";
import { ILanguage }                  from "./language";
import { IResultsWithId }             from "./results";
import { Status }                     from "../enums";

/**
 * A base model for Movies
 */
interface IMovieBase {
	adult            : boolean;
	backdrop_path    : string | null;
	id               : number;
	media_type      ?: string;
	original_language: string;
	original_title   : string;
	popularity       : number;
	poster_path      : string | null;
	release_date     : string;
	runtime          : number | null;
	title            : string;
	video            : boolean;
	vote_average     : number;
	vote_count       : number;
}

/**
 * A generic movie listing
 */
export interface IMovie extends IMovieBase {
	genre_ids: number[];
}

/**
 * A movie rating that can be appended to movie listings
 */
export interface IMovieRating {
	rating: number;
}

/**
 *
 */
export interface IMovieDetails extends IMovieBase {
	belongs_to_collection: null; // Collection Object thing
	budget               : number;
	genres               : IGenre[];
	homepage             : string | null;
	id                   : number;
	imdb_id              : string | null;
	overview             : string | null;
	production_companies : ICompany[];
	production_countries : IProductionCountry[];
	revenue              : number;
	spoken_languages     : ILanguage[];
	status               : Status;
	tagline              : string | null;
}

/**
 * A movie release date
 */
export interface IReleaseDate {
	certification: string;
	iso_639_1    : string;
	note         : string;
	release_date : string;
	type         : number;
}

/**
 * A group of movie release dates
 */
export interface IReleaseDateGroup {
	iso_3166_1   : string;
	release_dates: IReleaseDate;
}

/**
 * A list of release dates for a movie
 */
export interface IReleaseDates extends IResultsWithId<IReleaseDateGroup> {}
