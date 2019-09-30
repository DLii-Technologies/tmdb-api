import { IGenre }                from "../core/interface/info";
import { IMovie, IMovieDetails } from "../core/interface/movie";
import { Component }             from "./Component";
import { TMDb }                  from "../TMDb";
import { IChangesOptions }       from "core/interface/options";

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
		super(tmdb);
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
	getAlternativeTitles(country?: string) {
		return this.tmdb.movie.getAlternativeTitles(this.id, country);
	}

	/**
	 * Get the recent changes for this movie
	 */
	getChanges(page: number = 1, options: IChangesOptions) {
		return this.tmdb.movie.getChanges(this.id, page, options);
	}

	/**
	 * Get the credits for this movie
	 *
	 * @TODO May make individual credit items a class
	 */
	getCredits() {
		return this.tmdb.movie.getCredits(this.id);
	}

	/**
	 * Get the external ID list for this movie
	 */
	getExternalIds() {
		return this.tmdb.movie.getExternalIds(this.id);
	}

	/**
	 * Get a list of images for this movie
	 */
	getImages(lang?: string) {
		return this.tmdb.movie.getImages(this.id, lang);
	}

	/**
	 * Get the keywords for this movie
	 */
	getKeywords() {
		return this.tmdb.movie.getKeywords(this.id);
	}

	/**
	 * Get the release dates for this movie
	 */
	getReleaseDates() {
		return this.tmdb.movie.getReleaseDates(this.id);
	}

	/**
	 * Get a list of videos for this movie
	 */
	getVideos() {
		return this.tmdb.movie.getVideos(this.id);
	}

	/**
	 * Get a list of translations for this movie
	 */
	getTranslations() {
		return this.tmdb.movie.getTranslations(this.id);
	}

	/**
	 * Get a list of recommended movies from this movie
	 */
	getRecommendations(page: number = 1, lang?: string) {
		return this.tmdb.movie.getRecommendations(this.id, page, lang);
	}

	/**
	 * Get a list of similar movies to this movie
	 */
	getSimilarMovies(page: number = 1, lang?: string) {
		return this.tmdb.movie.getSimilarMovies(this.id, page, lang);
	}

	/**
	 * Get the reviews for this movie
	 */
	getReviews(page: number = 1, lang?: string) {
		return this.tmdb.movie.getReviews(this.id, page, lang);
	}

	/**
	 * Get lists that contain this movie
	 */
	getLists() {
		return this.tmdb.movie.getLists(this.id);
	}

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
	 * Create an array of movies from JSON
	 */
	public static fromJson(movies: IMovie[], tmdb?: TMDb) {
		let result: MovieListing[] = [];
		for (let movie of movies) {
			result.push(new MovieListing(movie, tmdb));
		}
		return result;
	}

	/**
	 * Unserialize the object
	 */
	static unserialize(serialized: ISerializedMovieListing, tmdb?: TMDb) {
		return new MovieListing(serialized, tmdb);
	}

	constructor(movie: IMovie, tmdb?: TMDb) {
		super(movie, tmdb);
		this.genres = movie.genre_ids;
	}

	/**
	 * Get the details of the movie listing
	 */
	getDetails() {
		return this.tmdb.movie.getDetails(this.id);
	}
}

export class MovieDetails extends Movie
{
	/**
	 * The list of genres
	 */
	public readonly genres: IGenre[];

	constructor(movie: IMovieDetails, tmdb?: TMDb) {
		super(movie, tmdb);
		this.genres = movie.genres;
	}
}
