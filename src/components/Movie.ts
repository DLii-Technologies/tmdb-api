import { IGenre }                from "../core/interface/info";
import { IMovie, IMovieDetails } from "../core/interface/movie";
import { ISerializable }         from "../interfaces";
import { Component }             from "./Component";
import { TMDb }                  from "../TMDb";
import { movie }                 from "../core";

export interface ISerializedMovieListing extends IMovie
{}

export interface ISerializedMovie extends IMovieDetails
{}

class Movie extends Component
{
	public readonly backdropPath    : string | null;
	public readonly hasVideo        : boolean;
	public readonly id              : number;
	public readonly isAdult         : boolean;
	public readonly originalLanguage: string;
	public readonly originalTitle   : string;
	public readonly popularity      : number;
	public readonly posterPath      : string | null;
	public readonly releaseDate     : Date;
	public readonly runtime         : number | null;
	public readonly title           : string;
	public readonly voteAverage     : number;
	public readonly voteCount       : number;

	constructor(movie: IMovie|IMovieDetails, tmdb?: TMDb) {
		super(tmdb || TMDb.instance(true));
		this.backdropPath     = movie.backdrop_path;
		this.hasVideo         = movie.video;
		this.id               = movie.id;
		this.isAdult          = movie.adult;
		this.originalLanguage = movie.original_language;
		this.originalTitle    = movie.original_title;
		this.popularity       = movie.popularity;
		this.posterPath       = movie.poster_path;
		this.releaseDate      = new Date(movie.release_date);
		this.runtime          = movie.runtime;
		this.title            = movie.title;
		this.voteAverage      = movie.vote_average;
		this.voteCount        = movie.vote_count;
	}

	/**
	 * Get the alternative titles for this movie
	 */
	getAlternativeTitles() {}

	/**
	 * Get the recent changes for this movie
	 */
	getChanges() {}

	/**
	 * Get the credits for this movie
	 */
	getCredits() {}

	/**
	 * Get the external ID list for this movie
	 */
	getExternalIDs() {}

	/**
	 * Get a list of images for this movie
	 */
	getImages() {}

	/**
	 * Get the keywords for this movie
	 */
	getKeywords() {}

	/**
	 * Get the release dates for this movie
	 */
	getReleaseDates() {}

	/**
	 * Get a list of videos for this movie
	 */
	getVideos() {}

	/**
	 * Get a list of translations for this movie
	 */
	getTranslations() {}

	/**
	 * Get a list of recommended movies from this movie
	 */
	getRecommendations() {}

	/**
	 * Get a list of similar movies to this movie
	 */
	getSimilarMovies() {}

	/**
	 * Get the reviews for this movie
	 */
	getReviews() {}

	/**
	 * Get lists that contain this movie
	 */
	getLists() {}

	/**
	 * Rate this movie
	 */
	rate() {}

	/**
	 * Unrate this movie
	 */
	unrate() {}
}

export class MovieListing extends Movie
{
	/**
	 * The list of genre IDs
	 */
	public readonly genres: number[];

	/**
	 * Unserialize the object
	 */
	static unserialize(serialized: ISerializedMovieListing, tmdb?: TMDb) {
		return new MovieListing(serialized, tmdb);
	}

	constructor(movie: IMovie, tmdb?: TMDb) {
		super(movie, tmdb || TMDb.instance(true));
		this.genres = movie.genre_ids;
	}

	/**
	 * Get the details of the movie listing
	 */
	getDetails() {
		movie.getDetails(this.tmdb.apiKey, this.id);
	}
}

export class MovieDetails extends Movie
{
	/**
	 * The list of genres
	 */
	public readonly genres: IGenre[];

	constructor(movie: IMovieDetails, tmdb?: TMDb) {
		super(movie, tmdb || TMDb.instance(true));
		this.genres = movie.genres;
	}
}
