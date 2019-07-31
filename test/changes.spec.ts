import { expect } from "chai";
import "mocha";
import { tmdb } from "./init";
import { MediaChanges } from "../src/Interfaces";

describe("Changes API", () => {
	it("Get a list of recent movies that have been edited", () => {
		return tmdb.getChangedMovies().then((result: MediaChanges) => {
			expect(result.results).to.be.an("array");
		});
	});

	it("Get a list of recent TV shows that have been edited", () => {
		return tmdb.getChangedTvShows().then((result: MediaChanges) => {
			expect(result.results).to.be.an("array");
		});
	});

	it("Get a list of recent people that have been edited", () => {
		return tmdb.getChangedPeople().then((result: MediaChanges) => {
			expect(result.results).to.be.an("array");
		});
	});
});
