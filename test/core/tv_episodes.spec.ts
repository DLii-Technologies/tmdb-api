import { expect } from "chai";
import "mocha";
import { auth } from "../init";

import { tv }                      from "../../src/core";
import { StatusCode }              from "../../src/core/enums";
import { IEpisodeDetails }         from "../../src/core/interface/tv";
import { IVideos, IEpisodeImages } from "../../src/core/interface/media";
import { IResponse }               from "../../src/core/interface/response";
import { IEpisodeTranslations }    from "../../src/core/interface/language";
import { IEpisodeExternalIds }     from "../../src/core/interface/external";
import { IEpisodeCredits }         from "../../src/core/interface/credits";
import { IEpisodeAccountState }    from "../../src/core/interface/account";

describe("TV Episodes API", () => {
	it("Get episode details", () => {
		return tv.getEpisodeDetails(auth.api_key, 2190, 14, 3).then((result: IEpisodeDetails) => {
			expect(result.name).to.equal("Medicinal Fried Chicken");
		});
	});

	it("Get episode account state", () => {
		return tv.getEpisodeAccountState(auth.api_key, 2190, 14, 3, auth.session_id).then((result: IEpisodeAccountState) => {
			expect(result.rated).to.not.equal(undefined);
		});
	});

	it("Get episode credits", () => {
		return tv.getEpisodeCredits(auth.api_key, 2190, 14, 3).then((result: IEpisodeCredits) => {
			result.cast.should.include.something.with.property("name", "Trey Parker");
		});
	});

	it("Get episode external IDs", () => {
		return tv.getEpisodeExternalIds(auth.api_key, 2190, 14, 3).then((result: IEpisodeExternalIds) => {
			expect(result.imdb_id).to.equal("tt1629114");
		});
	});

	it("Get episode images", () => {
		return tv.getEpisodeImages(auth.api_key, 2190, 14, 3).then((result: IEpisodeImages) => {
			expect(result.stills.length).to.be.greaterThan(0);
		});
	});

	it("Get episode translations", () => {
		return tv.getEpisodeTranslations(auth.api_key, 2190, 14, 3).then((result: IEpisodeTranslations) => {
			result.translations.should.include.something.with.property("english_name", "Spanish");
		});
	});

	it("Rate an episode", () => {
		return tv.rateEpisode(auth.api_key, 2190, 14, 3, 10, auth.session_id).then((result: IResponse) => {
			expect(result.status_code).to.be.oneOf([StatusCode.Success, StatusCode.RecordUpdateSuccess]);
		});
	});

	it("Unrate an episode", () => {
		return tv.unrateEpisode(auth.api_key, 2190, 14, 3, auth.session_id).then((result: IResponse) => {
			expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
		});
	});

	it("Get episode videos", () => {
		return tv.getEpisodeVideos(auth.api_key, 2190, 14, 3).then((result: IVideos) => {
			expect(result.results).to.be.an("array");
		});
	});
});
