import { IReviewDetails, IReviews } from "./interface/reviews";
import { get } from "./util/network";
import { MediaType } from "./enums";

export let review = {
	/**
	 * Get the details of a review
	 */
	getDetails(apiKey: string, reviewId: string) {
		return get<IReviewDetails>(apiKey, `/review/${reviewId}`);
	},

	/**
	 * Get the user reviews for a movie
	 */
	getReviews(apiKey: string, mediaType: MediaType, movieId: number, page?: number,
		language?: string) {
		return get<IReviews>(apiKey, `/${mediaType}/${movieId}/reviews`, { language, page });
	},
};
