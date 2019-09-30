import { IAlternativeTitle }                         from "../core/interface/info";
import { movie, changes, review, search }            from "../core";
import { PaginatedResponse, IPaginatedResponse }     from "../util/PaginatedResponse";
import { IChange }                                   from "../core/interface/changes";
import { IChangesOptions, IMovieSearchOptions }      from "../core/interface/options";
import { IReleaseDateGroup }                         from "../core/interface/movie";
import { IMovieTranslation }                         from "../core/interface/language";
import { IVideo }                                    from "../core/interface/media";
import { MovieListing, ReviewListing, MovieDetails } from "../components";
import { MediaType }                                 from "../core/enums";
import TMDbModule                                    from "./TMDbModule";

export class MovieModule extends TMDbModule
{
	/**
	 * Get the alternative titles for this movie
	 */
	public getAlternativeTitles(id: number, country?: string) {
		return new Promise<IAlternativeTitle[]>((resolve, reject) => {
			movie.getAltTitles(this.tmdb.apiKey, id, country).then((titles) => {
				resolve(titles.titles);
			}).catch(reject);
		});
	}

	/**
	 * Get the recent changes for this movie
	 */
	public getChanges(id: number, page: number = 1, options: IChangesOptions) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<IChange[]>>((resolve, reject) => {
				changes.getMovieChanges(this.tmdb.apiKey, id, p, options)
					.then(changes => resolve({
						body: changes.changes,
						page: p
					})).catch(reject);
			});
		});
	}

	/**
	 * Get the credits for a movie
	 *
	 * @TODO May make individual credit items a class
	 */
	public getCredits(id: number) {}

	/**
	 * Get the details of the movie listing
	 */
	getDetails(id: number) {
		return new Promise<MovieDetails>((resolve, reject) => {
			movie.getDetails(this.tmdb.apiKey, id).then((details) => {
				resolve(new MovieDetails(details, this.tmdb));
			}).catch(reject);
		});
	}

	/**
	 * Get the external ID list for a movie
	 */
	public getExternalIds(id: number) {
		return movie.getExternalIds(this.tmdb.apiKey, id);
	}

	/**
	 * Get a list of images for a movie
	 */
	public getImages(id: number, lang: string) {
		return movie.getImages(this.tmdb.apiKey, id, lang);
	}

	/**
	 * Get the keywords for a movie
	 */
	public getKeywords(id: number) {
		return movie.getKeywords(this.tmdb.apiKey, id);
	}

	/**
	 * Get the release dates for this movie
	 */
	public getReleaseDates(id: number) {
		return new Promise<IReleaseDateGroup[]>((resolve, reject) => {
			movie.getReleaseDates(this.tmdb.apiKey, id).then((releaseDates) => {
				resolve(releaseDates.results);
			}).catch(reject);
		});
	}

	/**
	 * Get a list of videos for this movie
	 */
	public getVideos(id: number) {
		return new Promise<IVideo[]>((resolve, reject) => {
			movie.getVideos(this.tmdb.apiKey, id).then((videos) => {
				resolve(videos.results);
			}).catch(reject);
		});
	}

	/**
	 * Get a list of translations for this movie
	 */
	public getTranslations(id: number) {
		return new Promise<IMovieTranslation[]>((resolve, reject) => {
			movie.getTranslations(this.tmdb.apiKey, id).then((translations) => {
				resolve(translations.translations);
			}).catch(reject);
		});
	}

	/**
	 * Get a list of recommended movies from this movie
	 */
	public getRecommendations(id: number, page: number, lang: string) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<MovieListing[]>>((resolve, reject) => {
				movie.getRecommendations(this.tmdb.apiKey, id, p, lang)
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
	public getSimilarMovies(id: number, page: number, lang: string) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<MovieListing[]>>((resolve, reject) => {
				movie.getSimilar(this.tmdb.apiKey, id, p, lang)
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
	 * Get the reviews for this movie
	 */
	public getReviews(id: number, page: number, lang: string) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<ReviewListing[]>>((resolve, reject) => {
				review.getReviews(this.tmdb.apiKey, MediaType.Movie, id, p, lang)
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
	public getLists(id: number) {}

	/**
	 * Rate this movie
	 */
	public rate(id: number) {}

	/**
	 * Unrate this movie
	 */
	public unrate(id: number) {}

	/**
	 * Search for a movie
	 */
	public search(query: string, page: number = 1, options: IMovieSearchOptions = {}) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<MovieListing[]>>((resolve, reject) => {
				search.movies(this.tmdb.apiKey, query, p, options).then(result => resolve({
					body        : MovieListing.fromJson(result.results, this.tmdb),
					page        : result.page,
					totalPages  : result.total_pages,
					totalResults: result.total_results
				})).catch(reject);
			});
		});
	}
}
