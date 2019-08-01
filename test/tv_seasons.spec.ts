import { expect } from "chai";
import "mocha";
import { tmdb, auth } from "./init";
import {
	SeasonDetails,
	SeasonChanges,
	SeasonAccountStates,
	Credits,
	VideoList,
	SeasonExternalIdList,
	SeasonImages
} from "../src/Interfaces";

describe("TV Seasons API", () => {
	it("Get season details", () => {
		return tmdb.getSeasonDetails(2190, 22).then((result: SeasonDetails) => {
			expect(result.id).to.equal(109933);
		});
	});

	it("Get recent season changes", () => {
		return tmdb.getSeasonChanges(2190, 22).then((result: SeasonChanges) => {
			expect(result.changes).to.be.an("array");
		});
	});

	it("Get season account states", () => {
		return tmdb.getSeasonAccountStates(2190, 22, auth.session_id).then((result: SeasonAccountStates) => {
			expect(result.results).to.be.an("array");
		});
	});

	it("Get season credits", () => {
		return tmdb.getSeasonCredits(2190, 22).then((result: Credits) => {
			result.crew.should.include.something.with.property("name", "Matt Stone");
		});
	});

	it("Get season external IDs", () => {
		return tmdb.getSeasonExternalIds(1396, 5).then((result: SeasonExternalIdList) => {
			expect(result.tvdb_id).to.equal(490110);
		});
	});

	it("Get season images", () => {
		return tmdb.getSeasonImages(2190, 5).then((result: SeasonImages) => {
			expect(result.posters.length).to.be.greaterThan(0);
		});
	});

	it("Get season videos", () => {
		return tmdb.getSeasonVideos(2190, 22).then((result: VideoList) => {
			result.results.should.include.something.with.property("site", "YouTube");
		});
	});
});
