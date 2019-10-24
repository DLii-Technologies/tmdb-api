import { Component }               from "./Component";
import { TMDb }                    from "TMDb";
import { IReview, IReviewDetails } from "core/interface/reviews";
import { MediaType }               from "core/enums";

class Review extends Component
{
	public readonly author: string;
	public readonly content: string;
	public readonly id: string;
	public readonly url: string;

	constructor(review: IReview, tmdb?: TMDb) {
		super(tmdb);
		this.author  = review.author;
		this.content = review.content;
		this.id      = review.id;
		this.url     = review.url;
	}
}

export class ReviewListing extends Review
{
	/**
	 * Get the details of the review
	 */
	getDetails() {}
}

export class ReviewDetails extends Review
{
	public readonly iso_639_1  : string;
	public readonly mediaId   : number;
	public readonly mediaTitle: string;
	public readonly mediaType : MediaType;

	constructor(review: IReviewDetails, tmdb?: TMDb) {
		super(review, tmdb);
		this.iso_639_1  = review.iso_639_1;
		this.mediaId    = review.media_id;
		this.mediaTitle = review.media_title;
		this.mediaType  = review.media_type;
	}
}
