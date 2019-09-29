import TMDbMixin                                 from "./TMDbMixin";
import { IAlternativeTitle }                     from "../core/interface/info";
import { movie, changes, review }                from "../core";
import { PaginatedResponse, IPaginatedResponse } from "../util/PaginatedResponse";
import { IChange }                               from "core/interface/changes";
import { IChangesOptions }                       from "core/interface/options";
import { IReleaseDateGroup }                     from "core/interface/movie";
import { IMovieTranslation }                     from "core/interface/language";
import { IVideo }                                from "core/interface/media";
import { MovieListing, ReviewListing }           from "components";
import { MediaType }                             from "core/enums";

export class MixinMovie extends TMDbMixin
{
	/**
	 * Get the alternative titles for this movie
	 */
	getAlternativeTitles(id: number, country?: string) {
		return new Promise<IAlternativeTitle[]>((resolve, reject) => {
			movie.getAltTitles(this.apiKey, id, country).then((titles) => {
				resolve(titles.titles);
			}).catch(reject);
		});
	},

	/**
	 * Get the recent changes for this movie
	 */
	getChanges(id: number, page: number = 1, options: IChangesOptions) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<IChange[]>>((resolve, reject) => {
				changes.getMovieChanges(this.apiKey, id, p, options)
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
	getCredits() {}

	/**
	 * Get the external ID list for a movie
	 */
	getExternalIDs(id: number) {
		return movie.getExternalIds(this.apiKey, id);
	}

	/**
	 * Get a list of images for a movie
	 */
	getImages(id: number, lang: string) {
		return movie.getImages(this.apiKey, id, lang);
	}

	/**
	 * Get the keywords for a movie
	 */
	getKeywords(id: number) {
		return movie.getKeywords(this.apiKey, id);
	}

	/**
	 * Get the release dates for this movie
	 */
	getReleaseDates(id: number) {
		return new Promise<IReleaseDateGroup[]>((resolve, reject) => {
			movie.getReleaseDates(this.apiKey, id).then((releaseDates) => {
				resolve(releaseDates.results);
			}).catch(reject);
		});
	}

	/**
	 * Get a list of videos for this movie
	 */
	getVideos(id: number) {
		return new Promise<IVideo[]>((resolve, reject) => {
			movie.getVideos(this.apiKey, id).then((videos) => {
				resolve(videos.results);
			}).catch(reject);
		});
	}

	/**
	 * Get a list of translations for this movie
	 */
	getTranslations(id: number) {
		return new Promise<IMovieTranslation[]>((resolve, reject) => {
			movie.getTranslations(this.apiKey, id).then((translations) => {
				resolve(translations.translations);
			}).catch(reject);
		});
	}

	/**
	 * Get a list of recommended movies from this movie
	 */
	getRecommendations(id: number, page: number, lang: string) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<MovieListing[]>>((resolve, reject) => {
				movie.getRecommendations(this.apiKey, id, p, lang)
					.then(movies => resolve({
						body        : MovieListing.fromJson(movies.results, this),
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
	getSimilarMovies(id: number, page: number, lang: string) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<MovieListing[]>>((resolve, reject) => {
				movie.getSimilar(this.apiKey, id, p, lang)
					.then(movies => resolve({
						body        : MovieListing.fromJson(movies.results, this),
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
	getReviews(id: number, page: number, lang: string) {
		return PaginatedResponse.create(page, (p: number) => {
			return new Promise<IPaginatedResponse<ReviewListing[]>>((resolve, reject) => {
				review.getReviews(this.apiKey, MediaType.Movie, id, p, lang)
					.then(reviews => resolve({
						body        : ReviewListing.fromJson(reviews.results, this),
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
