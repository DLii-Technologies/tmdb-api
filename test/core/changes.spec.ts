import { expect } from "chai";
import "mocha";
import { auth } from "../init";

/**
 * Modules to test
 */
import { changes } from "../../src/core";
import {
	ISeasonChanges,
	IPersonChanges,
	IChangedMovies,
	IChangedTvShows,
	IChangedPeople,
	IMovieChanges,
	IEpisodeChanges,
	ISeriesChanges
} from "../../src/core/interface/changes";

describe("Core: Changes API", () => {
	it("Get a list of recent movies that have been edited", () => {
		return changes.getChangedMovies(auth.api_key).then((result: IChangedMovies) => {
			expect(result.results).to.be.an("array");
		});
	});

	it("Get a list of recent TV shows that have been edited", () => {
		return changes.getChangedTvShows(auth.api_key).then((result: IChangedTvShows) => {
			expect(result.results).to.be.an("array");
		});
	});

	it("Get a list of recent people that have been edited", () => {
		return changes.getChangedPeople(auth.api_key).then((result: IChangedPeople) => {
			expect(result.results).to.be.an("array");
		});
	});

	it("Get a movie's recent changes", () => {
		return changes.getMovieChanges(auth.api_key, 559969).then((result: IMovieChanges) => {
			expect(result.changes).to.be.an("array");
		});
	});

	it("Get a person's recent changes", () => {
		return changes.getPersonChanges(auth.api_key, 287).then((result: IPersonChanges) => {
			expect(result.changes).to.be.an("array");
		});
	});

	it("Get recent episode changes", () => {
		return changes.getEpisodeChanges(auth.api_key, 34517).then((result: IEpisodeChanges) => {
			expect(result.changes).to.be.an("array");
		});
	});

	it("Get recent season changes", () => {
		return changes.getSeasonChanges(auth.api_key, 2190, 22).then((result: ISeasonChanges) => {
			expect(result.changes).to.be.an("array");
		});
	});

	it("Get recent series changes", () => {
		return changes.getSeriesChanges(auth.api_key, 2190).then((result: ISeriesChanges) => {
			expect(result.changes).to.be.an("array");
		});
	});
});
