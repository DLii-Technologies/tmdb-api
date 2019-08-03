import { expect } from "chai";
import "mocha";
import { auth } from "../init";

/**
 * Modules to test
 */
import { review } from "../../src/core";
import { MediaType } from "../../src/core/enums";
import { IReviews, IReviewDetails } from "../../src/core/interface/reviews";

describe("Core: Reviews API", () => {
	it("Get the details of a review", () => {
		return review.getDetails(auth.api_key, "5488c29bc3a3686f4a00004a").then((result: IReviewDetails) => {
			expect(result.author).to.equal("Travis Bell");
			expect(result.media_title).to.equal("Guardians of the Galaxy");
		});
	});

	it("Get a movie's reviews", () => {
		return review.getReviews(auth.api_key, MediaType.Movie, 260346);
	});

	it("Get TV series reviews", () => {
		return review.getReviews(auth.api_key, MediaType.Tv, 1396).then((result: IReviews) => {
			result.results.should.include.something.with.property("id", "5accdbe6c3a3687e2702d058");
		});
	});
});
