import { expect } from "chai";
import "mocha";
import { auth } from "../init";

/**
 * Testing modules
 */
import { tv }                     from "../../src/core";
import { ISeriesDetails,
         ISeriesContentRatings,
         IEpisodeGroups,
         ITheatricalScreenings }  from "../../src/core/interface/tv";
import { ISeriesAccountState }    from "../../src/core/interface/account";
import { IAlternativeNames,
         ISeriesWatchProviders,
         IWatchProvidersResults } from "../../src/core/interface/info";
import { IAggregateCredits,
         ICredits }               from "../../src/core/interface/credits";
import { ISeriesExternalIds }     from "../../src/core/interface/external";
import { IImages, IVideos }       from "../../src/core/interface/media";
import { ISeriesResults }         from "../../src/core/interface/results";
import { ITranslations,
         ISeriesTranslation,
         ISeasonTranslation,
         IEpisodeTranslation }    from"../../src/core/interface/language";
import { IResponse }              from "../../src/core/interface/response";
import { StatusCode }             from "../../src/core/enums";

describe("Core: TV Shows", () => {
	it("Get TV series details", () => {
		return tv.getSeriesDetails(auth.api_key, 1396).then((result: ISeriesDetails) => {
			expect(result.name).to.equal("Breaking Bad");
		});
	});

	it("Get TV series account states", () => {
		return tv.getSeriesAccountStates(auth.api_key, 1396, auth.session_id).then((result: ISeriesAccountState) => {
			expect(result.id).to.equal(1396);
		});
	});

	it("Get TV series aggregate credits", () => {
		return tv.getSeriesAggregateCredits(auth.api_key, 1396).then((result: IAggregateCredits) => {
			result.cast.should.include.something.with.property("name", "Bryan Cranston");
		});
	});

	it("Get TV series alternative titles", () => {
		return tv.getSeriesAltTitles(auth.api_key, 246).then((result: IAlternativeNames) => {
			result.results.should.include.something.with.property("title", "Avatar: The Legend of Aang");
		});
	});

	it("Get TV series content ratings", () => {
		return tv.getSeriesContentRatings(auth.api_key, 1396).then((result: ISeriesContentRatings) => {
			result.results.should.include.something.with.property("rating", "TV-MA");
		});
	});

	it("Get TV series credits", () => {
		return tv.getSeriesCredits(auth.api_key, 1396).then((result: ICredits) => {
			result.cast.should.include.something.with.property("character", "Walter White");
		});
	});

	it("Get TV series episode groups", () => {
		return tv.getSeriesEpisodeGroups(auth.api_key, 1434).then((result: IEpisodeGroups) => {
			result.results.should.include.something.with.property("name", "DVD Order");
		});
	});

	it("Get TV series external IDs", () => {
		return tv.getSeriesExternalIds(auth.api_key, 1396).then((result: ISeriesExternalIds) => {
			expect(result.imdb_id).to.equal("tt0903747");
		});
	});

	it("Get TV series images", () => {
		return tv.getSeriesImages(auth.api_key, 2190).then((result: IImages) => {
			expect(result.backdrops.length).to.be.greaterThan(0);
		});
	});

	// it("Get TV series keywords", () => {
	// 	return tv.getSeriesKeywords(auth.api_key, 2190).then((result: IKeywords) => {
	// 		result.results.should.include.something.with.property("name", "colorado");
	// 	});
	// });

	it("Get TV series recommendations", () => {
		return tv.getSeriesRecommendations(auth.api_key, 2190).then((result: ISeriesResults) => {
			result.results.should.include.something.with.property("name", "Futurama");
		});
	});

	it("Get TV series theatrical screenings", () => {
		return tv.getTheatricalScreenings(auth.api_key, 71446).then((result: ITheatricalScreenings) => {
			result.results.should.include.something.with.property("id", 1758470);
		});
	});

	it("Get similar TV shows", () => {
		return tv.getSimilarShows(auth.api_key, 2190).then((result: ISeriesResults) => {
			result.results.should.include.something.with.property("name", "Family Guy");
		});
	});

	it("Get TV series translations", () => {
		return tv.getSeriesTranslations(auth.api_key, 387).then((result: ITranslations<ISeriesTranslation>) => {
			result.translations.should.include.something.with.property("english_name", "Spanish");
		});
	});

	it("Get TV series videos", () => {
		return tv.getSeriesVideos(auth.api_key, 1396).then((result: IVideos) => {
			result.results.should.include.something.with.property("site", "YouTube");
		});
	});

	it("Get TV series watch providers", () => {
		return tv.getSeriesWatchProviders(auth.api_key, 1396).then((result: IWatchProvidersResults<ISeriesWatchProviders>) => {
			expect(result.results.US).to.have.property("buy");
			expect(result.results.US.link).to.not.be.undefined;
			expect(result.results.US.buy?.length).to.be.greaterThan(0);
		});
	});

	it("Rate TV series", () => {
		return tv.rateSeries(auth.api_key, 71446, 10, auth.session_id).then((result: IResponse) => {
			expect(result.status_code).to.be.oneOf([StatusCode.Success, StatusCode.RecordUpdateSuccess]);
		});
	});

	it("Delete TV series rating", () => {
		return tv.unrateSeries(auth.api_key, 71446, auth.session_id).then((result: IResponse) => {
			expect(result.status_code).to.equal(StatusCode.RecordDeleteSuccess);
		});
	});

	it("Get latest TV show", () => {
		return tv.getLatestSeries(auth.api_key).then((result: ISeriesDetails) => {
			expect(result).have.property("id");
		});
	});

	it("Get TV shows airing today", () => {
		return tv.getShowsAiringToday(auth.api_key).then((result: ISeriesResults) => {
			expect(result.total_results).to.be.greaterThan(0);
		});
	});

	it("Get TV shows on the air", () => {
		return tv.getShowsOnAir(auth.api_key).then((result: ISeriesResults) => {
			expect(result.total_results).to.be.greaterThan(0);
		});
	});

	it("Get popular TV shows", () => {
		return tv.getPopularShows(auth.api_key).then((result: ISeriesResults) => {
			expect(result.total_results).to.be.greaterThan(0);
		});
	});

	/**
	 * @TODO The official API currently has an issue with this one...
	 */
	it.skip("Get top rated TV shows", () => {
		return tv.getTopRatedShows(auth.api_key, undefined, "en-US").then((result: ISeriesResults) => {
			result.results.should.include.something.with.property("name", "Breaking Bad");
		});
	});
});
