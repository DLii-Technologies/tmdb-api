import { expect } from "chai";
import "mocha";
import { tmdb } from "./init";
import { ReviewDetails } from "../src/Interfaces";

describe.only("Reviews API", () => {
	it("Get the details of a review", () => {
		return tmdb.getReviewDetails("5488c29bc3a3686f4a00004a").then((result: ReviewDetails) => {
			expect(result.author).to.equal("Travis Bell");
			expect(result.media_title).to.equal("Guardians of the Galaxy");
		});
	});
});
