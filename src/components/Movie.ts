import { IGenre, IAlternativeTitle }                from "../core/interface/info";
import { IMovie, IMovieDetails, IReleaseDateGroup } from "../core/interface/movie";
import { Component }                                from "./Component";
import { TMDb }                                     from "../TMDb";
import { changes, movie, review }                   from "../core";
import { IMovieTranslation }                        from "../core/interface/language";
import { PaginatedResponse, IPaginatedResponse }    from "../util/PaginatedResponse";
import { IChange }                                  from "../core/interface/changes";
import { IChangesOptions }                          from "../core/interface/options";
import { IVideo }                                   from "../core/interface/media";
import { MediaType }                                from "../core/enums";
import { ReviewListing }                            from "./Review";

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
		return new Promise<IAlternativeTitle[]>((resolve, reject) => {
			movie.getAltTitles(this.tmdb.apiKey, this.id, country).then((titles) => {
				resolve(titles.titles);
			}).catch(reject);
		});
	}

	/**
	 * Get the recent changes for this movie
	 */
	getChanges(page: number = 1, options: IChangesOptions) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<IChange[]>>((resolve, reject) => {
				changes.getMovieChanges(this.tmdb.apiKey, this.id, p, options)
					.then(changes => resolve({
						body: changes.changes,
						page: p
					})).catch(reject);
			});
		});
	}

	/**
	 * Get the credits for this movie
	 *
	 * @TODO May make individual credit items a class
	 */
	getCredits() {}

	/**
	 * Get the external ID list for this movie
	 */
	getExternalIDs() {
		return movie.getExternalIds(this.tmdb.apiKey, this.id);
	}

	/**
	 * Get a list of images for this movie
	 */
	getImages(lang: string) {
		return movie.getImages(this.tmdb.apiKey, this.id, lang);
	}

	/**
	 * Get the keywords for this movie
	 */
	getKeywords() {
		return movie.getKeywords(this.tmdb.apiKey, this.id);
	}

	/**
	 * Get the release dates for this movie
	 */
	getReleaseDates() {
		return new Promise<IReleaseDateGroup[]>((resolve, reject) => {
			movie.getReleaseDates(this.tmdb.apiKey, this.id).then((releaseDates) => {
				resolve(releaseDates.results);
			}).catch(reject);
		});
	}

	/**
	 * Get a list of videos for this movie
	 */
	getVideos() {
		return new Promise<IVideo[]>((resolve, reject) => {
			movie.getVideos(this.tmdb.apiKey, this.id).then((videos) => {
				resolve(videos.results);
			}).catch(reject);
		});
	}

	/**
	 * Get a list of translations for this movie
	 */
	getTranslations() {
		return new Promise<IMovieTranslation[]>((resolve, reject) => {
			movie.getTranslations(this.tmdb.apiKey, this.id).then((translations) => {
				resolve(translations.translations);
			}).catch(reject);
		});
	}

	/**
	 * Get a list of recommended movies from this movie
	 */
	getRecommendations(page: number, lang: string) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<MovieListing[]>>((resolve, reject) => {
				movie.getRecommendations(this.tmdb.apiKey, this.id, p, lang)
					.then(movies => resolve({
						body        : MovieListing.fromJson(movies.results, this.tmdb),
						page        : movies.page,
						totalPages  : movies.total_pages,
						totalResults: movies.total_results
					})).catch(reject);
			});
		});
	}

	/**
	 * Get a list of similar movies to this movie
	 */
	getSimilarMovies(page: number, lang: string) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<MovieListing[]>>((resolve, reject) => {
				movie.getSimilar(this.tmdb.apiKey, this.id, p, lang)
					.then(movies => resolve({
						body        : MovieListing.fromJson(movies.results),
						page        : movies.page,
						totalPages  : movies.total_pages,
						totalResults: movies.total_results
					})).catch(reject);
			});
		});
	}

	/**
	 * Get the reviews for this movie
	 *
	 * @TODO Store total results into response
	 */
	getReviews(page: number, lang: string) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<ReviewListing[]>>((resolve, reject) => {
				review.getReviews(this.tmdb.apiKey, MediaType.Movie, this.id, p, lang)
					.then(reviews => resolve({
						body        : ReviewListing.fromJson(reviews.results, this.tmdb),
						page        : reviews.page,
						totalPages  : reviews.total_pages,
						totalResults: reviews.total_results
					})).catch(reject);
			});
		});
	}

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
		return new Promise<MovieDetails>((resolve, reject) => {
			movie.getDetails(this.tmdb.apiKey, this.id).then((details) => {
				resolve(new MovieDetails(details, this.tmdb));
			}).catch(reject);
		});
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
