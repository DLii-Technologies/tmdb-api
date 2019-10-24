import { expect } from "chai";
import "mocha";
import { auth } from "../init";

import { tv }                     from "../../src/core";
import { ISeasonDetails }         from "../../src/core/interface/tv";
import { ISeasonAccountStates }   from "../../src/core/interface/account";
import { ICredits }               from "../../src/core/interface/credits";
import { ISeasonExternalIds }     from "../../src/core/interface/external";
import { ISeasonImages, IVideos } from "../../src/core/interface/media";

describe("Core: TV Seasons API", () => {
	it("Get season details", () => {
		return tv.getSeasonDetails(auth.api_key, 2190, 22).then((result: ISeasonDetails) => {
			expect(result.id).to.equal(109933);
		});
	});

	it("Get season account states", () => {
		return tv.getSeasonAccountStates(auth.api_key, 2190, 22, auth.session_id).then((result: ISeasonAccountStates) => {
			expect(result.results).to.be.an("array");
		});
	});

	it("Get season credits", () => {
		return tv.getSeasonCredits(auth.api_key, 2190, 22).then((result: ICredits) => {
			result.crew.should.include.something.with.property("name", "Matt Stone");
		});
	});

	it("Get season external IDs", () => {
		return tv.getSeasonExternalIds(auth.api_key, 1396, 5).then((result: ISeasonExternalIds) => {
			expect(result.tvdb_id).to.equal(490110);
		});
	});

	it("Get season images", () => {
		return tv.getSeasonImages(auth.api_key, 2190, 5).then((result: ISeasonImages) => {
			expect(result.posters.length).to.be.greaterThan(0);
		});
	});

	it("Get season videos", () => {
		return tv.getSeasonVideos(auth.api_key, 2190, 22).then((result: IVideos) => {
			result.results.should.include.something.with.property("site", "YouTube");
		});
	});
});
