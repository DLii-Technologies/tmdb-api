import { expect } from "chai";
import "mocha";
import { tmdb, auth } from "./init";
import { SeriesDetails, AccountStates, AlternativeNames, SeriesChanges, SeriesContentRatings, Credits, EpisodeGroupResults, ImageList, SeriesExternalIdList, KeywordList, SeriesResults, KeywordResults, ReviewList, SeriesTheatricalScreenings, SeriesTranslationList, VideoList, Response } from "../src/Interfaces";
import { StatusCode } from "../src/Enums";

describe("TV", () => {
	it("Get TV series details", () => {
		return tmdb.getTvShowDetails(1396).then((result: SeriesDetails) => {
			expect(result.name).to.equal("Breaking Bad");
		});
	});

	it("Get TV series account states", () => {
		return tmdb.getTvShowAccountStates(1396, auth.session_id).then((result: AccountStates) => {
			expect(result.id).to.equal(1396);
		});
	});

	it("Get TV series alternative titles", () => {
		return tmdb.getTvShowAltTitles(246).then((result: AlternativeNames) => {
			result.results.should.include.something.that.has.property("title", "Avatar: The Legend of Aang");
		});
	});

	it("Get TV series changes", () => {
		return tmdb.getTvShowChanges(1396).then((result: SeriesChanges) => {
			expect(result.changes).to.be.an("array");
		});
	});

	it("Get TV series content ratings", () => {
		return tmdb.getTvShowContentRatings(1396).then((result: SeriesContentRatings) => {
			result.results.should.include.something.that.has.property("rating", "TV-MA");
		});
	});

	it("Get TV series credits", () => {
		return tmdb.getTvShowCredits(1396).then((result: Credits) => {
			result.cast.should.include.something.that.has.property("character", "Walter White");
		});
	});

	it("Get TV series episode groups", () => {
		return tmdb.getTvShowEpisodeGroups(1434).then((result: EpisodeGroupResults) => {
			result.results.should.include.something.that.has.property("name", "DVD Order");
		});
	});

	it("Get TV series external IDs", () => {
		return tmdb.getTvShowExternalIds(1396).then((result: SeriesExternalIdList) => {
			expect(result.imdb_id).to.equal("tt0903747");
		});
	});

	it("Get TV series images", () => {
		return tmdb.getTvShowImages(2190).then((result: ImageList) => {
			expect(result.backdrops.length).to.be.greaterThan(0);
		});
	});

	it("Get TV series keywords", () => {
		return tmdb.getTvShowKeywords(2190).then((result: KeywordResults) => {
			result.results.should.include.something.that.has.property("name", "colorado");
		});
	});

	it("Get TV series recommendations", () => {
		return tmdb.getTvShowRecommendations(2190).then((result: SeriesResults) => {
			result.results.should.include.something.with.property("name", "Futurama");
		});
	});

	it("Get TV series reviews", () => {
		return tmdb.getTvShowReviews(1396).then((result: ReviewList) => {
			result.results.should.include.something.with.property("id", "5accdbe6c3a3687e2702d058");
		});
	});

	it("Get TV series theatrical screenings", () => {
		return tmdb.getTvShowTheatricalScreenings(71446).then((result: SeriesTheatricalScreenings) => {
			result.results.should.include.something.with.property("id", 1758470);
		});
	});

	it("Get similar TV shows", () => {
		return tmdb.getSimilarTvShows(2190).then((result: SeriesResults) => {
			result.results.should.include.something.with.property("name", "Family Guy");
		});
	});

	it("Get TV series translations", () => {
		return tmdb.getTvShowTranslations(387).then((result: SeriesTranslationList) => {
			result.translations.should.include.something.with.property("english_name", "Spanish");
		});
	});

	it("Get TV series videos", () => {
		return tmdb.getTvShowVideos(2190).then((result: VideoList) => {
			result.results.should.include.something.with.property("site", "YouTube");
		});
	});

	it("Rate TV series", () => {
		return tmdb.rateTvShow(71446, 10, auth.session_id).then((result: Response) => {
			expect(result.status_code).to.be.oneOf([StatusCode.Success, StatusCode.RecordUpdateSuccess]);
		});
	});

	it("Delete TV series rating", () => {
		return tmdb.unrateTvShow(71446, auth.session_id).then((result: Response) => {
			expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
		});
	});

	it("Get latest TV show", () => {
		return tmdb.getLatestTvShow().then((result: SeriesDetails) => {
			expect(result).have.property("id");
		});
	});

	it("Get TV shows airing today", () => {
		return tmdb.getTvShowsAiringToday().then((result: SeriesResults) => {
			expect(result.total_results).to.be.greaterThan(0);
		});
	});

	it("Get TV shows on the air", () => {
		return tmdb.getTvShowsOnAir().then((result: SeriesResults) => {
			expect(result.total_results).to.be.greaterThan(0);
		});
	});

	it("Get popular TV shows", () => {
		return tmdb.getPopularTvShows().then((result: SeriesResults) => {
			expect(result.total_results).to.be.greaterThan(0);
		});
	});

	it("Get top rated TV shows", () => {
		return tmdb.getTopRatedTvShows().then((result: SeriesResults) => {
			result.results.should.include.something.with.property("name", "Breaking Bad");
		});
	});
});
