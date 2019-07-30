import { expect } from "chai";
import "mocha";
import { tmdb, auth } from "./init";
import { EpisodeDetails, EpisodeChanges, EpisodeAccountState, EpisodeCredits, EpisodeExternalIdList, EpisodeImages, EpisodeTranslationList, Response, VideoList } from "../src/Interfaces";
import { StatusCode } from "../src/Enums";

describe("TV Episodes API", () => {
	it("Get episode details", () => {
		return tmdb.getEpisodeDetails(2190, 14, 3).then((result: EpisodeDetails) => {
			expect(result.name).to.equal("Medicinal Fried Chicken");
		});
	});

	it("Get recent episode changes", () => {
		return tmdb.getEpisodeChanges(34517).then((result: EpisodeChanges) => {
			expect(result.changes).to.be.an("array");
		});
	});

	it("Get episode account state", () => {
		return tmdb.getEpisodeAccountState(2190, 14, 3, auth.session_id).then((result: EpisodeAccountState) => {
			expect(result.rated).to.not.equal(undefined);
		});
	});

	it("Get episode credits", () => {
		return tmdb.getEpisodeCredits(2190, 14, 3).then((result: EpisodeCredits) => {
			result.cast.should.include.something.with.property("name", "Trey Parker");
		});
	});

	it("Get episode external IDs", () => {
		return tmdb.getEpisodeExternalIds(2190, 14, 3).then((result: EpisodeExternalIdList) => {
			expect(result.imdb_id).to.equal("tt1629114");
		});
	});

	it("Get episode images", () => {
		return tmdb.getEpisodeImages(2190, 14, 3).then((result: EpisodeImages) => {
			expect(result.stills.length).to.be.greaterThan(0);
		});
	});

	it("Get episode translations", () => {
		return tmdb.getEpisodeTranslations(2190, 14, 3).then((result: EpisodeTranslationList) => {
			result.translations.should.include.something.with.property("english_name", "Spanish");
		});
	});

	it("Rate an episode", () => {
		return tmdb.rateEpisode(2190, 14, 3, 10, auth.session_id).then((result: Response) => {
			expect(result.status_code).to.be.oneOf([StatusCode.Success, StatusCode.RecordUpdateSuccess]);
		});
	});

	it("Unrate an episode", () => {
		return tmdb.unrateEpisode(2190, 14, 3, auth.session_id).then((result: Response) => {
			expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
		});
	});

	it("Get episode videos", () => {
		return tmdb.getEpisodeVideos(2190, 14, 3).then((result: VideoList) => {
			expect(result.results).to.be.an("array");
		});
	});
});
